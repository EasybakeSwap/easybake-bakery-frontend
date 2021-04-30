import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Bakery',
    icon: 'TradeIcon', // *Make `BakeryIcon`
    href: '/bakery',
  },
  {
    label: 'Swap',
    icon: 'TradeIcon',
    // should be /swap
    href: 'https://swap.easybake.finance/#/swap',
    // items: [
    //   {
    //     label: 'Swap Tokens',
    //     href: 'https://swap.easybake.finance/#/swap',
    //   },
    //   {
    //     label: 'Provide Liquidity',
    //     href: 'https://swap.easybake.finance/add/#/add/eth',
    //   },
    // ],
  },
  // {
  //   label: 'Pools',
  //   icon: 'PoolIcon',
  //   href: '/pools',
  // },
  {
    label: 'Analytics',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: 'https://info.EasyBake.finance',
      },
      {
        label: 'Tokens',
        href: 'https://info.easybake.finance/tokens',
      },
      {
        label: 'Pairs',
        href: 'https://info.easybake.finance/pairs',
      }
    ],
  },
  {
    label: 'Contracts (Rinkeby)',
    icon: 'InfoIcon',
    items: [
      {
        label: 'OvenToken.sol',
        href: 'https://rinkeby.etherscan.io/address/0x95b3B3E534DA76CBa9DEd682eedf8724eF8e38aB#code',
      },
      {
        label: 'SugarBar.sol',
        href: 'https://rinkeby.etherscan.io/address/0x248Dc87bf9e0d4a499d38E76152ee38527C4eA89#code',
      },
      {
        label: 'MasterChef.sol',
        href: 'https://rinkeby.etherscan.io/address/0xBA60c36f2B23E1F4Ef7bBa10F897340060c62339#code',
      },
      {
        label: 'Multicall.sol',
        href: 'https://rinkeby.etherscan.io/address/0x1605d633e30f430d54162232571475c620c69da5#code',
      },
      {
        label: 'EasyBakeFactory.sol',
        href: 'https://rinkeby.etherscan.io/address/0x77e43eEA4e7d475676d1af631A641C12BEE4dcE3#code',
      },
      {
        label: 'EasyBakeRouter02.sol',
        href: 'https://rinkeby.etherscan.io/address/0x6eb6f7F41714B74Dc13415f11F5B5a29dd9214D2#code',
      }
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Forum',
        href: 'https://forum.easybake.finance',
      },
      {
        label: 'Vote',
        href: 'https://snapshot.page/#/easybake.eth',
      },
      {
        label: 'Github',
        href: 'https://github.com/EasyBakeSwap',
      },
      // {
      //   label: 'Docs',
      //   href: 'docs.easybake.finance',
      // },
      {
        label: 'Blog',
        href: 'https://easybake.medium.com',
      },
    ],
  },
]

export default config
