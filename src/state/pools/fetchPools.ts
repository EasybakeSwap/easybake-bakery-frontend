import BigNumber from 'bignumber.js'
import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import cakeABI from 'config/abi/oven.json'
import wethABI from 'config/abi/weth.json'
import multicall from 'utils/multicall'
import { getAddress, getWethAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { getSousChefContract } from 'utils/contractHelpers'

export const fetchPoolsTimeLimits = async () => {
  const poolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0)
  const callsStartTime = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'startTime',
    }
  })
  const callsEndTime = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'bonusEndTime',
    }
  })

  const starts = await multicall(sousChefABI, callsStartTime)
  const ends = await multicall(sousChefABI, callsEndTime)

  return poolsWithEnd.map((cakePoolConfig, index) => {
    const startTime = starts[index]
    const endTime = ends[index]
    return {
      sousId: cakePoolConfig.sousId,
      startTime: new BigNumber(startTime).toJSON(),
      endTime: new BigNumber(endTime).toJSON(),
    }
  })
}

export const fetchPoolsTotalStaking = async () => {
  const nonEthPools = poolsConfig.filter((p) => p.stakingToken.symbol !== 'ETH')
  const ethPool = poolsConfig.filter((p) => p.stakingToken.symbol === 'ETH')

  const callsNonEthPools = nonEthPools.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.stakingToken.address),
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const callsEthPools = ethPool.map((poolConfig) => {
    return {
      address: getWethAddress(),
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const nonEthPoolsTotalStaked = await multicall(cakeABI, callsNonEthPools)
  const ethPoolsTotalStaked = await multicall(wethABI, callsEthPools)

  return [
    ...nonEthPools.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(nonEthPoolsTotalStaked[index]).toJSON(),
    })),
    ...ethPool.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(ethPoolsTotalStaked[index]).toJSON(),
    })),
  ]
}

export const fetchPoolStakingLimit = async (sousId: number): Promise<BigNumber> => {
  try {
    const sousContract = getSousChefContract(sousId)
    const stakingLimit = await sousContract.methods.poolLimitPerUser().call()
    return new BigNumber(stakingLimit)
  } catch (error) {
    return BIG_ZERO
  }
}

export const fetchPoolsStakingLimits = async (
  poolsWithStakingLimit: number[],
): Promise<{ [key: string]: BigNumber }> => {
  const validPools = poolsConfig
    .filter((p) => p.stakingToken.symbol !== 'ETH' && !p.isFinished)
    .filter((p) => !poolsWithStakingLimit.includes(p.sousId))

  // Get the staking limit for each valid pool
  // Note: We cannot batch the calls via multicall because V1 pools do not have "poolLimitPerUser" and will throw an error
  const stakingLimitPromises = validPools.map((validPool) => fetchPoolStakingLimit(validPool.sousId))
  const stakingLimits = await Promise.all(stakingLimitPromises)

  return stakingLimits.reduce((accum, stakingLimit, index) => {
    return {
      ...accum,
      [validPools[index].sousId]: stakingLimit,
    }
  }, {})
}