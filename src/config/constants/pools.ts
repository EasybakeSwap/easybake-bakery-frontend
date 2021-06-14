import { OVEN_PER_SECOND } from 'config'
import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'


const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.oven,
    earningToken: tokens.oven,
    contractAddress: {
      4: '0x34C0C9D040E7C51fF72eC3E0E8F9E4495d99107E', // Masterchef // June 7th, 2021
      1: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokensPerSecond: OVEN_PER_SECOND.toString(),
    sortOrder: 1,
    isFinished: false,
  },
]

export default pools
