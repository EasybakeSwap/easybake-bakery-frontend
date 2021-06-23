import BigNumber from 'bignumber.js'
import { getOvenAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's OVEN balance is at least the amount passed in
 */
const useHasOvenBalance = (minimumBalance: BigNumber) => {
  const { balance: ovenBalance } = useTokenBalance(getOvenAddress())
  return ovenBalance.gte(minimumBalance)
}

export default useHasOvenBalance
