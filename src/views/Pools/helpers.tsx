import BigNumber from 'bignumber.js'
import { Pool } from 'state/types'
import { getRoi, tokenEarnedPerThousandDollarsCompounding } from 'utils/compoundApyHelpers'
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

const AUTO_VAULT_COMPOUND_FREQUENCY = 288
const MANUAL_POOL_COMPOUND_FREQUENCY = 1

export const getAprData = (pool: Pool, performanceFee: number) => {
  const { isAutoVault, earningTokenPrice, apr } = pool
  // special handling for tokens like tBTC or BIFI where the daily token rewards for $1000 dollars will be less than 0.001 of that token
  const isHighValueToken = Math.round(earningTokenPrice / 1000) > 0
  const roundingDecimals = isHighValueToken ? 4 : 2

  //   Estimate & manual for now. 288 = once every 5 mins. We can change once we have a better sense of this
  const compoundFrequency = isAutoVault ? AUTO_VAULT_COMPOUND_FREQUENCY : MANUAL_POOL_COMPOUND_FREQUENCY

  if (isAutoVault) {
    const oneThousandDollarsWorthOfToken = 1000 / earningTokenPrice
    const tokenEarnedPerThousand365D = tokenEarnedPerThousandDollarsCompounding({
      numberOfDays: 365,
      farmApr: apr,
      tokenPrice: earningTokenPrice,
      roundingDecimals,
      compoundFrequency,
      performanceFee,
    })
    const autoApr = getRoi({
      amountEarned: tokenEarnedPerThousand365D,
      amountInvested: oneThousandDollarsWorthOfToken,
    })
    return { apr: autoApr, isHighValueToken, roundingDecimals, compoundFrequency }
  }
  return { apr, isHighValueToken, roundingDecimals, compoundFrequency }
}

export const getOvenVaultEarnings = (
  account: string,
  ovenAtLastUserAction: BigNumber,
  userShares: BigNumber,
  pricePerFullShare: BigNumber,
  earningTokenPrice: number,
) => {
  const hasAutoEarnings =
    account && ovenAtLastUserAction && ovenAtLastUserAction.gt(0) && userShares && userShares.gt(0)
  const { ovenAsBigNumber } = convertSharesToOven(userShares, pricePerFullShare)
  const autoOvenProfit = ovenAsBigNumber.minus(ovenAtLastUserAction)
  const autoOvenToDisplay = autoOvenProfit.gte(0) ? getBalanceNumber(autoOvenProfit, 18) : 0

  const autoUsdProfit = autoOvenProfit.times(earningTokenPrice)
  const autoUsdToDisplay = autoUsdProfit.gte(0) ? getBalanceNumber(autoUsdProfit, 18) : 0
  return { hasAutoEarnings, autoOvenToDisplay, autoUsdToDisplay }
}

export const getPoolBlockInfo = (pool: Pool, currentTime: number) => {
  const { startTime, endTime, isFinished } = pool
  const shouldShowBlockCountdown = Boolean(!isFinished && startTime && endTime)
  const timeUntilStart = Math.max(startTime - currentTime, 0)
  const timeRemaining = Math.max(endTime - currentTime, 0)
  const hasPoolStarted = timeUntilStart === 0 && timeRemaining > 0
  const blocksToDisplay = hasPoolStarted ? timeRemaining : timeUntilStart
  return { shouldShowBlockCountdown, timeUntilStart, timeRemaining, hasPoolStarted, blocksToDisplay }
}
