import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  //                    Structure Reference
  // {
  //   pid: 0,
  //   lpSymbol: 'OVEN',
  //   lpAddresses: {
  //     4: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
  //     1: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  //   },
  //   token: tokens.syrup,
  //   quoteToken: tokens.wbnb,
  // },
  // {
  //   pid: 139,
  //   lpSymbol: 'OVEN-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xFB7E9FE9D13561AdA7131Fa746942a14F7dd4Cf6',
  //   },
  //   token: tokens.OVEN,
  //   quoteToken: tokens.wbnb,
  // },

  // FIX ** Needs updating
  {
    pid: 0,
    lpSymbol: 'OVEN',
    lpAddresses: {
      4: '0x1f981839FBBc0E0c713d9D808F6C86cB9904A45B',
      1: '',
    },
    token: tokens.sugar,
    quoteToken: tokens.weth,
  },
  {
    pid: 1,
    lpSymbol: 'OVEN-ETH LP',
    lpAddresses: {
      4: '0x5e2d0cb65162f2ebce962b67844caa94b705b157',
      1: '',
    },
    token: tokens.oven,
    quoteToken: tokens.weth,
  },
  {
    pid: 2,
    lpSymbol: 'USDC-ETH LP',
    lpAddresses: {
      4: '0xbB37B7d16db4b74eA6c72663883BE15181d132C3',
      1: '',
    },
    token: tokens.usdc,
    quoteToken: tokens.weth,
  },
  {
    pid: 3,
    lpSymbol: 'LAYER-ETH LP',
    lpAddresses: {
      4: '0x4A942AA0174D9D927814782e2F696A1598Cc7A07',
      1: '',
    },
    token: tokens.layer,
    quoteToken: tokens.weth,
  },
  {
    pid: 4,
    lpSymbol: 'DAI-ETH LP',
    lpAddresses: {
      4: '0x3f91d24F1a71283AB93A6baAE388b1B4445e66A6',
      1: '',
    },
    token: tokens.dai,
    quoteToken: tokens.weth,
  },
  {
    pid: 5,
    lpSymbol: 'LINK-ETH LP',
    lpAddresses: {
      4: '0x136D9B4E3DeC9192ef367efd3d3c91fa32D20cFd',
      1: '',
    },
    token: tokens.link,
    quoteToken: tokens.weth,
  },
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
