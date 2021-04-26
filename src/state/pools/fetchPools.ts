import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import ovenABI from 'config/abi/oven.json'
import wbnbABI from 'config/abi/weth.json'
import multicall from 'utils/multicall'
import { getAddress, getWethAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'

export const fetchPoolsBlockLimits = async () => {
  const poolsWithEnd = poolsConfig.filter((p) => p.sousId !== 0)
  const callsStartBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'startBlock',
    }
  })
  const callsEndBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'bonusEndBlock',
    }
  })

  const starts = await multicall(sousChefABI, callsStartBlock)
  const ends = await multicall(sousChefABI, callsEndBlock)

  return poolsWithEnd.map((cakePoolConfig, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    return {
      sousId: cakePoolConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
    }
  })
}

export const fetchPoolsTotalStaking = async () => {
  const nonEthPools = poolsConfig.filter((p) => p.stakingToken.symbol !== 'BNB')
  const ethPool = poolsConfig.filter((p) => p.stakingToken.symbol === 'BNB')

  const callsNonBnbPools = nonEthPools.map((poolConfig) => {
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

  const nonEthPoolsTotalStaked = await multicall(ovenABI, callsNonBnbPools)
  const ethPoolsTotalStaked = await multicall(wbnbABI, callsEthPools)

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
