import { MenuEntry } from 'easybakeswap-uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Bakery',
    icon: 'FarmIcon',
    href: '/bakery',
  },
  {
    label: 'Exchange',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://swap.easybake.finance/#/swap',
      },
      {
        label: 'Liquidity',
        href: 'https://swap.easybake.finance/add/#/add/eth',
      },
    ],
  },
  {
    label: 'Pools',
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
