import BigNumber from 'bignumber.js'
import { BIG_TEN } from 'utils/bigNumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})


// CAKE_PER_BLOCK details
// 40 OVEN is minted per block
// 18 OVEN per block is sent to Burn pool (A farm just for burning OVEN)
// 10 OVEN per block goes to OVEN syrup pool
// 12 OVEN per block goes to Yield farms and lottery
// OVEN_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// OVEN/Block in components/OvenStats.tsx = 22 (40 - Amount sent to burn pool)


export const SECONDS_PER_MONTH = 2629800
export const SECONDS_PER_YEAR = 2629800 * 12

export const OVEN_PER_MONTH = 20000000
export const OVEN_PER_YEAR = new BigNumber(OVEN_PER_MONTH * 12)
export const OVEN_PER_SECOND = new BigNumber(OVEN_PER_MONTH / SECONDS_PER_MONTH)

export const BLOCK_TIME = 13
export const BLOCKS_PER_YEAR = new BigNumber((60 / BLOCK_TIME) * 60 * 24 * 365) // 10512000

export const BASE_URL = 'https://easybake.finance/'
export const BASE_EXCHANGE_URL = 'https://swap.easybake.finance'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_EXCHANGE_URL}/#/add`
export const BASE_LIQUIDITY_POOL_URL = `${BASE_EXCHANGE_URL}/#/pool`
export const BASE_ETHERSCAN_URL = 'https://rinkeby.etherscan.io'

export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 200000
export const DEFAULT_GAS_PRICE = 5

export const TESTNET_CHAIN_ID = '4';
export const MAINNET_CHAIN_ID = '1';

// UPDATE LATER
export const LOTTERY_TICKET_PRICE = 10
