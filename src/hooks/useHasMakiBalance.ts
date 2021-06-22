import BigNumber from 'bignumber.js'
import { getOvenAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's MAKI balance is at least the amount passed in
 */
const useHasMakiBalance = (minimumBalance: BigNumber) => {
  const { balance: makiBalance } = useTokenBalance(getOvenAddress())
  return makiBalance.gte(minimumBalance)
}

export default useHasMakiBalance
