export type Psylend = {
  version: '0.1.0'
  name: 'psylend'
  instructions: [
    {
      name: 'initDiscounts'
      accounts: [
        {
          name: 'signer'
          isMut: false
          isSigner: true
        },
        {
          name: 'payer'
          isMut: true
          isSigner: true
        },
        {
          name: 'discounts'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'mintAddresses'
          type: {
            array: ['publicKey', 20]
          }
        },
        {
          name: 'discountRates'
          type: {
            array: ['u16', 20]
          }
        }
      ]
    },
    {
      name: 'initMarket'
      accounts: [
        {
          name: 'market'
          isMut: true
          isSigner: false
        }
      ]
      args: [
        {
          name: 'owner'
          type: 'publicKey'
        },
        {
          name: 'quoteCurrency'
          type: 'string'
        },
        {
          name: 'quoteTokenMint'
          type: 'publicKey'
        }
      ]
    },
    {
      name: 'initReserve'
      accounts: [
        {
          name: 'market'
          isMut: true
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: true
          isSigner: false
        },
        {
          name: 'vault'
          isMut: true
          isSigner: false
        },
        {
          name: 'dexSwapTokens'
          isMut: true
          isSigner: false
        },
        {
          name: 'dexOpenOrders'
          isMut: true
          isSigner: false
        },
        {
          name: 'dexMarket'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenMint'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'dexProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'oraclePrice'
          isMut: false
          isSigner: false
        },
        {
          name: 'oracleProduct'
          isMut: false
          isSigner: false
        },
        {
          name: 'depositNoteMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'loanNoteMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'quoteTokenMint'
          isMut: false
          isSigner: false
        },
        {
          name: 'feeNoteVault'
          isMut: true
          isSigner: false
        },
        {
          name: 'owner'
          isMut: false
          isSigner: true
        },
        {
          name: 'payer'
          isMut: true
          isSigner: true
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'bump'
          type: {
            defined: 'InitReserveBumpSeeds'
          }
        },
        {
          name: 'config'
          type: {
            defined: 'ReserveConfig'
          }
        }
      ]
    },
    {
      name: 'initPsyfiReserve'
      accounts: [
        {
          name: 'market'
          isMut: true
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: true
          isSigner: false
        },
        {
          name: 'vault'
          isMut: true
          isSigner: false
        },
        {
          name: 'dexSwapTokens'
          isMut: true
          isSigner: false
        },
        {
          name: 'dexOpenOrders'
          isMut: true
          isSigner: false
        },
        {
          name: 'dexMarket'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenMint'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'dexProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'oraclePrice'
          isMut: false
          isSigner: false
        },
        {
          name: 'oracleProduct'
          isMut: false
          isSigner: false
        },
        {
          name: 'depositNoteMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'loanNoteMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'quoteTokenMint'
          isMut: false
          isSigner: false
        },
        {
          name: 'feeNoteVault'
          isMut: true
          isSigner: false
        },
        {
          name: 'owner'
          isMut: false
          isSigner: true
        },
        {
          name: 'payer'
          isMut: true
          isSigner: true
        },
        {
          name: 'psyfiVaultAccount'
          isMut: false
          isSigner: false
        },
        {
          name: 'collateralAssetMint'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'bump'
          type: {
            defined: 'InitReserveBumpSeeds'
          }
        },
        {
          name: 'config'
          type: {
            defined: 'ReserveConfig'
          }
        }
      ]
    },
    {
      name: 'updateDiscounts'
      accounts: [
        {
          name: 'authority'
          isMut: false
          isSigner: true
        },
        {
          name: 'discounts'
          isMut: true
          isSigner: false
        }
      ]
      args: [
        {
          name: 'mintAddresses'
          type: {
            array: ['publicKey', 20]
          }
        },
        {
          name: 'discountRates'
          type: {
            array: ['u16', 20]
          }
        }
      ]
    },
    {
      name: 'updateReserveConfig'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: true
          isSigner: false
        },
        {
          name: 'owner'
          isMut: false
          isSigner: true
        }
      ]
      args: [
        {
          name: 'newConfig'
          type: {
            defined: 'ReserveConfig'
          }
        }
      ]
    },
    {
      name: 'updateReserveHalts'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: true
          isSigner: false
        },
        {
          name: 'owner'
          isMut: false
          isSigner: true
        }
      ]
      args: [
        {
          name: 'haltState'
          type: 'u8'
        }
      ]
    },
    {
      name: 'initDepositAccount'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: false
          isSigner: false
        },
        {
          name: 'depositNoteMint'
          isMut: false
          isSigner: false
        },
        {
          name: 'depositor'
          isMut: true
          isSigner: true
        },
        {
          name: 'depositAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'bump'
          type: 'u8'
        }
      ]
    },
    {
      name: 'initCollateralAccount'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'obligation'
          isMut: true
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: false
          isSigner: false
        },
        {
          name: 'depositNoteMint'
          isMut: false
          isSigner: false
        },
        {
          name: 'owner'
          isMut: true
          isSigner: true
        },
        {
          name: 'collateralAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'bump'
          type: 'u8'
        }
      ]
    },
    {
      name: 'initLoanAccount'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'obligation'
          isMut: true
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: false
          isSigner: false
        },
        {
          name: 'loanNoteMint'
          isMut: false
          isSigner: false
        },
        {
          name: 'owner'
          isMut: true
          isSigner: true
        },
        {
          name: 'loanAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'bump'
          type: 'u8'
        }
      ]
    },
    {
      name: 'initObligation'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'borrower'
          isMut: true
          isSigner: true
        },
        {
          name: 'obligation'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'bump'
          type: 'u8'
        }
      ]
    },
    {
      name: 'initMarketReward'
      accounts: [
        {
          name: 'market'
          isMut: true
          isSigner: false
        },
        {
          name: 'owner'
          isMut: false
          isSigner: true
        },
        {
          name: 'marketReward'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'initialRewardIndexTimestamp'
          type: 'i64'
        },
        {
          name: 'distributionPeriod'
          type: 'u64'
        },
        {
          name: 'rewardPointsPerPeriod'
          type: 'u64'
        },
        {
          name: 'rewardUnitDecimals'
          type: 'u8'
        },
        {
          name: 'minWithdrawalDuration'
          type: 'u64'
        }
      ]
    },
    {
      name: 'updateReserveReward'
      accounts: [
        {
          name: 'market'
          isMut: true
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: true
          isSigner: false
        },
        {
          name: 'owner'
          isMut: false
          isSigner: true
        }
      ]
      args: [
        {
          name: 'depositRewardMultiplier'
          type: 'u8'
        },
        {
          name: 'borrowRewardMultiplier'
          type: 'u8'
        }
      ]
    },
    {
      name: 'updateMarketReward'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketReward'
          isMut: true
          isSigner: false
        },
        {
          name: 'owner'
          isMut: false
          isSigner: true
        },
        {
          name: 'payer'
          isMut: true
          isSigner: true
        },
        {
          name: 'rewardTokenMint'
          isMut: false
          isSigner: false
        },
        {
          name: 'rewardTokenAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'stateIndex'
          type: 'u8'
        },
        {
          name: 'infoIndex'
          type: 'u8'
        }
      ]
    },
    {
      name: 'updateMarketRewardConfig'
      accounts: [
        {
          name: 'market'
          isMut: true
          isSigner: false
        },
        {
          name: 'owner'
          isMut: false
          isSigner: true
        }
      ]
      args: [
        {
          name: 'minWithdrawalDuration'
          type: 'u64'
        }
      ]
    },
    {
      name: 'accruePositionReward'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: false
          isSigner: false
        },
        {
          name: 'obligation'
          isMut: true
          isSigner: false
        },
        {
          name: 'owner'
          isMut: false
          isSigner: false
        },
        {
          name: 'positionAccount'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'side'
          type: 'u8'
        }
      ]
    },
    {
      name: 'claimRewards'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketReward'
          isMut: true
          isSigner: false
        },
        {
          name: 'owner'
          isMut: false
          isSigner: true
        },
        {
          name: 'obligation'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'periodToClaim'
          type: 'u8'
        }
      ]
    },
    {
      name: 'setMarketOwner'
      accounts: [
        {
          name: 'market'
          isMut: true
          isSigner: false
        },
        {
          name: 'owner'
          isMut: false
          isSigner: true
        }
      ]
      args: [
        {
          name: 'newOwner'
          type: 'publicKey'
        }
      ]
    },
    {
      name: 'setMarketFlags'
      accounts: [
        {
          name: 'market'
          isMut: true
          isSigner: false
        },
        {
          name: 'owner'
          isMut: false
          isSigner: true
        }
      ]
      args: [
        {
          name: 'flags'
          type: 'u64'
        }
      ]
    },
    {
      name: 'syncDiscountRates'
      accounts: [
        {
          name: 'reserve'
          isMut: true
          isSigner: false
        },
        {
          name: 'discounts'
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: 'closeDepositAccount'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: true
          isSigner: false
        },
        {
          name: 'vault'
          isMut: true
          isSigner: false
        },
        {
          name: 'depositNoteMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'depositor'
          isMut: true
          isSigner: true
        },
        {
          name: 'depositAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'receiverAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: 'closeCollateralAccount'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'obligation'
          isMut: true
          isSigner: false
        },
        {
          name: 'owner'
          isMut: true
          isSigner: true
        },
        {
          name: 'collateralAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'depositAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: 'closeLoanAccount'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'obligation'
          isMut: true
          isSigner: false
        },
        {
          name: 'owner'
          isMut: true
          isSigner: true
        },
        {
          name: 'loanAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: 'closeObligation'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'owner'
          isMut: true
          isSigner: true
        },
        {
          name: 'obligation'
          isMut: true
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: 'deposit'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: true
          isSigner: false
        },
        {
          name: 'vault'
          isMut: true
          isSigner: false
        },
        {
          name: 'depositNoteMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'depositor'
          isMut: false
          isSigner: true
        },
        {
          name: 'depositAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'depositSource'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'bump'
          type: 'u8'
        },
        {
          name: 'amount'
          type: {
            defined: 'Amount'
          }
        }
      ]
    },
    {
      name: 'depositTokens'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: true
          isSigner: false
        },
        {
          name: 'vault'
          isMut: true
          isSigner: false
        },
        {
          name: 'depositNoteMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'depositor'
          isMut: false
          isSigner: true
        },
        {
          name: 'depositAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'depositSource'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'amount'
          type: {
            defined: 'Amount'
          }
        }
      ]
    },
    {
      name: 'withdraw'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: true
          isSigner: false
        },
        {
          name: 'vault'
          isMut: true
          isSigner: false
        },
        {
          name: 'depositNoteMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'depositor'
          isMut: false
          isSigner: true
        },
        {
          name: 'depositAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'withdrawAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'jetProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'bump'
          type: 'u8'
        },
        {
          name: 'amount'
          type: {
            defined: 'Amount'
          }
        }
      ]
    },
    {
      name: 'withdrawTokens'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: true
          isSigner: false
        },
        {
          name: 'vault'
          isMut: true
          isSigner: false
        },
        {
          name: 'depositNoteMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'depositor'
          isMut: false
          isSigner: true
        },
        {
          name: 'depositAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'withdrawAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'amount'
          type: {
            defined: 'Amount'
          }
        }
      ]
    },
    {
      name: 'depositCollateral'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: false
          isSigner: false
        },
        {
          name: 'obligation'
          isMut: true
          isSigner: false
        },
        {
          name: 'owner'
          isMut: false
          isSigner: true
        },
        {
          name: 'depositAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'collateralAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'bump'
          type: {
            defined: 'DepositCollateralBumpSeeds'
          }
        },
        {
          name: 'amount'
          type: {
            defined: 'Amount'
          }
        }
      ]
    },
    {
      name: 'withdrawCollateral'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: false
          isSigner: false
        },
        {
          name: 'obligation'
          isMut: true
          isSigner: false
        },
        {
          name: 'owner'
          isMut: false
          isSigner: true
        },
        {
          name: 'depositAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'collateralAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'bump'
          type: {
            defined: 'WithdrawCollateralBumpSeeds'
          }
        },
        {
          name: 'amount'
          type: {
            defined: 'Amount'
          }
        }
      ]
    },
    {
      name: 'borrow'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'obligation'
          isMut: true
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: true
          isSigner: false
        },
        {
          name: 'vault'
          isMut: true
          isSigner: false
        },
        {
          name: 'loanNoteMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'borrower'
          isMut: false
          isSigner: true
        },
        {
          name: 'loanAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'receiverAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'bump'
          type: 'u8'
        },
        {
          name: 'amount'
          type: {
            defined: 'Amount'
          }
        }
      ]
    },
    {
      name: 'repay'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'obligation'
          isMut: true
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: true
          isSigner: false
        },
        {
          name: 'vault'
          isMut: true
          isSigner: false
        },
        {
          name: 'loanNoteMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'loanAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'payerAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'payer'
          isMut: false
          isSigner: true
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'amount'
          type: {
            defined: 'Amount'
          }
        }
      ]
    },
    {
      name: 'liquidate'
      accounts: [
        {
          name: 'market'
          isMut: false
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'obligation'
          isMut: true
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: true
          isSigner: false
        },
        {
          name: 'collateralReserve'
          isMut: false
          isSigner: false
        },
        {
          name: 'vault'
          isMut: true
          isSigner: false
        },
        {
          name: 'loanNoteMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'loanAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'collateralAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'payerAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'receiverObligation'
          isMut: true
          isSigner: false
        },
        {
          name: 'receiverAccount'
          isMut: true
          isSigner: false
        },
        {
          name: 'payer'
          isMut: false
          isSigner: true
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'amount'
          type: {
            defined: 'Amount'
          }
        },
        {
          name: 'minCollateral'
          type: 'u64'
        }
      ]
    },
    {
      name: 'refreshReserve'
      accounts: [
        {
          name: 'market'
          isMut: true
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: false
          isSigner: false
        },
        {
          name: 'pythOraclePrice'
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: 'accrueInterest'
      accounts: [
        {
          name: 'market'
          isMut: true
          isSigner: false
        },
        {
          name: 'marketAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: true
          isSigner: false
        },
        {
          name: 'feeNoteVault'
          isMut: true
          isSigner: false
        },
        {
          name: 'depositNoteMint'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: 'refreshPsyfiReserve'
      accounts: [
        {
          name: 'market'
          isMut: true
          isSigner: false
        },
        {
          name: 'reserve'
          isMut: false
          isSigner: false
        },
        {
          name: 'psyfiVaultAccount'
          isMut: false
          isSigner: false
        },
        {
          name: 'pythOraclePrice'
          isMut: false
          isSigner: false
        }
      ]
      args: []
    }
  ]
  accounts: [
    {
      name: 'discounts'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'reserved'
            type: {
              array: ['u8', 302]
            }
          },
          {
            name: 'version'
            type: 'u16'
          },
          {
            name: 'lastUpdated'
            type: 'i64'
          },
          {
            name: 'authority'
            type: 'publicKey'
          },
          {
            name: 'mintAddresses'
            type: {
              array: ['publicKey', 20]
            }
          },
          {
            name: 'discountRates'
            type: {
              array: ['u16', 20]
            }
          }
        ]
      }
    },
    {
      name: 'marketReward'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'market'
            type: 'publicKey'
          },
          {
            name: 'states'
            type: {
              array: [
                {
                  defined: 'RewardState'
                },
                96
              ]
            }
          }
        ]
      }
    },
    {
      name: 'market'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'version'
            type: 'u32'
          },
          {
            name: 'quoteExponent'
            type: 'i32'
          },
          {
            name: 'quoteCurrency'
            type: {
              array: ['u8', 15]
            }
          },
          {
            name: 'authorityBumpSeed'
            type: {
              array: ['u8', 1]
            }
          },
          {
            name: 'authoritySeed'
            type: 'publicKey'
          },
          {
            name: 'marketAuthority'
            type: 'publicKey'
          },
          {
            name: 'owner'
            type: 'publicKey'
          },
          {
            name: 'quoteTokenMint'
            type: 'publicKey'
          },
          {
            name: 'flags'
            type: 'u64'
          },
          {
            name: 'marketRewardState'
            type: {
              defined: 'MarketRewardState'
            }
          },
          {
            name: 'reserved'
            type: {
              array: ['u8', 352]
            }
          },
          {
            name: 'reserves'
            type: {
              array: ['u8', 15872]
            }
          }
        ]
      }
    },
    {
      name: 'obligation'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'version'
            type: 'u32'
          },
          {
            name: 'reserved0'
            type: 'u32'
          },
          {
            name: 'market'
            type: 'publicKey'
          },
          {
            name: 'owner'
            type: 'publicKey'
          },
          {
            name: 'reserved1'
            type: {
              array: ['u8', 184]
            }
          },
          {
            name: 'cached'
            type: {
              array: ['u8', 256]
            }
          },
          {
            name: 'collateral'
            type: {
              array: ['u8', 2560]
            }
          },
          {
            name: 'loans'
            type: {
              array: ['u8', 2560]
            }
          },
          {
            name: 'accruedRewardUnits'
            type: {
              array: ['u128', 96]
            }
          }
        ]
      }
    },
    {
      name: 'reserve'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'version'
            type: 'u16'
          },
          {
            name: 'index'
            type: 'u16'
          },
          {
            name: 'exponent'
            type: 'i32'
          },
          {
            name: 'market'
            type: 'publicKey'
          },
          {
            name: 'pythOraclePrice'
            type: 'publicKey'
          },
          {
            name: 'pythOracleProduct'
            type: 'publicKey'
          },
          {
            name: 'tokenMint'
            type: 'publicKey'
          },
          {
            name: 'depositNoteMint'
            type: 'publicKey'
          },
          {
            name: 'loanNoteMint'
            type: 'publicKey'
          },
          {
            name: 'vault'
            type: 'publicKey'
          },
          {
            name: 'feeNoteVault'
            type: 'publicKey'
          },
          {
            name: 'dexSwapTokens'
            type: 'publicKey'
          },
          {
            name: 'dexOpenOrders'
            type: 'publicKey'
          },
          {
            name: 'dexMarket'
            type: 'publicKey'
          },
          {
            name: 'reserved0'
            type: {
              array: ['u8', 408]
            }
          },
          {
            name: 'config'
            type: {
              defined: 'ReserveConfig'
            }
          },
          {
            name: 'psyfiVaultConfig'
            type: {
              defined: 'PsyFiVaultConfig'
            }
          },
          {
            name: 'discountRate'
            type: 'u16'
          },
          {
            name: 'discountRateVersion'
            type: 'u16'
          },
          {
            name: 'haltState'
            type: 'u8'
          },
          {
            name: 'reserved1'
            type: {
              array: ['u8', 123]
            }
          },
          {
            name: 'reserved2'
            type: {
              array: ['u128', 32]
            }
          },
          {
            name: 'state'
            type: {
              array: ['u8', 3584]
            }
          }
        ]
      }
    }
  ]
  types: [
    {
      name: 'DepositCollateralBumpSeeds'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'collateralAccount'
            type: 'u8'
          },
          {
            name: 'depositAccount'
            type: 'u8'
          }
        ]
      }
    },
    {
      name: 'InitReserveBumpSeeds'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'vault'
            type: 'u8'
          },
          {
            name: 'feeNoteVault'
            type: 'u8'
          },
          {
            name: 'dexOpenOrders'
            type: 'u8'
          },
          {
            name: 'dexSwapTokens'
            type: 'u8'
          },
          {
            name: 'depositNoteMint'
            type: 'u8'
          },
          {
            name: 'loanNoteMint'
            type: 'u8'
          }
        ]
      }
    },
    {
      name: 'WithdrawCollateralBumpSeeds'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'collateralAccount'
            type: 'u8'
          },
          {
            name: 'depositAccount'
            type: 'u8'
          }
        ]
      }
    },
    {
      name: 'RewardState'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'withdrawalTime'
            type: 'i64'
          },
          {
            name: 'unclaimedRewardUnits'
            type: 'u128'
          },
          {
            name: 'period'
            type: 'u8'
          },
          {
            name: 'reserved0'
            type: {
              array: ['u8', 7]
            }
          },
          {
            name: 'reserved1'
            type: {
              array: ['u8', 32]
            }
          },
          {
            name: 'reserved2'
            type: {
              array: ['u8', 32]
            }
          },
          {
            name: 'info'
            type: {
              array: [
                {
                  defined: 'RewardInfo'
                },
                5
              ]
            }
          }
        ]
      }
    },
    {
      name: 'RewardInfo'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'rewardTokenMint'
            type: 'publicKey'
          },
          {
            name: 'rewardTokenAccount'
            type: 'publicKey'
          }
        ]
      }
    },
    {
      name: 'MarketRewardState'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'marketReward'
            type: 'publicKey'
          },
          {
            name: 'initialRewardIndexTimestamp'
            type: 'i64'
          },
          {
            name: 'distributionPeriod'
            type: 'u64'
          },
          {
            name: 'rewardPointsPerPeriod'
            type: 'u64'
          },
          {
            name: 'totalRewardMultiplier'
            type: 'u64'
          },
          {
            name: 'minWithdrawalDuration'
            type: 'u64'
          },
          {
            name: 'rewardUnitDecimals'
            type: 'u8'
          },
          {
            name: 'reserved0'
            type: {
              array: ['u8', 23]
            }
          },
          {
            name: 'reserved1'
            type: {
              array: ['u8', 64]
            }
          }
        ]
      }
    },
    {
      name: 'PsyFiVaultConfig'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'vaultAccount'
            type: 'publicKey'
          },
          {
            name: 'collateralTokenDecimals'
            type: 'u8'
          },
          {
            name: 'reserved1'
            type: {
              array: ['u8', 31]
            }
          },
          {
            name: 'reserved2'
            type: {
              array: ['u8', 64]
            }
          }
        ]
      }
    },
    {
      name: 'ReserveConfig'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'utilizationRate1'
            type: 'u16'
          },
          {
            name: 'utilizationRate2'
            type: 'u16'
          },
          {
            name: 'borrowRate0'
            type: 'u16'
          },
          {
            name: 'borrowRate1'
            type: 'u16'
          },
          {
            name: 'borrowRate2'
            type: 'u16'
          },
          {
            name: 'borrowRate3'
            type: 'u16'
          },
          {
            name: 'minCollateralRatio'
            type: 'u16'
          },
          {
            name: 'liquidationPremium'
            type: 'u16'
          },
          {
            name: 'manageFeeCollectionThreshold'
            type: 'u64'
          },
          {
            name: 'manageFeeRate'
            type: 'u16'
          },
          {
            name: 'loanOriginationFee'
            type: 'u16'
          },
          {
            name: 'reserved0'
            type: 'u16'
          },
          {
            name: 'confidenceThreshold'
            type: 'u16'
          },
          {
            name: 'liquidationDexTradeMax'
            type: 'u64'
          },
          {
            name: 'depositRewardMultiplier'
            type: 'u8'
          },
          {
            name: 'borrowRewardMultiplier'
            type: 'u8'
          },
          {
            name: 'reserved1'
            type: {
              array: ['u8', 22]
            }
          }
        ]
      }
    },
    {
      name: 'Amount'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'units'
            type: 'u8'
          },
          {
            name: 'value'
            type: 'u64'
          }
        ]
      }
    },
    {
      name: 'CacheInvalidError'
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'Expired'
            fields: [
              {
                name: 'msg'
                type: 'string'
              }
            ]
          },
          {
            name: 'TooNew'
            fields: [
              {
                name: 'msg'
                type: 'string'
              }
            ]
          },
          {
            name: 'Invalidated'
          }
        ]
      }
    },
    {
      name: 'Side'
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'Collateral'
          },
          {
            name: 'Loan'
          }
        ]
      }
    },
    {
      name: 'JobCompletion'
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'Partial'
          },
          {
            name: 'Full'
          }
        ]
      }
    },
    {
      name: 'Rounding'
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'Up'
          },
          {
            name: 'Down'
          }
        ]
      }
    }
  ]
  events: [
    {
      name: 'BorrowEvent'
      fields: [
        {
          name: 'borrower'
          type: 'publicKey'
          index: false
        },
        {
          name: 'reserve'
          type: 'publicKey'
          index: false
        },
        {
          name: 'debt'
          type: 'u64'
          index: false
        }
      ]
    },
    {
      name: 'DepositCollateralEvent'
      fields: [
        {
          name: 'depositor'
          type: 'publicKey'
          index: false
        },
        {
          name: 'reserve'
          type: 'publicKey'
          index: false
        },
        {
          name: 'amount'
          type: {
            defined: 'Amount'
          }
          index: false
        }
      ]
    },
    {
      name: 'LiquidateEvent'
      fields: [
        {
          name: 'borrower'
          type: 'publicKey'
          index: false
        },
        {
          name: 'debtReserve'
          type: 'publicKey'
          index: false
        },
        {
          name: 'collateralReserve'
          type: 'publicKey'
          index: false
        },
        {
          name: 'paidAmount'
          type: {
            defined: 'Amount'
          }
          index: false
        },
        {
          name: 'collateralAmount'
          type: 'u64'
          index: false
        }
      ]
    },
    {
      name: 'RepayEvent'
      fields: [
        {
          name: 'borrower'
          type: 'publicKey'
          index: false
        },
        {
          name: 'reserve'
          type: 'publicKey'
          index: false
        },
        {
          name: 'amount'
          type: {
            defined: 'Amount'
          }
          index: false
        }
      ]
    },
    {
      name: 'WithdrawCollateralEvent'
      fields: [
        {
          name: 'depositor'
          type: 'publicKey'
          index: false
        },
        {
          name: 'reserve'
          type: 'publicKey'
          index: false
        },
        {
          name: 'amount'
          type: {
            defined: 'Amount'
          }
          index: false
        }
      ]
    }
  ]
  errors: [
    {
      code: 6000
      name: 'ArithmeticError'
      msg: 'failed to perform some math operation safely'
    },
    {
      code: 6001
      name: 'InvalidOracle'
      msg: 'oracle account provided is not valid'
    },
    {
      code: 6002
      name: 'NoFreeReserves'
      msg: 'no free space left to add a new reserve in the market'
    },
    {
      code: 6003
      name: 'NoFreeObligation'
      msg: 'no free space left to add the new loan or collateral in an obligation'
    },
    {
      code: 6004
      name: 'UnregisteredPosition'
      msg: "the obligation account doesn't have any record of the loan or collateral account"
    },
    {
      code: 6005
      name: 'InvalidOraclePrice'
      msg: 'the oracle price is negative or does not meet confidence threshold.'
    },
    {
      code: 6006
      name: 'InvalidOracleExpo'
      msg: 'the oracle exponent is positive, expected a negative exponent'
    },
    {
      code: 6007
      name: 'OraclePriceExpired'
      msg: 'the oracle price is outdated, expected a more recent price'
    },
    {
      code: 6008
      name: 'InsufficientCollateral'
      msg: 'there is not enough collateral deposited to borrow against'
    },
    {
      code: 6009
      name: 'InsufficientCollateralInVault'
      msg: 'there is not enough collateral in the vault to borrow against'
    },
    {
      code: 6010
      name: 'SimultaneousDepositAndBorrow'
      msg: 'cannot both deposit collateral to and borrow from the same reserve'
    },
    {
      code: 6011
      name: 'ObligationHealthy'
      msg: 'cannot liquidate a healthy position'
    },
    {
      code: 6012
      name: 'ObligationUnhealthy'
      msg: 'cannot perform an action that would leave the obligation unhealthy'
    },
    {
      code: 6013
      name: 'ExceptionalReserveState'
      msg: 'reserve requires special action; call refresh_reserve until up to date'
    },
    {
      code: 6014
      name: 'InvalidAmountUnits'
      msg: 'the units provided in the amount are not valid for the instruction'
    },
    {
      code: 6015
      name: 'InvalidDexMarketMints'
      msg: "the tokens in the DEX market don't match the reserve and lending market quote token"
    },
    {
      code: 6016
      name: 'InvalidMarketAuthority'
      msg: "the market authority provided doesn't match the market account"
    },
    {
      code: 6017
      name: 'InvalidLiquidationQuoteTokenAccount'
      msg: 'the quote token account provided cannot be used for liquidations'
    },
    {
      code: 6018
      name: 'ObligationAccountMismatch'
      msg: "the obligation account doesn't have the collateral/loan registered"
    },
    {
      code: 6019
      name: 'UnknownInstruction'
      msg: 'unknown instruction'
    },
    {
      code: 6020
      name: 'Disallowed'
      msg: 'current conditions prevent an action from being performed'
    },
    {
      code: 6021
      name: 'LiquidationSwapSlipped'
      msg: 'the actual slipped amount on the DEX trade exceeded the threshold configured'
    },
    {
      code: 6022
      name: 'CollateralValueTooSmall'
      msg: 'the collateral value is too small for a DEX trade'
    },
    {
      code: 6023
      name: 'LiquidationLowCollateral'
      msg: 'the collateral returned by the liquidation is smaller than requested'
    },
    {
      code: 6024
      name: 'NotSupported'
      msg: 'this action is currently not supported by this version of the program'
    },
    {
      code: 6025
      name: 'MarketHalted'
      msg: 'the market has currently halted this kind of operation'
    },
    {
      code: 6026
      name: 'ReserveHaltedDeposits'
      msg: 'the reserve has currently halted new deposits'
    },
    {
      code: 6027
      name: 'ReserveHaltedBorrows'
      msg: 'the reserve has currently halted new borrows'
    },
    {
      code: 6028
      name: 'ReserveHaltedRepays'
      msg: 'the reserve has currently halted repayments'
    },
    {
      code: 6029
      name: 'ReserveHaltedWithdraws'
      msg: 'the reserve has currently halted withdraws'
    },
    {
      code: 6030
      name: 'InvalidParameter'
      msg: 'a given parameter is not valid'
    },
    {
      code: 6031
      name: 'PositionNotEmpty'
      msg: 'the obligation account still holds position in the loan or collateral account'
    },
    {
      code: 6032
      name: 'ObligationPositionNotFound'
      msg: 'position not found in an obligation'
    },
    {
      code: 6033
      name: 'AccountNotEmptyError'
      msg: 'the collateral/loan account is not empty'
    },
    {
      code: 6034
      name: 'PsyFiVaultMismatch'
      msg: 'PsyFi vault account does not match'
    },
    {
      code: 6035
      name: 'InvalidVaultAccountState'
      msg: 'VaultAccount in invalid state'
    },
    {
      code: 6036
      name: 'InvalidOptionType'
      msg: 'Option type is not supported'
    },
    {
      code: 6037
      name: 'DiscountsBadSigner'
      msg: 'This Signer is not authorized to update the discounts'
    },
    {
      code: 6038
      name: 'ReserveHaltBadSigner'
      msg: 'This Signer is not authorized to update the reserves halted operations'
    },
    {
      code: 6039
      name: 'ReserveInfoStale'
      msg: 'Reserve info is stale: run the refresh ix'
    },
    {
      code: 6040
      name: 'ReserveNoteStale'
      msg: 'Reserve note is stale: run the accrue interest ix'
    },
    {
      code: 6041
      name: 'MaxAllowedPositions'
      msg: 'Account exceeds max allowed positions: close existing collateral or borrowed position'
    },
    {
      code: 6042
      name: 'TimestampTooSmall'
      msg: 'Timestamp cannot be smaller than initial reward timestamp'
    },
    {
      code: 6043
      name: 'PeriodTooShort'
      msg: 'Distribution period is too short'
    },
    {
      code: 6044
      name: 'UnitDecimalsLimit'
      msg: 'Reward unit decimals exeeds limit'
    },
    {
      code: 6045
      name: 'IndexExceedBounds'
      msg: 'Out of bounds error in accessing index of an array'
    },
    {
      code: 6046
      name: 'PastPeriodUpdateError'
      msg: 'Cannot update past periods'
    },
    {
      code: 6047
      name: 'RewardInfoAlreadyExists'
      msg: 'Reward info is already initialized'
    },
    {
      code: 6048
      name: 'RewardInfoEmptyIndex'
      msg: 'An empty reward info index exists before current index'
    },
    {
      code: 6049
      name: 'NoRecentRewardAccrual'
      msg: 'No reward has been accrued recently. Please accrue rewards with accrue_interest ix.'
    },
    {
      code: 6050
      name: 'PeriodInFuture'
      msg: 'Cannot claim reward from a period that has not started'
    },
    {
      code: 6051
      name: 'NoPointsAvailable'
      msg: 'No points available for claiming'
    },
    {
      code: 6052
      name: 'WithdrawalNotAllowed'
      msg: 'Cannot claim points yet as withdrawal is not allowed'
    },
    {
      code: 6053
      name: 'TokenMintMismatch'
      msg: 'Token account mint mismatch'
    },
    {
      code: 6054
      name: 'TokenOwnerMismatch'
      msg: 'Token account owner mismatch'
    },
    {
      code: 6055
      name: 'TokenAccountMismatch'
      msg: 'Token account key mismatch'
    },
    {
      code: 6056
      name: 'InvalidMarketReward'
      msg: 'Invalid market reward'
    },
    {
      code: 6057
      name: 'MustAccrualInterest'
      msg: 'Interest must be accrued for reserve in the same block before initializing a new position'
    },
    {
      code: 6058
      name: 'RewardsEnded'
      msg: 'Rewards have ended permanently and can no longer be altered'
    }
  ]
}

export const PsyLendIdl: Psylend = {
  version: '0.1.0',
  name: 'psylend',
  instructions: [
    {
      name: 'initDiscounts',
      accounts: [
        {
          name: 'signer',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'discounts',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'mintAddresses',
          type: {
            array: ['publicKey', 20],
          },
        },
        {
          name: 'discountRates',
          type: {
            array: ['u16', 20],
          },
        },
      ],
    },
    {
      name: 'initMarket',
      accounts: [
        {
          name: 'market',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'owner',
          type: 'publicKey',
        },
        {
          name: 'quoteCurrency',
          type: 'string',
        },
        {
          name: 'quoteTokenMint',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'initReserve',
      accounts: [
        {
          name: 'market',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dexSwapTokens',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dexOpenOrders',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dexMarket',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dexProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'oraclePrice',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'oracleProduct',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'depositNoteMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'loanNoteMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'quoteTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'feeNoteVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bump',
          type: {
            defined: 'InitReserveBumpSeeds',
          },
        },
        {
          name: 'config',
          type: {
            defined: 'ReserveConfig',
          },
        },
      ],
    },
    {
      name: 'initPsyfiReserve',
      accounts: [
        {
          name: 'market',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dexSwapTokens',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dexOpenOrders',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'dexMarket',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dexProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'oraclePrice',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'oracleProduct',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'depositNoteMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'loanNoteMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'quoteTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'feeNoteVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'psyfiVaultAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'collateralAssetMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bump',
          type: {
            defined: 'InitReserveBumpSeeds',
          },
        },
        {
          name: 'config',
          type: {
            defined: 'ReserveConfig',
          },
        },
      ],
    },
    {
      name: 'updateDiscounts',
      accounts: [
        {
          name: 'authority',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'discounts',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'mintAddresses',
          type: {
            array: ['publicKey', 20],
          },
        },
        {
          name: 'discountRates',
          type: {
            array: ['u16', 20],
          },
        },
      ],
    },
    {
      name: 'updateReserveConfig',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: 'newConfig',
          type: {
            defined: 'ReserveConfig',
          },
        },
      ],
    },
    {
      name: 'updateReserveHalts',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: 'haltState',
          type: 'u8',
        },
      ],
    },
    {
      name: 'initDepositAccount',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'depositNoteMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'depositor',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'depositAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bump',
          type: 'u8',
        },
      ],
    },
    {
      name: 'initCollateralAccount',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'obligation',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'depositNoteMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'collateralAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bump',
          type: 'u8',
        },
      ],
    },
    {
      name: 'initLoanAccount',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'obligation',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'loanNoteMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'loanAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bump',
          type: 'u8',
        },
      ],
    },
    {
      name: 'initObligation',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'borrower',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'obligation',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bump',
          type: 'u8',
        },
      ],
    },
    {
      name: 'initMarketReward',
      accounts: [
        {
          name: 'market',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'marketReward',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'initialRewardIndexTimestamp',
          type: 'i64',
        },
        {
          name: 'distributionPeriod',
          type: 'u64',
        },
        {
          name: 'rewardPointsPerPeriod',
          type: 'u64',
        },
        {
          name: 'rewardUnitDecimals',
          type: 'u8',
        },
        {
          name: 'minWithdrawalDuration',
          type: 'u64',
        },
      ],
    },
    {
      name: 'updateReserveReward',
      accounts: [
        {
          name: 'market',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: 'depositRewardMultiplier',
          type: 'u8',
        },
        {
          name: 'borrowRewardMultiplier',
          type: 'u8',
        },
      ],
    },
    {
      name: 'updateMarketReward',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketReward',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'rewardTokenMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rewardTokenAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'stateIndex',
          type: 'u8',
        },
        {
          name: 'infoIndex',
          type: 'u8',
        },
      ],
    },
    {
      name: 'updateMarketRewardConfig',
      accounts: [
        {
          name: 'market',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: 'minWithdrawalDuration',
          type: 'u64',
        },
      ],
    },
    {
      name: 'accruePositionReward',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'obligation',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'positionAccount',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'side',
          type: 'u8',
        },
      ],
    },
    {
      name: 'claimRewards',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketReward',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'obligation',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'periodToClaim',
          type: 'u8',
        },
      ],
    },
    {
      name: 'setMarketOwner',
      accounts: [
        {
          name: 'market',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: 'newOwner',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'setMarketFlags',
      accounts: [
        {
          name: 'market',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: 'flags',
          type: 'u64',
        },
      ],
    },
    {
      name: 'syncDiscountRates',
      accounts: [
        {
          name: 'reserve',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'discounts',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'closeDepositAccount',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'depositNoteMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'depositor',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'depositAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'receiverAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'closeCollateralAccount',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'obligation',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'collateralAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'depositAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'closeLoanAccount',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'obligation',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'loanAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'closeObligation',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'obligation',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'deposit',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'depositNoteMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'depositor',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'depositAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'depositSource',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bump',
          type: 'u8',
        },
        {
          name: 'amount',
          type: {
            defined: 'Amount',
          },
        },
      ],
    },
    {
      name: 'depositTokens',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'depositNoteMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'depositor',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'depositAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'depositSource',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: {
            defined: 'Amount',
          },
        },
      ],
    },
    {
      name: 'withdraw',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'depositNoteMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'depositor',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'depositAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'withdrawAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'jetProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bump',
          type: 'u8',
        },
        {
          name: 'amount',
          type: {
            defined: 'Amount',
          },
        },
      ],
    },
    {
      name: 'withdrawTokens',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'depositNoteMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'depositor',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'depositAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'withdrawAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: {
            defined: 'Amount',
          },
        },
      ],
    },
    {
      name: 'depositCollateral',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'obligation',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'depositAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collateralAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bump',
          type: {
            defined: 'DepositCollateralBumpSeeds',
          },
        },
        {
          name: 'amount',
          type: {
            defined: 'Amount',
          },
        },
      ],
    },
    {
      name: 'withdrawCollateral',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'obligation',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'owner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'depositAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collateralAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bump',
          type: {
            defined: 'WithdrawCollateralBumpSeeds',
          },
        },
        {
          name: 'amount',
          type: {
            defined: 'Amount',
          },
        },
      ],
    },
    {
      name: 'borrow',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'obligation',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'loanNoteMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'borrower',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'loanAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'receiverAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'bump',
          type: 'u8',
        },
        {
          name: 'amount',
          type: {
            defined: 'Amount',
          },
        },
      ],
    },
    {
      name: 'repay',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'obligation',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'loanNoteMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'loanAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'payerAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'payer',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: {
            defined: 'Amount',
          },
        },
      ],
    },
    {
      name: 'liquidate',
      accounts: [
        {
          name: 'market',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'obligation',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collateralReserve',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'loanNoteMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'loanAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'collateralAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'payerAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'receiverObligation',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'receiverAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'payer',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: {
            defined: 'Amount',
          },
        },
        {
          name: 'minCollateral',
          type: 'u64',
        },
      ],
    },
    {
      name: 'refreshReserve',
      accounts: [
        {
          name: 'market',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'pythOraclePrice',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'accrueInterest',
      accounts: [
        {
          name: 'market',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'marketAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'feeNoteVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'depositNoteMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'refreshPsyfiReserve',
      accounts: [
        {
          name: 'market',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'reserve',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'psyfiVaultAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'pythOraclePrice',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'discounts',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'reserved',
            type: {
              array: ['u8', 302],
            },
          },
          {
            name: 'version',
            type: 'u16',
          },
          {
            name: 'lastUpdated',
            type: 'i64',
          },
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'mintAddresses',
            type: {
              array: ['publicKey', 20],
            },
          },
          {
            name: 'discountRates',
            type: {
              array: ['u16', 20],
            },
          },
        ],
      },
    },
    {
      name: 'marketReward',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'market',
            type: 'publicKey',
          },
          {
            name: 'states',
            type: {
              array: [
                {
                  defined: 'RewardState',
                },
                96,
              ],
            },
          },
        ],
      },
    },
    {
      name: 'market',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'version',
            type: 'u32',
          },
          {
            name: 'quoteExponent',
            type: 'i32',
          },
          {
            name: 'quoteCurrency',
            type: {
              array: ['u8', 15],
            },
          },
          {
            name: 'authorityBumpSeed',
            type: {
              array: ['u8', 1],
            },
          },
          {
            name: 'authoritySeed',
            type: 'publicKey',
          },
          {
            name: 'marketAuthority',
            type: 'publicKey',
          },
          {
            name: 'owner',
            type: 'publicKey',
          },
          {
            name: 'quoteTokenMint',
            type: 'publicKey',
          },
          {
            name: 'flags',
            type: 'u64',
          },
          {
            name: 'marketRewardState',
            type: {
              defined: 'MarketRewardState',
            },
          },
          {
            name: 'reserved',
            type: {
              array: ['u8', 352],
            },
          },
          {
            name: 'reserves',
            type: {
              array: ['u8', 15872],
            },
          },
        ],
      },
    },
    {
      name: 'obligation',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'version',
            type: 'u32',
          },
          {
            name: 'reserved0',
            type: 'u32',
          },
          {
            name: 'market',
            type: 'publicKey',
          },
          {
            name: 'owner',
            type: 'publicKey',
          },
          {
            name: 'reserved1',
            type: {
              array: ['u8', 184],
            },
          },
          {
            name: 'cached',
            type: {
              array: ['u8', 256],
            },
          },
          {
            name: 'collateral',
            type: {
              array: ['u8', 2560],
            },
          },
          {
            name: 'loans',
            type: {
              array: ['u8', 2560],
            },
          },
          {
            name: 'accruedRewardUnits',
            type: {
              array: ['u128', 96],
            },
          },
        ],
      },
    },
    {
      name: 'reserve',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'version',
            type: 'u16',
          },
          {
            name: 'index',
            type: 'u16',
          },
          {
            name: 'exponent',
            type: 'i32',
          },
          {
            name: 'market',
            type: 'publicKey',
          },
          {
            name: 'pythOraclePrice',
            type: 'publicKey',
          },
          {
            name: 'pythOracleProduct',
            type: 'publicKey',
          },
          {
            name: 'tokenMint',
            type: 'publicKey',
          },
          {
            name: 'depositNoteMint',
            type: 'publicKey',
          },
          {
            name: 'loanNoteMint',
            type: 'publicKey',
          },
          {
            name: 'vault',
            type: 'publicKey',
          },
          {
            name: 'feeNoteVault',
            type: 'publicKey',
          },
          {
            name: 'dexSwapTokens',
            type: 'publicKey',
          },
          {
            name: 'dexOpenOrders',
            type: 'publicKey',
          },
          {
            name: 'dexMarket',
            type: 'publicKey',
          },
          {
            name: 'reserved0',
            type: {
              array: ['u8', 408],
            },
          },
          {
            name: 'config',
            type: {
              defined: 'ReserveConfig',
            },
          },
          {
            name: 'psyfiVaultConfig',
            type: {
              defined: 'PsyFiVaultConfig',
            },
          },
          {
            name: 'discountRate',
            type: 'u16',
          },
          {
            name: 'discountRateVersion',
            type: 'u16',
          },
          {
            name: 'haltState',
            type: 'u8',
          },
          {
            name: 'reserved1',
            type: {
              array: ['u8', 123],
            },
          },
          {
            name: 'reserved2',
            type: {
              array: ['u128', 32],
            },
          },
          {
            name: 'state',
            type: {
              array: ['u8', 3584],
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'DepositCollateralBumpSeeds',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collateralAccount',
            type: 'u8',
          },
          {
            name: 'depositAccount',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'InitReserveBumpSeeds',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'vault',
            type: 'u8',
          },
          {
            name: 'feeNoteVault',
            type: 'u8',
          },
          {
            name: 'dexOpenOrders',
            type: 'u8',
          },
          {
            name: 'dexSwapTokens',
            type: 'u8',
          },
          {
            name: 'depositNoteMint',
            type: 'u8',
          },
          {
            name: 'loanNoteMint',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'WithdrawCollateralBumpSeeds',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'collateralAccount',
            type: 'u8',
          },
          {
            name: 'depositAccount',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'RewardState',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'withdrawalTime',
            type: 'i64',
          },
          {
            name: 'unclaimedRewardUnits',
            type: 'u128',
          },
          {
            name: 'period',
            type: 'u8',
          },
          {
            name: 'reserved0',
            type: {
              array: ['u8', 7],
            },
          },
          {
            name: 'reserved1',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'reserved2',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'info',
            type: {
              array: [
                {
                  defined: 'RewardInfo',
                },
                5,
              ],
            },
          },
        ],
      },
    },
    {
      name: 'RewardInfo',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'rewardTokenMint',
            type: 'publicKey',
          },
          {
            name: 'rewardTokenAccount',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'MarketRewardState',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'marketReward',
            type: 'publicKey',
          },
          {
            name: 'initialRewardIndexTimestamp',
            type: 'i64',
          },
          {
            name: 'distributionPeriod',
            type: 'u64',
          },
          {
            name: 'rewardPointsPerPeriod',
            type: 'u64',
          },
          {
            name: 'totalRewardMultiplier',
            type: 'u64',
          },
          {
            name: 'minWithdrawalDuration',
            type: 'u64',
          },
          {
            name: 'rewardUnitDecimals',
            type: 'u8',
          },
          {
            name: 'reserved0',
            type: {
              array: ['u8', 23],
            },
          },
          {
            name: 'reserved1',
            type: {
              array: ['u8', 64],
            },
          },
        ],
      },
    },
    {
      name: 'PsyFiVaultConfig',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'vaultAccount',
            type: 'publicKey',
          },
          {
            name: 'collateralTokenDecimals',
            type: 'u8',
          },
          {
            name: 'reserved1',
            type: {
              array: ['u8', 31],
            },
          },
          {
            name: 'reserved2',
            type: {
              array: ['u8', 64],
            },
          },
        ],
      },
    },
    {
      name: 'ReserveConfig',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'utilizationRate1',
            type: 'u16',
          },
          {
            name: 'utilizationRate2',
            type: 'u16',
          },
          {
            name: 'borrowRate0',
            type: 'u16',
          },
          {
            name: 'borrowRate1',
            type: 'u16',
          },
          {
            name: 'borrowRate2',
            type: 'u16',
          },
          {
            name: 'borrowRate3',
            type: 'u16',
          },
          {
            name: 'minCollateralRatio',
            type: 'u16',
          },
          {
            name: 'liquidationPremium',
            type: 'u16',
          },
          {
            name: 'manageFeeCollectionThreshold',
            type: 'u64',
          },
          {
            name: 'manageFeeRate',
            type: 'u16',
          },
          {
            name: 'loanOriginationFee',
            type: 'u16',
          },
          {
            name: 'reserved0',
            type: 'u16',
          },
          {
            name: 'confidenceThreshold',
            type: 'u16',
          },
          {
            name: 'liquidationDexTradeMax',
            type: 'u64',
          },
          {
            name: 'depositRewardMultiplier',
            type: 'u8',
          },
          {
            name: 'borrowRewardMultiplier',
            type: 'u8',
          },
          {
            name: 'reserved1',
            type: {
              array: ['u8', 22],
            },
          },
        ],
      },
    },
    {
      name: 'Amount',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'units',
            type: 'u8',
          },
          {
            name: 'value',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'CacheInvalidError',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Expired',
            fields: [
              {
                name: 'msg',
                type: 'string',
              },
            ],
          },
          {
            name: 'TooNew',
            fields: [
              {
                name: 'msg',
                type: 'string',
              },
            ],
          },
          {
            name: 'Invalidated',
          },
        ],
      },
    },
    {
      name: 'Side',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Collateral',
          },
          {
            name: 'Loan',
          },
        ],
      },
    },
    {
      name: 'JobCompletion',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Partial',
          },
          {
            name: 'Full',
          },
        ],
      },
    },
    {
      name: 'Rounding',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Up',
          },
          {
            name: 'Down',
          },
        ],
      },
    },
  ],
  events: [
    {
      name: 'BorrowEvent',
      fields: [
        {
          name: 'borrower',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'reserve',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'debt',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'DepositCollateralEvent',
      fields: [
        {
          name: 'depositor',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'reserve',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amount',
          type: {
            defined: 'Amount',
          },
          index: false,
        },
      ],
    },
    {
      name: 'LiquidateEvent',
      fields: [
        {
          name: 'borrower',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'debtReserve',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'collateralReserve',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'paidAmount',
          type: {
            defined: 'Amount',
          },
          index: false,
        },
        {
          name: 'collateralAmount',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'RepayEvent',
      fields: [
        {
          name: 'borrower',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'reserve',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amount',
          type: {
            defined: 'Amount',
          },
          index: false,
        },
      ],
    },
    {
      name: 'WithdrawCollateralEvent',
      fields: [
        {
          name: 'depositor',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'reserve',
          type: 'publicKey',
          index: false,
        },
        {
          name: 'amount',
          type: {
            defined: 'Amount',
          },
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'ArithmeticError',
      msg: 'failed to perform some math operation safely',
    },
    {
      code: 6001,
      name: 'InvalidOracle',
      msg: 'oracle account provided is not valid',
    },
    {
      code: 6002,
      name: 'NoFreeReserves',
      msg: 'no free space left to add a new reserve in the market',
    },
    {
      code: 6003,
      name: 'NoFreeObligation',
      msg:
        'no free space left to add the new loan or collateral in an obligation',
    },
    {
      code: 6004,
      name: 'UnregisteredPosition',
      msg:
        "the obligation account doesn't have any record of the loan or collateral account",
    },
    {
      code: 6005,
      name: 'InvalidOraclePrice',
      msg:
        'the oracle price is negative or does not meet confidence threshold.',
    },
    {
      code: 6006,
      name: 'InvalidOracleExpo',
      msg: 'the oracle exponent is positive, expected a negative exponent',
    },
    {
      code: 6007,
      name: 'OraclePriceExpired',
      msg: 'the oracle price is outdated, expected a more recent price',
    },
    {
      code: 6008,
      name: 'InsufficientCollateral',
      msg: 'there is not enough collateral deposited to borrow against',
    },
    {
      code: 6009,
      name: 'InsufficientCollateralInVault',
      msg: 'there is not enough collateral in the vault to borrow against',
    },
    {
      code: 6010,
      name: 'SimultaneousDepositAndBorrow',
      msg: 'cannot both deposit collateral to and borrow from the same reserve',
    },
    {
      code: 6011,
      name: 'ObligationHealthy',
      msg: 'cannot liquidate a healthy position',
    },
    {
      code: 6012,
      name: 'ObligationUnhealthy',
      msg: 'cannot perform an action that would leave the obligation unhealthy',
    },
    {
      code: 6013,
      name: 'ExceptionalReserveState',
      msg:
        'reserve requires special action; call refresh_reserve until up to date',
    },
    {
      code: 6014,
      name: 'InvalidAmountUnits',
      msg: 'the units provided in the amount are not valid for the instruction',
    },
    {
      code: 6015,
      name: 'InvalidDexMarketMints',
      msg:
        "the tokens in the DEX market don't match the reserve and lending market quote token",
    },
    {
      code: 6016,
      name: 'InvalidMarketAuthority',
      msg: "the market authority provided doesn't match the market account",
    },
    {
      code: 6017,
      name: 'InvalidLiquidationQuoteTokenAccount',
      msg: 'the quote token account provided cannot be used for liquidations',
    },
    {
      code: 6018,
      name: 'ObligationAccountMismatch',
      msg: "the obligation account doesn't have the collateral/loan registered",
    },
    {
      code: 6019,
      name: 'UnknownInstruction',
      msg: 'unknown instruction',
    },
    {
      code: 6020,
      name: 'Disallowed',
      msg: 'current conditions prevent an action from being performed',
    },
    {
      code: 6021,
      name: 'LiquidationSwapSlipped',
      msg:
        'the actual slipped amount on the DEX trade exceeded the threshold configured',
    },
    {
      code: 6022,
      name: 'CollateralValueTooSmall',
      msg: 'the collateral value is too small for a DEX trade',
    },
    {
      code: 6023,
      name: 'LiquidationLowCollateral',
      msg:
        'the collateral returned by the liquidation is smaller than requested',
    },
    {
      code: 6024,
      name: 'NotSupported',
      msg:
        'this action is currently not supported by this version of the program',
    },
    {
      code: 6025,
      name: 'MarketHalted',
      msg: 'the market has currently halted this kind of operation',
    },
    {
      code: 6026,
      name: 'ReserveHaltedDeposits',
      msg: 'the reserve has currently halted new deposits',
    },
    {
      code: 6027,
      name: 'ReserveHaltedBorrows',
      msg: 'the reserve has currently halted new borrows',
    },
    {
      code: 6028,
      name: 'ReserveHaltedRepays',
      msg: 'the reserve has currently halted repayments',
    },
    {
      code: 6029,
      name: 'ReserveHaltedWithdraws',
      msg: 'the reserve has currently halted withdraws',
    },
    {
      code: 6030,
      name: 'InvalidParameter',
      msg: 'a given parameter is not valid',
    },
    {
      code: 6031,
      name: 'PositionNotEmpty',
      msg:
        'the obligation account still holds position in the loan or collateral account',
    },
    {
      code: 6032,
      name: 'ObligationPositionNotFound',
      msg: 'position not found in an obligation',
    },
    {
      code: 6033,
      name: 'AccountNotEmptyError',
      msg: 'the collateral/loan account is not empty',
    },
    {
      code: 6034,
      name: 'PsyFiVaultMismatch',
      msg: 'PsyFi vault account does not match',
    },
    {
      code: 6035,
      name: 'InvalidVaultAccountState',
      msg: 'VaultAccount in invalid state',
    },
    {
      code: 6036,
      name: 'InvalidOptionType',
      msg: 'Option type is not supported',
    },
    {
      code: 6037,
      name: 'DiscountsBadSigner',
      msg: 'This Signer is not authorized to update the discounts',
    },
    {
      code: 6038,
      name: 'ReserveHaltBadSigner',
      msg:
        'This Signer is not authorized to update the reserves halted operations',
    },
    {
      code: 6039,
      name: 'ReserveInfoStale',
      msg: 'Reserve info is stale: run the refresh ix',
    },
    {
      code: 6040,
      name: 'ReserveNoteStale',
      msg: 'Reserve note is stale: run the accrue interest ix',
    },
    {
      code: 6041,
      name: 'MaxAllowedPositions',
      msg:
        'Account exceeds max allowed positions: close existing collateral or borrowed position',
    },
    {
      code: 6042,
      name: 'TimestampTooSmall',
      msg: 'Timestamp cannot be smaller than initial reward timestamp',
    },
    {
      code: 6043,
      name: 'PeriodTooShort',
      msg: 'Distribution period is too short',
    },
    {
      code: 6044,
      name: 'UnitDecimalsLimit',
      msg: 'Reward unit decimals exeeds limit',
    },
    {
      code: 6045,
      name: 'IndexExceedBounds',
      msg: 'Out of bounds error in accessing index of an array',
    },
    {
      code: 6046,
      name: 'PastPeriodUpdateError',
      msg: 'Cannot update past periods',
    },
    {
      code: 6047,
      name: 'RewardInfoAlreadyExists',
      msg: 'Reward info is already initialized',
    },
    {
      code: 6048,
      name: 'RewardInfoEmptyIndex',
      msg: 'An empty reward info index exists before current index',
    },
    {
      code: 6049,
      name: 'NoRecentRewardAccrual',
      msg:
        'No reward has been accrued recently. Please accrue rewards with accrue_interest ix.',
    },
    {
      code: 6050,
      name: 'PeriodInFuture',
      msg: 'Cannot claim reward from a period that has not started',
    },
    {
      code: 6051,
      name: 'NoPointsAvailable',
      msg: 'No points available for claiming',
    },
    {
      code: 6052,
      name: 'WithdrawalNotAllowed',
      msg: 'Cannot claim points yet as withdrawal is not allowed',
    },
    {
      code: 6053,
      name: 'TokenMintMismatch',
      msg: 'Token account mint mismatch',
    },
    {
      code: 6054,
      name: 'TokenOwnerMismatch',
      msg: 'Token account owner mismatch',
    },
    {
      code: 6055,
      name: 'TokenAccountMismatch',
      msg: 'Token account key mismatch',
    },
    {
      code: 6056,
      name: 'InvalidMarketReward',
      msg: 'Invalid market reward',
    },
    {
      code: 6057,
      name: 'MustAccrualInterest',
      msg:
        'Interest must be accrued for reserve in the same block before initializing a new position',
    },
    {
      code: 6058,
      name: 'RewardsEnded',
      msg: 'Rewards have ended permanently and can no longer be altered',
    },
  ],
}
