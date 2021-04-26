import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'EasyBakeSwap',
  description:
    'The most popular AMM on Polkadot by user count! Earn OVEN in the Bakery, then stake it in Dough Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PancakeSwap), NFTs, and more, on a platform you can trust.',
  // image: 'https://pancakeswap.finance/images/easter-battle.png',
  image: ''
}

// export const customMeta: { [key: string]: PageMeta } = {
//   '/competition': {
//     title: 'PancakeSwap Easter Battle',
//     description: 'Register now for the PancakeSwap Easter battle!',
//     image: 'https://pancakeswap.finance/images/easter-battle.png',
//   },

export const customMeta: { [key: string]: PageMeta } = {
    '/competition': {
      title: 'EasyBake Cook Off',
      description: 'EasyBake :D',
      image: '',
    },
}
