import Select from '@components/inputs/Select'
import { ProgramAccount } from '@project-serum/anchor'
import {
  convertAprToApy,
  decodeReserveStateStruct,
  getBorrowAPR,
  getSupplyAPR,
  lendBNToNumber,
  ReserveAccount,
} from '@utils/instructions/PsyFinance'
import TokenIcon from '@components/treasuryV2/icons/TokenIcon'
import tokenPriceService from '@utils/services/tokenPrice'
import { useMemo } from 'react'
import { abbreviateAddress } from '@utils/formatting'

export const PsyLendReserveSelector = ({
  onChange,
  reserves,
  value,
}: {
  onChange: (val: ProgramAccount<ReserveAccount>) => void
  reserves: ProgramAccount<ReserveAccount>[]
  value: ProgramAccount<ReserveAccount> | undefined
}) => {
  return (
    <Select
      componentLabel={value ? <ReserveView reserve={value} /> : undefined}
      label="Lending reserve"
      onChange={onChange}
      value={value?.publicKey.toBase58()}
    >
      {reserves.map((reserve) => {
        return (
          <Select.Option
            className="border-red"
            key={reserve.publicKey.toBase58()}
            value={reserve}
          >
            <ReserveView reserve={reserve} />
          </Select.Option>
        )
      })}
    </Select>
  )
}

const ReserveView = ({
  reserve,
}: {
  reserve: ProgramAccount<ReserveAccount>
}) => {
  const decimal = Math.abs(reserve.account.exponent)
  const info = useMemo(
    () => tokenPriceService.getTokenInfo(reserve.account.tokenMint.toBase58()),
    [reserve.account.tokenMint]
  )
  const reserveState = useMemo(() => {
    return decodeReserveStateStruct(
      Buffer.from((reserve.account.state as unknown) as number[])
    )
  }, [reserve.account.state])
  const totalLent = lendBNToNumber(reserveState.outstandingDebt) / 10 ** decimal
  const totalDeposits = reserveState.totalDeposits.toNumber() / 10 ** decimal
  const totalSupplied = totalLent + totalDeposits
  const utilizationRate = totalLent / totalSupplied
  const borrowApr = getBorrowAPR(reserve.account.config, utilizationRate) || 0
  const supplyApr =
    getSupplyAPR(
      borrowApr,
      reserve.account.config.manageFeeRate,
      utilizationRate
    ) || 0
  const supplyApyPercent = convertAprToApy(supplyApr) * 100

  return (
    <div className="grid grid-cols-[40px,1fr] gap-x-4 text-fgd-1 items-center w-full">
      <div>
        <TokenIcon className="h-10 w-10 fill-white/50 stroke-none" />
      </div>
      <div className="mb-2 text-fgd-3 text-xs">
        {info?.name ?? abbreviateAddress(reserve.account.tokenMint)}
      </div>
      <div className="flex space-x-3 text-xs text-fgd-3">
        <div className="flex items-center">
          Supplied:
          <span className="ml-1 text-fgd-1">
            {totalSupplied.toPrecision(4)}
          </span>
        </div>
        <div className="flex items-center">
          Utilization:
          <span className="ml-1 text-fgd-1">{utilizationRate.toFixed(4)}</span>
        </div>
        <div className="flex items-center">
          APY:
          <span className="ml-1 text-fgd-1 whitespace-nowrap">
            {supplyApyPercent.toFixed(2)} %
          </span>
        </div>
      </div>
    </div>
  )
}
