import {
  BN,
  Program,
  ProgramAccount as AnchorProgramAccount,
} from '@project-serum/anchor'
import { useEffect, useMemo, useState } from 'react'
import useWallet from '@hooks/useWallet'
import {
  deriveUserCollateral,
  deriveUserObligation,
  OptionMarket,
  PsyLendIdl,
  PSYLEND_DEVNET_PROGRAM_ID,
  PSYLEND_MAINNET_PROGRAM_ID,
  PSY_AMERICAN_PROGRAM_ID,
} from './index'
import { PsyAmericanIdl } from './PsyAmericanIdl'
import useGovernanceAssets from '@hooks/useGovernanceAssets'
import { AssetAccount } from '@utils/uiTypes/assets'
import { ReserveAccount } from './types'
import { Connection, PublicKey } from '@solana/web3.js'
import { parseTokenAccountData } from '../../tokens'

/* American Option program */

/**
 * Return entire list of PsyOption American options.
 */
export const useOptionAccounts = () => {
  const { anchorProvider } = useWallet()
  const [options, setOptions] = useState<
    AnchorProgramAccount<OptionMarket>[] | null
  >(null)

  useEffect(() => {
    const program = new Program(
      PsyAmericanIdl,
      PSY_AMERICAN_PROGRAM_ID,
      anchorProvider
    )
    ;(async () => {
      const _options = (await program.account.optionMarket.all()) as
        | AnchorProgramAccount<OptionMarket>[]
        | null
      setOptions(_options)
    })()
  }, [anchorProvider])

  return options
}

/**
 * Governed accounts for writer tokens only.
 */
export const useGovernedWriterTokenAccounts = (
  options: AnchorProgramAccount<OptionMarket>[] | null
) => {
  const { governedTokenAccountsWithoutNfts } = useGovernanceAssets()
  return useMemo(() => {
    const _accounts: AssetAccount[] = []
    options?.forEach((option) => {
      const govWriterTokenAccount = governedTokenAccountsWithoutNfts.find(
        (gAcct) =>
          gAcct.extensions.token?.account.mint.equals(
            option.account.writerTokenMint
          )
      )
      if (govWriterTokenAccount) {
        _accounts.push(govWriterTokenAccount)
      }
    })
    return _accounts
  }, [governedTokenAccountsWithoutNfts, options])
}

/**
 * Governed accounts for option tokens only.
 */
export const useGovernedOptionTokenAccounts = (
  options: AnchorProgramAccount<OptionMarket>[] | null
) => {
  const { governedTokenAccountsWithoutNfts } = useGovernanceAssets()
  return useMemo(() => {
    const _accounts: AssetAccount[] = []
    options?.forEach((option) => {
      const govOptionTokenAccount = governedTokenAccountsWithoutNfts.find(
        (gAcct) =>
          gAcct.extensions.token?.account.mint.equals(option.account.optionMint)
      )
      if (govOptionTokenAccount) {
        _accounts.push(govOptionTokenAccount)
      }
    })
    return _accounts
  }, [governedTokenAccountsWithoutNfts, options])
}

/* Borrow/Lend program */

export const useReserves = () => {
  const { anchorProvider, connection } = useWallet()
  const [reserves, setReserves] = useState<
    AnchorProgramAccount<ReserveAccount>[]
  >([])

  useEffect(() => {
    const program = new Program(
      PsyLendIdl,
      connection.cluster === 'devnet'
        ? PSYLEND_DEVNET_PROGRAM_ID
        : PSYLEND_MAINNET_PROGRAM_ID,
      anchorProvider
    )

    ;(async () => {
      const _reserveAccounts = await program.account.reserve.all()
      setReserves(
        (_reserveAccounts as unknown) as AnchorProgramAccount<ReserveAccount>[]
      )
    })()
  }, [anchorProvider, connection.cluster])

  return reserves
}

export const useReservesWithCollateral = (
  connection: Connection,
  programId: PublicKey,
  owner: PublicKey | null
) => {
  const reserves = useReserves()
  const [reservesWithCollateral, setReservesWithCollateral] = useState<
    AnchorProgramAccount<ReserveAccount>[]
  >([])

  useEffect(() => {
    if (!owner) {
      return
    }
    ;(async () => {
      const derivedObligationAccounts = await Promise.all(
        reserves.map((reserve) =>
          deriveUserObligation(programId, reserve.account.market, owner)
        )
      )
      const derivedCollateralAccounts = (
        await Promise.all(
          reserves.map((reserve, index) =>
            deriveUserCollateral(
              programId,
              reserve.publicKey,
              derivedObligationAccounts[index][0],
              owner
            )
          )
        )
      ).map((a) => a[0])
      const collateralAccountInfos = await connection.getMultipleAccountsInfo(
        derivedCollateralAccounts
      )
      const amountThreshold = new BN(0)
      const _reservesWithCollateral = reserves.filter((reserve, index) => {
        return (
          !!collateralAccountInfos[index]?.data &&
          parseTokenAccountData(
            derivedCollateralAccounts[index],
            collateralAccountInfos[index]!.data
          ).amount.gt(amountThreshold)
        )
      })
      setReservesWithCollateral(_reservesWithCollateral)
    })()
  }, [connection, owner, programId, reserves])

  return reservesWithCollateral
}
