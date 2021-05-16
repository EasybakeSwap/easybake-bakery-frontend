import BigNumber from 'bignumber.js'
import { getBalanceNumber, getFullDisplayBalance, getDecimalAmount } from 'utils/formatBalance'

export const convertSharesToOven = (
  shares: BigNumber,
  ovenPerFullShare: BigNumber,
  decimals = 18,
  decimalsToRound = 3,
) => {
  const sharePriceNumber = getBalanceNumber(ovenPerFullShare, decimals)
  const amountInOven = new BigNumber(shares.multipliedBy(sharePriceNumber))
  const ovenAsNumberBalance = getBalanceNumber(amountInOven, decimals)
  const ovenAsBigNumber = getDecimalAmount(new BigNumber(ovenAsNumberBalance), decimals)
  const ovenAsDisplayBalance = getFullDisplayBalance(amountInOven, decimals, decimalsToRound)
  return { ovenAsNumberBalance, ovenAsBigNumber, ovenAsDisplayBalance }
}

export const convertOvenToShares = (
  oven: BigNumber,
  ovenPerFullShare: BigNumber,
  decimals = 18,
  decimalsToRound = 3,
) => {
  const sharePriceNumber = getBalanceNumber(ovenPerFullShare, decimals)
  const amountInShares = new BigNumber(oven.dividedBy(sharePriceNumber))
  const sharesAsNumberBalance = getBalanceNumber(amountInShares, decimals)
  const sharesAsBigNumber = getDecimalAmount(new BigNumber(sharesAsNumberBalance), decimals)
  const sharesAsDisplayBalance = getFullDisplayBalance(amountInShares, decimals, decimalsToRound)
  return { sharesAsNumberBalance, sharesAsBigNumber, sharesAsDisplayBalance }
}
