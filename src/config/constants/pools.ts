import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.oven,
    earningToken: tokens.oven,
    contractAddress: {
      4: '0x95b3B3E534DA76CBa9DEd682eedf8724eF8e38aB',
      1: '',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '14',
    sortOrder: 1,
    isFinished: false,
  },
  
]

export default pools
