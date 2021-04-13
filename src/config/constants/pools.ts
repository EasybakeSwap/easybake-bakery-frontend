import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'OVEN',
    stakingTokenName: QuoteToken.OVEN,
    stakingTokenAddress: '0x95b3B3E534DA76CBa9DEd682eedf8724eF8e38aB',
    contractAddress: {
      4: '0x95b3B3E534DA76CBa9DEd682eedf8724eF8e38aB',
      1: '',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://easybakeswap.finance/',
    harvest: true,
    tokenPerBlock: '14',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
  },
]

export default pools
