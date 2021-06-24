import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'OVEN',
    lpAddresses: {
      4: '0x6be759Bd2808b869b821AE5d8184e2eFfe5eF396',
      1: '',
    },
    token: tokens.sugar,
    quoteToken: tokens.weth,
  },
  {
    pid: 1,
    lpSymbol: 'OVEN-ETH',
    lpAddresses: {
      4: '0xF673c52c0d9866c556Be70fB13F30576D73e8f8e', // June 7th 2021
      1: '',
    },
    token: tokens.oven,
    quoteToken: tokens.weth,
  },
  {
    pid: 4,
    lpSymbol: 'USDC-ETH',
    lpAddresses: {
      4: '0xe172AD4BA8238201A7b4158b7F8FE08E79d16678', // June 7th 2021
      1: '',
    },
    token: tokens.usdc,
    quoteToken: tokens.weth,
  },
  {
    pid: 5,
    lpSymbol: 'LAYER-ETH',
    lpAddresses: {
      4: '0x99cDC4A1d5A60b622f11eB45D38c8e419C6231F8', // June 7th 2021
      1: '',
    },
    token: tokens.layer,
    quoteToken: tokens.weth,
  },
  {
    pid: 6,
    lpSymbol: 'DAI-ETH',
    lpAddresses: {
      4: '0x76b9D0b38AA74131C90B24fAe9C73Db5514D6D08', // June 7th, 2021
      1: '',
    },
    token: tokens.dai,
    quoteToken: tokens.weth,
  },
  {
    pid: 7,
    lpSymbol: 'LINK-ETH',
    lpAddresses: {
      4: '0x55DEEB8905017a283CF9cd6A45E8d1c06b94a49C', // June 7th, 2021
      1: '',
    },
    token: tokens.link,
    quoteToken: tokens.weth,
  },

  // FIX ** NEED OVEN/USDT to fetch price


  // {
  //   pid: 6,
  //   lpSymbol: 'UNI-ETH LP',
  //   lpAddresses: {
  //     4: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  //     1: '',
  //   },
  //   token: tokens.uni,
  //   quoteToken: tokens.weth,
  // },
]

export default farms
