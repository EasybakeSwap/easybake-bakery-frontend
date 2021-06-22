import BigNumber from 'bignumber.js'
import { BLOCKS_PER_YEAR, OVEN_PER_YEAR } from 'config'

/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokensPerSecond Amount of new oven allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export const getPoolApr = (
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  tokensPerSecond: number,
): number => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokensPerSecond).times(BLOCKS_PER_YEAR)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param ovenPriceå Oven price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
export const getFarmApr = (poolWeight: BigNumber, ovenPrice: BigNumber, poolLiquidityUsd: BigNumber): number => {
  const yearlyOvenRewardAllocation = OVEN_PER_YEAR.times(poolWeight)
  const apr = yearlyOvenRewardAllocation.times(ovenPrice).div(poolLiquidityUsd).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

export default null
