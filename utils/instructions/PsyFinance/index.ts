import { BN, Program, Provider, web3 } from '@project-serum/anchor'
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import {
  AccountMeta,
  PublicKey,
  SystemProgram,
  SYSVAR_CLOCK_PUBKEY,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
} from '@solana/web3.js'
import { PsyAmerican } from './PsyAmericanIdl'
import {
  OptionMarket,
  OptionMarketWithKey,
  ReserveConfig,
  ReserveStateStruct,
} from './types'

export { PsyAmericanIdl } from './PsyAmericanIdl'
export { PsyLendIdl } from './PsyLendIdl'
export * from './types'
export * from './hooks'

export const PSY_AMERICAN_PROGRAM_ID = new PublicKey(
  'R2y9ip6mxmWUj4pt54jP2hz2dgvMozy9VTSwMWE7evs'
)
const FEE_OWNER_KEY = new PublicKey(
  '6c33US7ErPmLXZog9SyChQUYUrrJY51k4GmzdhrbhNnD'
)

export const PSYLEND_DEVNET_PROGRAM_ID = new PublicKey(
  '8bpiM4yhcLYMSeCBTVFWisneXPQQWPYSA5ZpMm4DKAgT'
)

export const PSYLEND_MAINNET_PROGRAM_ID = new PublicKey(
  'PLENDj46Y4hhqitNV2WqLqGLrWKAaH2xJHm2UyHgJLY'
)

/* Most utility functions are copy/pasta from `@mithraic-labs/psy-american` package  */

export const getOptionByKey = async (
  program: Program<PsyAmerican>,
  key: PublicKey
): Promise<OptionMarketWithKey | null> => {
  try {
    const optionAccount = ((await program.account.optionMarket.fetch(
      key
    )) as unknown) as OptionMarket

    return {
      ...optionAccount,
      key,
    }
  } catch (err) {
    return null
  }
}

/**
 * Get the deterministic address for an Option based on its properties.
 * @returns
 */
export const deriveOptionKeyFromParams = async ({
  expirationUnixTimestamp,
  programId,
  quoteAmountPerContract,
  quoteMint,
  underlyingAmountPerContract,
  underlyingMint,
}: {
  /** The OptionMarket expiration timestamp in seconds */
  expirationUnixTimestamp: BN
  /** The Psy American program ID */
  programId: PublicKey
  /** The quote asset amount per option contract  */
  quoteAmountPerContract: BN
  /** The quote asset mint address  */
  quoteMint: PublicKey
  /** The underlying asset amount per option contract */
  underlyingAmountPerContract: BN
  /** The underlying asset mint address */
  underlyingMint: PublicKey
}): Promise<[PublicKey, number]> => {
  return PublicKey.findProgramAddress(
    [
      underlyingMint.toBuffer(),
      quoteMint.toBuffer(),
      underlyingAmountPerContract.toArrayLike(Buffer, 'le', 8),
      quoteAmountPerContract.toArrayLike(Buffer, 'le', 8),
      expirationUnixTimestamp.toArrayLike(Buffer, 'le', 8),
    ],
    programId
  )
}

/**
 * Note this is legacy and no fees are on V2 instructions
 * @deprecated
 */
const feeAmountPerContract = (assetQuantity: BN) => {
  return assetQuantity.div(new BN(10_000 / 5))
}

/**
 * Initialize a new Option
 *
 * @param program - The Psy American program
 * @param params
 * @returns
 */
// Should probably dedupe the code between these functions
export const initializeOptionInstruction = async (
  program: Program<PsyAmerican>,
  {
    expirationUnixTimestamp,
    quoteAmountPerContract,
    quoteMint,
    underlyingAmountPerContract,
    underlyingMint,
  }: {
    /** The option market expiration timestamp in seconds */
    expirationUnixTimestamp: BN
    /** The quote amount per contract for the OptionMarket
     * Strike price is derived from underlyingAmountPerContract & quoteAmountPerContract */
    quoteAmountPerContract: BN
    /** The quote asset mint */
    quoteMint: PublicKey
    /** The underlying amount per contract for the OptionMarket. *
     * Strike price is derived from underlyingAmountPerContract & quoteAmountPerContract */
    underlyingAmountPerContract: BN
    /** The underlying mint address */
    underlyingMint: PublicKey
  }
): Promise<{
  optionMarketKey: PublicKey
  optionMintKey: PublicKey
  quoteAssetPoolKey: PublicKey
  tx: TransactionInstruction
  underlyingAssetPoolKey: PublicKey
  writerMintKey: PublicKey
}> => {
  const textEncoder = new TextEncoder()

  // generate Program Derived Address for the new option
  const [optionMarketKey, bumpSeed] = await deriveOptionKeyFromParams({
    programId: program.programId,
    underlyingMint,
    quoteMint,
    underlyingAmountPerContract,
    quoteAmountPerContract,
    expirationUnixTimestamp,
  })

  // generate Program Derived Address for the Option Token
  const [optionMintKey] = await web3.PublicKey.findProgramAddress(
    [optionMarketKey.toBuffer(), textEncoder.encode('optionToken')],
    program.programId
  )
  // generate Program Derived Address for the Writer Token
  const [writerMintKey] = await web3.PublicKey.findProgramAddress(
    [optionMarketKey.toBuffer(), textEncoder.encode('writerToken')],
    program.programId
  )

  // generate Program Derived Address for the vault that will hold the quote asset
  const [quoteAssetPoolKey] = await web3.PublicKey.findProgramAddress(
    [optionMarketKey.toBuffer(), textEncoder.encode('quoteAssetPool')],
    program.programId
  )

  // generate Program Derived Address for the vault that will hold the underlying asset
  const [underlyingAssetPoolKey] = await web3.PublicKey.findProgramAddress(
    [optionMarketKey.toBuffer(), textEncoder.encode('underlyingAssetPool')],
    program.programId
  )

  // Determine whether the mint/exercise fee accounts need to be initialized.
  // Add the instructions and necessary accounts if the accounts need to
  // be created.
  const remainingAccounts: AccountMeta[] = []
  const instructions: TransactionInstruction[] = []
  const mintFeePerContract = feeAmountPerContract(underlyingAmountPerContract)
  if (mintFeePerContract.gtn(0)) {
    const mintFeeKey = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      underlyingMint,
      FEE_OWNER_KEY
    )
    remainingAccounts.push({
      pubkey: mintFeeKey,
      isWritable: true,
      isSigner: false,
    })
    const ix = await getOrAddAssociatedTokenAccountTx(
      mintFeeKey,
      underlyingMint,
      program.provider,
      FEE_OWNER_KEY
    )
    if (ix) {
      instructions.push(ix)
    }
  }

  const exerciseFeePerContract = feeAmountPerContract(quoteAmountPerContract)
  if (exerciseFeePerContract.gtn(0)) {
    const exerciseFeeKey = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      quoteMint,
      FEE_OWNER_KEY
    )
    remainingAccounts.push({
      pubkey: exerciseFeeKey,
      isWritable: false,
      isSigner: false,
    })
    const ix = await getOrAddAssociatedTokenAccountTx(
      exerciseFeeKey,
      quoteMint,
      program.provider,
      FEE_OWNER_KEY
    )
    if (ix) {
      instructions.push(ix)
    }
  }

  const tx = await program.instruction.initializeMarket(
    underlyingAmountPerContract,
    quoteAmountPerContract,
    expirationUnixTimestamp,
    bumpSeed,
    {
      accounts: {
        // @ts-ignore
        authority: program.provider.wallet.publicKey,
        feeOwner: FEE_OWNER_KEY,
        optionMarket: optionMarketKey,
        optionMint: optionMintKey,
        quoteAssetMint: quoteMint,
        quoteAssetPool: quoteAssetPoolKey,
        underlyingAssetMint: underlyingMint,
        underlyingAssetPool: underlyingAssetPoolKey,
        writerTokenMint: writerMintKey,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        clock: SYSVAR_CLOCK_PUBKEY,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
      instructions: instructions.length ? instructions : undefined,
      remainingAccounts,
    }
  )

  return {
    optionMarketKey,
    optionMintKey,
    quoteAssetPoolKey,
    tx,
    underlyingAssetPoolKey,
    writerMintKey,
  }
}

/* TODO refactor to gov ui utility function */
const getOrAddAssociatedTokenAccountTx = async (
  associatedAddress: PublicKey,
  mintKey: PublicKey,
  provider: Provider,
  owner: PublicKey = FEE_OWNER_KEY
): Promise<TransactionInstruction | null> => {
  const accountInfo = await provider.connection.getAccountInfo(
    associatedAddress
  )
  if (accountInfo) {
    // accountInfo exists, so the associated token account has already
    // been initialized
    return null
  }

  return Token.createAssociatedTokenAccountInstruction(
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    mintKey,
    associatedAddress,
    owner,
    // @ts-ignore
    provider.wallet.publicKey
  )
}

/* Borrow/Lend */

const decodeU128Array = (buff: Buffer, start: number, length: number) => {
  const decodedData: BN[] = []
  let sliceStart = start
  for (let i = 0; i < length; i++) {
    decodedData.push(
      new BN(buff.slice(sliceStart, sliceStart + 16), undefined, 'le')
    )
    sliceStart += 16
  }
  return decodedData
}

/**
 * When fetching a ReserveAccount, the ReserveStateStruct can be converted to a buffer and then read
 * using this function.
 *
 * Use `Buffer.from(reserve.state as any as number[])` to convert Reserve state to a buffer
 * @param buff
 * @returns
 */
export const decodeReserveStateStruct = (buff: Buffer): ReserveStateStruct => ({
  accruedUntil: new BN(buff.slice(0, 0 + 8), undefined, 'le'),
  outstandingDebt: new BN(buff.slice(8, 8 + 24), undefined, 'le'),
  uncollectedFees: new BN(buff.slice(32, 32 + 24), undefined, 'le'),
  totalDeposits: new BN(buff.slice(56, 56 + 8), undefined, 'le'),
  totalDepositNotes: new BN(buff.slice(64, 64 + 8), undefined, 'le'),
  totalLoanNotes: new BN(buff.slice(72, 72 + 8), undefined, 'le'),
  cummulativeDepositRewardUnits: decodeU128Array(buff, 80, 96),
  cummulativeLoanRewardUnits: decodeU128Array(buff, 1616, 96),
  //Reserved is 416 bytes...
  _reserved: [],
  lastUpdated: new BN(buff.slice(3568, 3568 + 8), undefined, 'le'),
  invalidated: Boolean(buff.slice(3576, 3576 + 1).readInt8()),
  _reservedCache: [],
})

export const lendBNToNumber = (lendNumber: BN) => {
  const lendNumberBase = 10 ** 15
  if (lendNumber.lt(new BN(Number.MAX_SAFE_INTEGER))) {
    return Number(lendNumber) / lendNumberBase
  }

  const numberLen = lendNumber.toString().length
  const baseToDivide = numberLen - 15
  if (baseToDivide > 15) {
    console.log(
      'Precision loss warning. Dividing by more than 15 decimals will result in non-floating point precision loss.'
    )
  }
  const divisor = new BN(10).pow(new BN(baseToDivide))
  return Number(lendNumber.div(divisor)) / 10 ** (15 - baseToDivide)
}

/** Linear interpolation between (x0, y0) and (x1, y1) */
export const interpolate = (
  x: number,
  x0: number,
  x1: number,
  y0: number,
  y1: number
): number => y0 + ((x - x0) * (y1 - y0)) / (x1 - x0)

export const getBorrowAPR = (
  reserveConfig: ReserveConfig,
  utilRate: number
): number => {
  const basisPointFactor = 10000
  const util1 = reserveConfig.utilizationRate1 / basisPointFactor
  const util2 = reserveConfig.utilizationRate2 / basisPointFactor
  const borrow0 = reserveConfig.borrowRate0 / basisPointFactor
  const borrow1 = reserveConfig.borrowRate1 / basisPointFactor
  const borrow2 = reserveConfig.borrowRate2 / basisPointFactor
  const borrow3 = reserveConfig.borrowRate3 / basisPointFactor

  if (utilRate <= util1) {
    return interpolate(utilRate, 0, util1, borrow0, borrow1)
  } else if (utilRate <= util2) {
    return interpolate(utilRate, util1, util2, borrow1, borrow2)
  } else {
    return interpolate(utilRate, util2, 1, borrow2, borrow3)
  }
}

/**
 * Calculates and return reserve's supply APR.
 * @param borrowRate - Borrow APR, specified in percentage.
 * @param fee - Manage fee, specified in basis points.
 * @param utilizationRate - Utilization ratio of reserve.
 * @returns keys and ReserveAccount data per market
 */
export const getSupplyAPR = (
  borrowRate: number,
  fee: number,
  utilizationRate: number
): number => {
  const basisPointFactor = 10000
  fee = fee / basisPointFactor
  if (borrowRate <= 0) {
    return 0
  }
  return borrowRate * (1 - fee) * utilizationRate
}

export const convertAprToApy = (apr: number) => {
  const stakingEpochsPerYear = 365 / 2
  const perStakingEpochYield = apr / stakingEpochsPerYear / 100
  const fractionalStakingApy =
    (1 + perStakingEpochYield) ** stakingEpochsPerYear - 1
  return fractionalStakingApy * 100
}

export const deriveUserDeposits = async (
  programId: PublicKey,
  reserveAddress: PublicKey,
  userAddress: PublicKey
) =>
  PublicKey.findProgramAddress(
    [Buffer.from('deposits'), reserveAddress.toBytes(), userAddress.toBytes()],
    programId
  )

export const deriveUserObligation = async (
  programId: PublicKey,
  marketAddress: PublicKey,
  userAddress: PublicKey
) =>
  PublicKey.findProgramAddress(
    [Buffer.from('obligation'), marketAddress.toBytes(), userAddress.toBytes()],
    programId
  )

export const deriveUserLoan = async (
  programId: PublicKey,
  reserveAddress: PublicKey,
  obligationAddress: PublicKey,
  userAddress: PublicKey
) =>
  PublicKey.findProgramAddress(
    [
      Buffer.from('loan'),
      reserveAddress.toBytes(),
      obligationAddress.toBytes(),
      userAddress.toBytes(),
    ],
    programId
  )

export const deriveUserCollateral = async (
  programId: PublicKey,
  reserveAddress: PublicKey,
  obligationAddress: PublicKey,
  userAddress: PublicKey
) =>
  PublicKey.findProgramAddress(
    [
      Buffer.from('collateral'),
      reserveAddress.toBytes(),
      obligationAddress.toBytes(),
      userAddress.toBytes(),
    ],
    programId
  )

export const TOKENS = 0
export const DEPOSIT_NOTES = 1
export const LOAN_NOTES = 2

export class Amount {
  constructor(public units: number, public value: BN) {}

  static tokens(amount: BN): Amount {
    return new Amount(TOKENS, new BN(amount))
  }

  static depositNotes(amount: BN): Amount {
    return new Amount(DEPOSIT_NOTES, new BN(amount))
  }

  static loanNotes(amount: BN): Amount {
    return new Amount(LOAN_NOTES, new BN(amount))
  }
}

export const getLendingAccrualRefreshCount = (accruedUntil: number) => {
  const currentUnixTimestamp = Math.floor(Date.now() / 1000)
  return Math.max(
    (currentUnixTimestamp - accruedUntil) / 604800, // week in seconds
    1
  )
}
