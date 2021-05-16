import { OVEN_PER_SECOND } from 'config'
import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'


const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.oven,
    earningToken: tokens.oven,
    contractAddress: {
      4: '0x3e3a729b17183B70a4784942f5159f83D1f083eF', // Sous Chef
      1: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerSecond: OVEN_PER_SECOND.toString(),
    sortOrder: 1,
    isFinished: false,
  },
  
]

export default pools
