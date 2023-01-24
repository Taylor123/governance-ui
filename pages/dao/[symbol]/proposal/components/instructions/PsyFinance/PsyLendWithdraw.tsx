import {
  Governance,
  ProgramAccount,
  serializeInstructionToBase64,
} from '@solana/spl-governance'
import {
  PsyLendWithdrawForm,
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
  useReservesWithCollateral,
} from '@utils/instructions/PsyFinance'
import {
  PublicKey,
  SystemProgram,
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
  state: PsyLendWithdrawForm,
  action: Partial<PsyLendWithdrawForm>
) => ({
  ...state,
  ...action,
})

const PsyLendWithdraw = ({
  index,
  governance,
}: {
  index: number
  governance: ProgramAccount<Governance> | null
}) => {
  const { anchorProvider, connection, wallet } = useWallet()
  const { governedTokenAccountsWithoutNfts } = useGovernanceAssets()
  const { handleSetInstructions } = useContext(NewProposalContext)
  const governedTokenAccountsWithoutNativeSol = useMemo(
    () => governedTokenAccountsWithoutNfts.filter((a) => !a.isSol),
    [governedTokenAccountsWithoutNfts]
  )

  const [form, dispatch] = useReducer(formReducer, {
    size: 0,
    reserve: undefined,
    destinationAccount: undefined,
  })
  const owner = form.destinationAccount?.isSol
    ? (form.destinationAccount.extensions.transferAddress as PublicKey)
    : form.destinationAccount?.extensions.token!.account.owner ?? null
  const reserves = useReservesWithCollateral(
    connection.current,
    connection.cluster === 'devnet'
      ? PSYLEND_DEVNET_PROGRAM_ID
      : PSYLEND_MAINNET_PROGRAM_ID,
    owner
  )
  const filteredReserves = useMemo(() => {
    return reserves.filter((reserve) =>
      reserve.account.tokenMint.equals(
        form.destinationAccount?.isSol
          ? WSOL_MINT_PK
          : form.destinationAccount?.extensions.token?.account.mint ??
              PublicKey.default
      )
    )
  }, [
    form.destinationAccount?.extensions.token?.account.mint,
    form.destinationAccount?.isSol,
    reserves,
  ])

  const shouldBeGoverned = !!(index !== 0 && governance)

  const getInstruction = async (): Promise<UiInstruction> => {
    if (!form.size || !form.reserve || !form.destinationAccount || !wallet) {
      throw new Error('Missing input(s)')
    }
    const program = new Program(
      PsyLendIdl,
      connection.cluster === 'devnet'
        ? PSYLEND_DEVNET_PROGRAM_ID
        : PSYLEND_MAINNET_PROGRAM_ID,
      anchorProvider
    )
    const instructions: TransactionInstruction[] = []

    // NOTE native sol handling is temporary disabled, users must select WSol accounts.
    const owner = form.destinationAccount.isSol
      ? (form.destinationAccount.extensions.transferAddress as PublicKey)
      : form.destinationAccount.extensions.token!.account.owner

    const [
      [depositsAccount, depositsAccountBump],
      [obligationAccount],
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
    const notesAmount = Amount.depositNotes(sizeBN)

    let destinationSplAccount =
      form.destinationAccount.extensions.token?.publicKey ?? PublicKey.default

    if (form.destinationAccount.isSol) {
      const { currentAddress: wSolAddress, needToCreateAta } = await getATA({
        connection: connection,
        receiverAddress: form.destinationAccount.pubkey,
        mintPK: WSOL_MINT_PK,
        wallet,
      })
      if (needToCreateAta) {
        const ix = Token.createAssociatedTokenAccountInstruction(
          ASSOCIATED_TOKEN_PROGRAM_ID,
          TOKEN_PROGRAM_ID,
          WSOL_MINT_PK,
          wSolAddress,
          owner,
          owner
        )
        instructions.push(ix)
      }
      destinationSplAccount = wSolAddress
    }
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
    instructions.push(accrueIx)
    const refreshReserveIx = await program.methods
      .refreshReserve()
      .accounts({
        market: form.reserve.account.market,
        reserve: form.reserve.publicKey,
        pythOraclePrice: form.reserve.account.pythOraclePrice,
      })
      .instruction()
    instructions.push(refreshReserveIx)

    const ix1 = await program.methods
      .withdrawCollateral(
        {
          collateralAccount: collateralAccountBump,
          depositAccount: depositsAccountBump,
        },
        notesAmount
      )
      .accounts({
        market: form.reserve.account.market,
        marketAuthority: marketAuthority,
        owner,
        obligation: obligationAccount,
        reserve: form.reserve.publicKey,
        collateralAccount,
        depositAccount: depositsAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .instruction()
    instructions.push(ix1)

    const ix2 = await program.methods
      .withdraw(depositsAccountBump, notesAmount)
      .accounts({
        market: form.reserve.account.market,
        marketAuthority,
        withdrawAccount: destinationSplAccount,
        depositAccount: depositsAccount,
        depositor: owner,
        reserve: form.reserve.publicKey,
        vault: form.reserve.account.vault,
        depositNoteMint: form.reserve.account.depositNoteMint,
        jetProgram: program.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .instruction()
    instructions.push(ix2)

    if (form.destinationAccount.isSol) {
      const solTransferIx = SystemProgram.transfer({
        fromPubkey: destinationSplAccount,
        toPubkey: owner,
        lamports: size,
      })
      instructions.push(solTransferIx)
      instructions.push(
        // @ts-expect-error this exists!
        Token.createSyncNativeInstruction(
          TOKEN_PROGRAM_ID,
          destinationSplAccount
        )
      )
    }
    const finalInstruction = instructions.pop() as TransactionInstruction

    return {
      additionalSerializedInstructions: instructions.map(
        serializeInstructionToBase64
      ),
      serializedInstruction: serializeInstructionToBase64(finalInstruction),
      isValid: true,
      governance: form.destinationAccount?.governance,
    }
  }

  useEffect(() => {
    handleSetInstructions(
      { governedAccount: form.destinationAccount?.governance, getInstruction },
      index
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, handleSetInstructions, index])

  return (
    <>
      <GovernedAccountSelect
        label="Destination account"
        governedAccounts={governedTokenAccountsWithoutNativeSol}
        onChange={(value: AssetAccount) => {
          dispatch({
            destinationAccount: value,
          })
        }}
        value={form.destinationAccount}
        shouldBeGoverned={shouldBeGoverned}
        governance={governance}
        type="token"
      />
      <PsyLendReserveSelector
        disabled={!form.destinationAccount}
        onChange={(_reserveAcct) => {
          dispatch({
            reserve: _reserveAcct,
          })
        }}
        reserves={filteredReserves}
        value={form.reserve}
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

export default PsyLendWithdraw
