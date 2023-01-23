import {
  Governance,
  ProgramAccount,
  serializeInstructionToBase64,
} from '@solana/spl-governance'
import {
  PsyLendSupplyForm,
  UiInstruction,
} from '@utils/uiTypes/proposalCreationTypes'
import useWallet from '@hooks/useWallet'
import { useContext, useEffect, useMemo, useReducer } from 'react'
import { NewProposalContext } from '../../../new'
import { AssetAccount } from '@utils/uiTypes/assets'
import GovernedAccountSelect from '../../GovernedAccountSelect'
import Input from '@components/inputs/Input'
import { Program } from '@project-serum/anchor'
import {
  Amount,
  deriveUserCollateral,
  deriveUserDeposits,
  deriveUserObligation,
  PsyLendIdl,
  PSYLEND_DEVNET_PROGRAM_ID,
  PSYLEND_MAINNET_PROGRAM_ID,
  useReserves,
} from '@utils/instructions/PsyFinance'
import {
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
} from '@solana/web3.js'
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { BN } from 'bn.js'
import { PsyLendReserveSelector } from './Components/PsyLendReserveSelector'
import useGovernanceAssets from '@hooks/useGovernanceAssets'
import { WSOL_MINT_PK } from '@components/instructions/tools'
import { getATA } from '@utils/ataTools'

const formReducer = (
  state: PsyLendSupplyForm,
  action: Partial<PsyLendSupplyForm>
) => ({
  ...state,
  ...action,
})

const PsyLendSupply = ({
  index,
  governance,
}: {
  index: number
  governance: ProgramAccount<Governance> | null
}) => {
  const { anchorProvider, connection, wallet } = useWallet()
  const { governedTokenAccountsWithoutNfts } = useGovernanceAssets()
  const { handleSetInstructions } = useContext(NewProposalContext)
  const reserves = useReserves()

  const [form, dispatch] = useReducer(formReducer, {
    size: 0,
    reserve: undefined,
    sourceAccount: undefined,
  })
  const governedTokenAcctsFiltered = useMemo(() => {
    return governedTokenAccountsWithoutNfts.filter((govAcct) => {
      if (
        govAcct.isSol &&
        form.reserve?.account.tokenMint.equals(WSOL_MINT_PK)
      ) {
        return true
      }
      return govAcct.extensions.token?.account.mint.equals(
        form.reserve?.account.tokenMint ?? PublicKey.default
      )
    })
  }, [form.reserve?.account.tokenMint, governedTokenAccountsWithoutNfts])

  const shouldBeGoverned = !!(index !== 0 && governance)

  const getInstruction = async (): Promise<UiInstruction> => {
    if (!form.size || !form.reserve || !form.sourceAccount || !wallet) {
      throw new Error('Missing input(s)')
    }
    const program = new Program(
      PsyLendIdl,
      connection.cluster === 'devnet'
        ? PSYLEND_DEVNET_PROGRAM_ID
        : PSYLEND_MAINNET_PROGRAM_ID,
      anchorProvider
    )
    const prerequisiteInstructions: TransactionInstruction[] = []

    const owner = form.sourceAccount.isSol
      ? (form.sourceAccount.extensions.transferAddress as PublicKey)
      : form.sourceAccount.extensions.token!.account.owner

    const [
      [depositsAccount, depositsAccountBump],
      [obligationAccount, obligationAccountBump],
      [marketAuthority],
    ] = await Promise.all([
      deriveUserDeposits(program.programId, form.reserve.publicKey, owner),
      deriveUserObligation(
        program.programId,
        form.reserve.account.market,
        owner
      ),
      PublicKey.findProgramAddress(
        [form.reserve.account.market.toBuffer()],
        program.programId
      ),
    ])
    const [
      collateralAccount,
      collateralAccountBump,
    ] = await deriveUserCollateral(
      program.programId,
      form.reserve.publicKey,
      obligationAccount,
      owner
    )

    const size = form.size * 10 ** -form.reserve.account.exponent
    const sizeBN = new BN(size)
    const tokenAmount = Amount.tokens(sizeBN)
    const additionalSerializedInstructions: string[] = []

    const accrueIx = await program.methods
      .accrueInterest()
      .accounts({
        market: form.reserve.account.market,
        marketAuthority,
        reserve: form.reserve.publicKey,
        feeNoteVault: form.reserve.account.feeNoteVault,
        depositNoteMint: form.reserve.account.depositNoteMint,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .instruction()
    additionalSerializedInstructions.push(
      serializeInstructionToBase64(accrueIx)
    )

    let sourceSplAccount =
      form.sourceAccount.extensions.token?.publicKey ?? PublicKey.default
    if (form.sourceAccount.isSol) {
      const {
        currentAddress: wSolSourceAddress,
        needToCreateAta,
      } = await getATA({
        connection: connection,
        receiverAddress: form.sourceAccount.pubkey,
        mintPK: WSOL_MINT_PK,
        wallet,
      })
      if (needToCreateAta) {
        const ix = Token.createAssociatedTokenAccountInstruction(
          ASSOCIATED_TOKEN_PROGRAM_ID,
          TOKEN_PROGRAM_ID,
          WSOL_MINT_PK,
          wSolSourceAddress,
          owner,
          owner
        )
        additionalSerializedInstructions.push(serializeInstructionToBase64(ix))
      }
      sourceSplAccount = wSolSourceAddress
      const solTransferIx = SystemProgram.transfer({
        fromPubkey: owner,
        toPubkey: wSolSourceAddress,
        lamports: size,
      })
      additionalSerializedInstructions.push(
        serializeInstructionToBase64(solTransferIx)
      )
      additionalSerializedInstructions.push(
        serializeInstructionToBase64(
          // @ts-expect-error this exists!
          Token.createSyncNativeInstruction(TOKEN_PROGRAM_ID, wSolSourceAddress)
        )
      )
    }

    const [
      obligationAccountExists,
      collateralAccountExist,
      depositAccountExists,
    ] = await Promise.all([
      program.provider.connection.getAccountInfo(
        obligationAccount,
        'processed'
      ),
      program.provider.connection.getAccountInfo(
        collateralAccount,
        'processed'
      ),
      program.provider.connection.getAccountInfo(depositsAccount, 'processed'),
    ])

    if (!obligationAccountExists) {
      const ix = await program.methods
        .initObligation(obligationAccountBump)
        .accounts({
          market: form.reserve.account.market,
          marketAuthority: marketAuthority,

          obligation: obligationAccount,
          borrower: owner,

          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .instruction()
      additionalSerializedInstructions.push(serializeInstructionToBase64(ix))
    }

    if (!collateralAccountExist) {
      const ix = await program.methods
        .initCollateralAccount(collateralAccountBump)
        .accounts({
          market: form.reserve.account.market,
          marketAuthority: marketAuthority,
          obligation: obligationAccount,
          reserve: form.reserve.publicKey,
          depositNoteMint: form.reserve.account.depositNoteMint,
          owner: owner,
          collateralAccount: collateralAccount,

          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .instruction()
      additionalSerializedInstructions.push(serializeInstructionToBase64(ix))
    }

    if (!depositAccountExists) {
      const ix = await program.methods
        .initDepositAccount(depositsAccountBump)
        .accounts({
          market: form.reserve.account.market,
          marketAuthority: marketAuthority,

          reserve: form.reserve.publicKey,
          depositNoteMint: form.reserve.account.depositNoteMint,

          depositor: owner,
          depositAccount: depositsAccount,

          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .instruction()
      additionalSerializedInstructions.push(serializeInstructionToBase64(ix))
    }

    const ix1 = await program.methods
      .depositTokens(tokenAmount)
      .accounts({
        market: form.reserve.account.market,
        marketAuthority: marketAuthority,

        depositSource: sourceSplAccount,
        depositAccount: depositsAccount,
        depositor: owner,

        reserve: form.reserve.publicKey,
        vault: form.reserve.account.vault,
        depositNoteMint: form.reserve.account.depositNoteMint,

        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .instruction()

    additionalSerializedInstructions.push(serializeInstructionToBase64(ix1))

    const ix2 = await program.methods
      .depositCollateral(
        {
          depositAccount: depositsAccountBump,
          collateralAccount: collateralAccountBump,
        },
        tokenAmount
      )
      .accounts({
        market: form.reserve.account.market,
        marketAuthority,
        reserve: form.reserve.publicKey,
        obligation: obligationAccount,
        owner: owner,
        depositAccount: depositsAccount,
        collateralAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .instruction()

    return {
      additionalSerializedInstructions,
      serializedInstruction: serializeInstructionToBase64(ix2),
      isValid: true,
      prerequisiteInstructions,
      governance: form.sourceAccount?.governance,
    }
  }

  useEffect(() => {
    handleSetInstructions(
      { governedAccount: form.sourceAccount?.governance, getInstruction },
      index
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, handleSetInstructions, index])

  return (
    <>
      <PsyLendReserveSelector
        onChange={(_reserveAcct) => {
          dispatch({
            reserve: _reserveAcct,
          })
        }}
        reserves={reserves}
        value={form.reserve}
      />
      <GovernedAccountSelect
        label="Source account"
        governedAccounts={governedTokenAcctsFiltered}
        onChange={(value: AssetAccount) => {
          dispatch({
            sourceAccount: value,
          })
        }}
        value={form.sourceAccount}
        shouldBeGoverned={shouldBeGoverned}
        governance={governance}
        type="token"
      />
      <Input
        disabled={!form.reserve}
        label="Amount"
        value={form.size}
        type="number"
        onChange={(event) =>
          dispatch({
            size: parseFloat(event.target.value),
          })
        }
      />
    </>
  )
}

export default PsyLendSupply
