import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'EasyBake',
  description:
    'The most popular AMM on Polkadot by user count! Earn OVEN in the Bakery, then stake it in Dough Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PancakeSwap), NFTs, and more, on a platform you can trust.',
  // image: 'https://pancakeswap.finance/images/easter-battle.png',
  image: '',
}

export const getCustomMeta = (path: string): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${('EasyBake')} | ${('Home')}`,
      }
    case '/bakery':
      return {
        title: `${('EasyBake')} | ${('Bakery')}`,
      }
    case '/pools':
      return {
        title: `${('EasyBake')} | ${('Refinery')}`,
      }
    default:
      return null
  }
}

