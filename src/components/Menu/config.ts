import { MenuEntry } from 'easybake-uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Bakery',
    icon: 'BakeryIcon',
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
  {
    label: 'Refinery',
    icon: 'PoolIcon',
    href: '/pools',
  },
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
    label: 'Contracts',
    icon: 'ContractsIcon',
    items: [
      {
        label: 'OvenToken.sol',
        href: 'https://rinkeby.etherscan.io/address/0x1f981839fbbc0e0c713d9d808f6c86cb9904a45b#code', 
      },
      {
        label: 'SugarBar.sol',
        href: 'https://rinkeby.etherscan.io/address/0x96b99c5e145f54d2d0187ee6abd682d7d3139a6e#code',
      },
      {
        label: 'MasterChef.sol',
        href: 'https://rinkeby.etherscan.io/address/0xB4c466002a1b972eE104203852166E80F9471Ec3#code',
      },
      {
        label: 'Multicall.sol',
        href: 'https://rinkeby.etherscan.io/address/0x1605d633e30f430d54162232571475c620c69da5#code',
      },
      {
        label: 'EasyBakeFactory.sol',
        href: 'https://rinkeby.etherscan.io/address/0x304D0A26A248bd6ED59e7665EA8303a15Ae6d9d8#code',
      },
      {
        label: 'EasyBakeRouter02.sol',
        href: 'https://rinkeby.etherscan.io/address/0x6eb6f7F41714B74Dc13415f11F5B5a29dd9214D2#code',
      },
      {
        label: 'OvenVault.sol',
        href: 'https://rinkeby.etherscan.io/address/0x25ae90075E2DA21210f55cC69D29B94878d4eea8#code',
      },
      {
        label: 'SousChef.sol',
        href: 'https://rinkeby.etherscan.io/address/0x3e3a729b17183B70a4784942f5159f83D1f083eF#code',
      },
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
