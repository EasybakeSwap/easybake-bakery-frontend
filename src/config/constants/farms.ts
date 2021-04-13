import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'OVEN',
    lpAddresses: {
      4: '0x95b3B3E534DA76CBa9DEd682eedf8724eF8e38aB',
      1: '',
    },
    tokenSymbol: 'SUGAR',
    tokenAddresses: {
      4: '0x248Dc87bf9e0d4a499d38E76152ee38527C4eA89',
      1: '',
    },
    quoteTokenSymbol: QuoteToken.WETH,
    quoteTokenAdresses: contracts.weth,
  },
  {
    pid: 1,
    lpSymbol: 'UNI-ETH LP',
    lpAddresses: {
      4: '0x4E99615101cCBB83A462dC4DE2bc1362EF1365e5',
      1: '',
    },
    tokenSymbol: 'UNI',
    tokenAddresses: {
      4: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      1: '',
    },
    quoteTokenSymbol: QuoteToken.WETH,
    quoteTokenAdresses: contracts.weth,
  },
  {
    pid: 2,
    lpSymbol: 'USDC-ETH LP',
    lpAddresses: {
      4: '0x78AB2e85EAf22Dc7B6981E54432e17521BdadC23',
      1: '',
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      4: '0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b',
      1: '',
    },
    quoteTokenSymbol: QuoteToken.WETH,
    quoteTokenAdresses: contracts.weth,
  },
  {
    pid: 3,
    lpSymbol: 'DAI-ETH LP',
    lpAddresses: {
      4: '0x03E6c12eF405AC3F642B9184eDed8E1322de1a9e',
      1: '',
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      4: '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa',
      1: '',
    },
    quoteTokenSymbol: QuoteToken.WETH,
    quoteTokenAdresses: contracts.weth,
  },
  {
    pid: 4,
    lpSymbol: 'LINK-ETH LP',
    lpAddresses: {
      4: '0x0d1e5112B7Bf0595837f6e19A8233e8b918Ef3aA',
      1: '',
    },
    tokenSymbol: 'LINK',
    tokenAddresses: {
      4: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
      1: '',
    },
    quoteTokenSymbol: QuoteToken.WETH,
    quoteTokenAdresses: contracts.weth,
  },
  {
    pid: 5,
    lpSymbol: 'OVEN-ETH LP',
    lpAddresses: {
      4: '0xC23F0b56D9E167A5EdA5c57f5772037fdbb6e0Af',
      1: '',
    },
    tokenSymbol: 'OVEN',
    tokenAddresses: {
      4: '0x95b3B3E534DA76CBa9DEd682eedf8724eF8e38aB',
      1: '',
    },
    quoteTokenSymbol: QuoteToken.WETH,
    quoteTokenAdresses: contracts.weth,
  },
  {
    pid: 6,
    lpSymbol: 'LAYER-ETH LP',
    lpAddresses: {
      4: '0xD4385654EF660BE49ac063F55cc045A4a8b7efFF',
      1: '',
    },
    tokenSymbol: 'LAYER',
    tokenAddresses: {
      4: '0x47a7747972CDeC8f568E1984f31b5ef514Df5Dd8',
      1: '',
    },
    quoteTokenSymbol: QuoteToken.WETH,
    quoteTokenAdresses: contracts.weth,
  },
]

export default farms
