import { MenuEntry } from 'easybake-uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
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
  {
    label: 'Bakery',
    icon: 'BakeryIcon',
    href: '/bakery',
  },
  // {
  //   label: 'Refinery',
  //   icon: 'PoolIcon',
  //   href: '/pools',
  // },
  // {
  //   label: 'Analytics',
  //   icon: 'InfoIcon',
  //   items: [
  //     {
  //       label: 'Overview',
  //       href: 'https://info.EasyBake.finance',
  //     },
  //     {
  //       label: 'Tokens',
  //       href: 'https://info.easybake.finance/tokens',
  //     },
  //     {
  //       label: 'Pairs',
  //       href: 'https://info.easybake.finance/pairs',
  //     }
  //   ],
  // },
  {
    label: 'Contracts',
    icon: 'ContractsIcon',
    items: [
      {
        label: 'OvenToken.sol',
        href: 'https://rinkeby.etherscan.io/address/0x6be759Bd2808b869b821AE5d8184e2eFfe5eF396/#code', 
      },
      {
        label: 'SugarToken.sol',
        href: 'https://rinkeby.etherscan.io/address/0x86b7d8c27afd403d8cde19758be643c11ade4be8/#code',
      },
      {
        label: 'MasterChef.sol',
        href: 'https://rinkeby.etherscan.io/address/0x34C0C9D040E7C51fF72eC3E0E8F9E4495d99107E#code',
      },
      {
        label: 'EasyBakeFactory.sol',
        href: 'https://rinkeby.etherscan.io/address/0x2664b895b5d484de76c621c4bf320f42c2cfe00d#code',
      },
      {
        label: 'EasyBakeRouter.sol',
        href: 'https://rinkeby.etherscan.io/address/0x01cc4ae463325689ea73a4dc9ee8c6583e8a68b7#code',
      }
    ],
  },
  {
    label: 'Team',
    icon: 'TeamIcon',
    items: [
      {
        label: 'Chef Buns',
        href: 'https://twitter.com/CryptoUnico',
      },
      {
        label: 'Chef Buddy',
        href: 'https://twitter.com/DeGatchi',
      },
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
      {
        label: 'Docs',
        href: 'docs.easybake.finance',
      },
      {
        label: 'Blog',
        href: 'https://easybake.medium.com',
      },
    ],
  },
]

export default config
