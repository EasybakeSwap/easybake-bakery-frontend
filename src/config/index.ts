import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const OVEN_PER_BLOCK = new BigNumber(14)
export const BLOCKS_PER_YEAR = new BigNumber(10512000)
export const ERC_BLOCK_TIME = 12
export const OVEN_POOL_PID = 0
export const BASE_EXCHANGE_URL = 'https://swap.easybake.finance'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`
