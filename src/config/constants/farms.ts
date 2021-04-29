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

  
  {
    pid: 0,
    lpSymbol: 'OVEN',
    lpAddresses: {
      4: '0x95b3B3E534DA76CBa9DEd682eedf8724eF8e38aB',
      1: '',
    },
    token: tokens.sugar,
    quoteToken: tokens.weth,
  },
  {
    pid: 5,
    lpSymbol: 'OVEN-ETH LP',
    lpAddresses: {
      4: '0xC23F0b56D9E167A5EdA5c57f5772037fdbb6e0Af',
      1: '',
    },
    token: tokens.oven,
    quoteToken: tokens.weth,
  },
  {
    pid: 6,
    lpSymbol: 'LAYER-ETH LP',
    lpAddresses: {
      4: '0xD4385654EF660BE49ac063F55cc045A4a8b7efFF',
      1: '',
    },
    token: tokens.layer,
    quoteToken: tokens.weth,
  },
  {
    pid: 2,
    lpSymbol: 'USDC-ETH LP',
    lpAddresses: {
      4: '0x78AB2e85EAf22Dc7B6981E54432e17521BdadC23',
      1: '',
    },
    token: tokens.usdc,
    quoteToken: tokens.weth,
  },
  {
    pid: 3,
    lpSymbol: 'DAI-ETH LP',
    lpAddresses: {
      4: '0x03E6c12eF405AC3F642B9184eDed8E1322de1a9e',
      1: '',
    },
    token: tokens.dai,
    quoteToken: tokens.weth,
  },
  {
    pid: 4,
    lpSymbol: 'LINK-ETH LP',
    lpAddresses: {
      4: '0x0d1e5112B7Bf0595837f6e19A8233e8b918Ef3aA',
      1: '',
    },
    token: tokens.link,
    quoteToken: tokens.weth,
  },
  {
    pid: 1,
    lpSymbol: 'UNI-ETH LP',
    lpAddresses: {
      4: '0x4E99615101cCBB83A462dC4DE2bc1362EF1365e5',
      1: '',
    },
    token: tokens.uni,
    quoteToken: tokens.weth,
  },
]

export default farms
