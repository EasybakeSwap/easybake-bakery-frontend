import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import ovenABI from 'config/abi/oven.json'
import wethABI from 'config/abi/weth.json'
import multicall from 'utils/multicall'
import { getAddress, getWethAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'

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

  const nonEthPoolsTotalStaked = await multicall(ovenABI, callsNonEthPools)
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
