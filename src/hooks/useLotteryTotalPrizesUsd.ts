import { usePriceOvenUsdc } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalCake = getBalanceNumber(totalRewards)
  const ovenPriceUsdc = usePriceOvenUsdc()

  return totalCake * ovenPriceUsdc.toNumber()
}

export default useLotteryTotalPrizesUsd
