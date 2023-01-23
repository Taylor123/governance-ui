import * as anchor from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'

/* American Options program */
export type OptionMarket = {
  optionMint: PublicKey
  writerTokenMint: PublicKey
  underlyingAssetMint: PublicKey
  quoteAssetMint: PublicKey
  underlyingAssetPool: PublicKey
  quoteAssetPool: PublicKey
  mintFeeAccount: PublicKey
  exerciseFeeAccount: PublicKey
  underlyingAmountPerContract: anchor.BN
  quoteAmountPerContract: anchor.BN
  expirationUnixTimestamp: anchor.BN
  expired: boolean
  bumpSeed: number
}

export type OptionMarketWithKey = OptionMarket & {
  key: PublicKey
}

/* Borrow/Lend program */

export type ReserveAccount = {
  version: number
  index: number
  exponent: number
  market: PublicKey
  pythOraclePrice: PublicKey
  pythOracleProduct: PublicKey
  tokenMint: PublicKey
  depositNoteMint: PublicKey
  loanNoteMint: PublicKey
  vault: PublicKey
  feeNoteVault: PublicKey
  dexSwapTokens: PublicKey
  dexOpenOrders: PublicKey
  dexMarket: PublicKey
  reserved0: number | number[]
  config: ReserveConfig
  psyfiVaultConfig: PsyFiVaultConfig
  discountRate: number
  discountRateVersion: number
  haltState: number
  reserved1: number[]
  reserved2: anchor.BN[]
  state: number[] // type is encoded ReserveStateStruct, idl types it as a number[]!
}

export type CacheStruct = {
  /** The last slot that this information was updated in */
  lastUpdated: anchor.BN
  /** Whether the value has been manually invalidated */
  invalidated: boolean
  /** Unused space */
  _reservedCache: number[]
}

export type ReserveStateStruct = CacheStruct & {
  accruedUntil: anchor.BN
  /**
   * Amount of deposited tokens loaned out to borrowers, plus amount of tokens charged in fees (in
   * token).
   * Actually a U192 `Number` field
   */
  outstandingDebt: anchor.BN
  /**
   * Amount of fees collected (in token). `Outstanding debt` includes this amount.
   * Actually a U192 `Number` field
   */
  uncollectedFees: anchor.BN
  /**
   * Amount of deposited tokens that is not borrowed (in token)
   */
  totalDeposits: anchor.BN
  /**
   * Amount of deposit notes issued and in circulation (i.e., matches mint's supply)
   */
  totalDepositNotes: anchor.BN
  /**
   * Amount of loan notes issued and in circulation (i.e., matches mint's supply)
   */
  totalLoanNotes: anchor.BN
  /**
   * Each index corresponds to cummulative sum of the reward points distributed per deposit note for the
   * distribution period. This value is denominated in reward_unit_decimals.
   */
  cummulativeDepositRewardUnits: anchor.BN[]
  /**
   * Each index corresponds to cummulative sum of the reward points distributed distributed per loan
   * note for the distribution period. This value is denominated in reward_unit_decimals.
   */
  cummulativeLoanRewardUnits: anchor.BN[]
  _reserved: number[]
}

export type ReserveConfig = {
  /** The utilization rate at which we switch from the first to second regime. */
  utilizationRate1: number
  /** The utilization rate at which we switch from the second to third regime. */
  utilizationRate2: number
  /** The lowest borrow rate in the first regime. Essentially the minimum
          borrow rate possible for the reserve. */
  borrowRate0: number
  /** The borrow rate at the transition point from the first to second regime. */
  borrowRate1: number
  /** The borrow rate at the transition point from the second to thirs regime. */
  borrowRate2: number
  /** The highest borrow rate in the third regime. Essentially the maximum
          borrow rate possible for the reserve. */
  borrowRate3: number
  /** The minimum allowable collateralization ratio for an obligation */
  minCollateralRatio: number
  /** The amount given as a bonus to a liquidator */
  liquidationPremium: number
  /** The threshold at which to collect the fees accumulated from interest into
          real deposit notes. */
  manageFeeCollectionThreshold: anchor.BN
  /** The fee rate applied to the interest payments collected */
  manageFeeRate: number
  /** The fee rate applied as interest owed on new loans */
  loanOriginationFee: number
  /** Reserved for future use */
  reserved0: number
  // /** Maximum slippage when selling this asset on DEX during liquidations */
  /** Confidence Threshold */
  confidenceThreshold: number
  /** Maximum number of tokens to sell in a single DEX trade during liquidation */
  liquidationDexTradeMax: anchor.BN
  /** Reward distribution multiplier for deposit. */
  depositRewardMultiplier: number
  /** Reward distribution multiplier for borrow. */
  borrowRewardMultiplier: number
  /** 22 bytes, reserved for future use. Fill with reserved1: new Uint8Array(22) as unknown as number[], */
  reserved1: number[]
}

export type PsyFiVaultConfig = {
  vaultAccount: PublicKey
  collateralTokenDecimals: number
  reserved1: number[]
  reserved2: number[]
}
