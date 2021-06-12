import { Nft, NftSource, NftType } from './types'

export const IPFS_GATEWAY = 'https://gateway.pinata.cloud'

export const nftSources: NftSource = {
  [NftType.PANCAKE]: {
    address: {
      1: '0xDf7952B35f24aCF7fC0487D01c8d5690a60DBa07',
      4: '0x60935F36e4631F73f0f407e68642144e07aC7f5E',
    },
    identifierKey: 'image',
  },
  [NftType.MIXIE]: {
    address: {
      1: '0xa251b5EAa9E67F2Bc8b33F33e20E91552Bf85566',
      4: '',
    },
    identifierKey: 'image',
  },
}

const Nfts: Nft[] = [
  {
    name: 'Mixie v1',
    description: 'Stories were told, and songs were sung, about Chef Mixie’s pancakes and her big Syrup gun.',
    images: {
      lg: 'mixie-1-lg.png',
      md: 'mixie-1-md.png',
      sm: 'mixie-1-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmQiRpr7ZMkzV7qbqVaUZ1LiuHTTdpWmapUhaY6ZGmVLQ4/001-Chef-Mixie.png',
    },
    sortOrder: 999,
    identifier: '001-Chef-Mixie',
    type: NftType.MIXIE,
    variationId: 1,
  },
  {
    name: 'Mixie v2',
    description: 'Stories were told, and songs were sung, about Chef Mixie’s pancakes and her big Syrup gun.',
    images: {
      lg: 'mixie-2-lg.png',
      md: 'mixie-2-md.png',
      sm: 'mixie-2-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmQiRpr7ZMkzV7qbqVaUZ1LiuHTTdpWmapUhaY6ZGmVLQ4/002-Chef-Mixie.png',
    },
    sortOrder: 999,
    identifier: '002-Chef-Mixie',
    type: NftType.MIXIE,
    variationId: 2,
  },
  {
    name: 'Mixie v3',
    description: 'Stories were told, and songs were sung, about Chef Mixie’s pancakes and her big Syrup gun.',
    images: {
      lg: 'mixie-3-lg.png',
      md: 'mixie-3-md.png',
      sm: 'mixie-3-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmQiRpr7ZMkzV7qbqVaUZ1LiuHTTdpWmapUhaY6ZGmVLQ4/003-Chef-Mixie.png',
    },
    sortOrder: 999,
    identifier: '003-Chef-Mixie',
    type: NftType.MIXIE,
    variationId: 3,
  },
  {
    name: 'Easter ‘21 Champions',
    description: 'Eggscellent! Celebrating Syrup Storm winning the Easter Battle!',
    images: {
      lg: 'easter-champion-storm-lg.png',
      md: 'easter-champion-storm-md.png',
      sm: 'easter-champion-storm-sm.png',
      ipfs:
        'https://gateway.pinata.cloud/ipfs/QmWFQdggxnAkgFNBWixT6v7nrgEnYfYDxG5A9u42aHhU6U/easter-champion-storm.png',
    },
    video: {
      webm:
        'https://gateway.pinata.cloud/ipfs/QmWFQdggxnAkgFNBWixT6v7nrgEnYfYDxG5A9u42aHhU6U/easter-champion-storm.webm',
      mp4: 'https://gateway.pinata.cloud/ipfs/QmWFQdggxnAkgFNBWixT6v7nrgEnYfYDxG5A9u42aHhU6U/easter-champion-storm.mp4',
    },
    sortOrder: 999,
    identifier: 'easter-champion-storm',
    type: NftType.PANCAKE,
    variationId: 15,
  },
  {
    name: "Cakeston Easter '21",
    description: 'Melting Easter eggs and melting hearts!',
    images: {
      lg: 'cakeston-easter-21-lg.png',
      md: 'cakeston-easter-21-md.png',
      sm: 'cakeston-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-caker.png',
    },
    sortOrder: 999,
    identifier: 'easter-caker',
    type: NftType.PANCAKE,
    variationId: 15,
  },
  {
    name: "Flipsie Easter '21",
    description: 'Watch out for Flipsie’s spatula smash!',
    images: {
      lg: 'flipsie-easter-21-lg.png',
      md: 'flipsie-easter-21-md.png',
      sm: 'flipsie-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-flipper.png',
    },
    sortOrder: 999,
    identifier: 'easter-flipper',
    type: NftType.PANCAKE,
    variationId: 14,
  },
  {
    name: "Stormy Easter '21",
    description: 'Do you like chocolate with your syrup? Go long!',
    images: {
      lg: 'stormy-easter-21-lg.png',
      md: 'stormy-easter-21-md.png',
      sm: 'stormy-easter-21-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmZGqWaovULNEMKxBCGnGjh27JQkAyadS6AW4J4Lzf3XBp/easter-storm.png',
    },
    sortOrder: 999,
    identifier: 'easter-storm',
    type: NftType.PANCAKE,
    variationId: 12,
  },
  {
    name: 'Bullish',
    description: 'Happy Niu Year! This bunny’s excited for the year of the bull (market!)',
    images: {
      lg: 'bullish-lg.png',
      md: 'bullish-md.png',
      sm: 'bullish-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmNS1A5HsRW1JvFWtGkm4o9TgZVe2P7kA8TB4yxvS6A7ms/bullish.png',
    },
    video: {
      webm: 'https://gateway.pinata.cloud/ipfs/QmNS1A5HsRW1JvFWtGkm4o9TgZVe2P7kA8TB4yxvS6A7ms/bullish.webm',
      mp4: 'https://gateway.pinata.cloud/ipfs/QmNS1A5HsRW1JvFWtGkm4o9TgZVe2P7kA8TB4yxvS6A7ms/bullish.mp4',
    },
    sortOrder: 999,
    identifier: 'bullish',
    type: NftType.PANCAKE,
    variationId: 11,
  },
  {
    name: 'Hiccup',
    description: "Oopsie daisy! Hiccup's had a bit of an accident. Poor little fella.",
    images: {
      lg: 'hiccup-lg.png',
      md: 'hiccup-md.png',
      sm: 'hiccup-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmQ6EE6gkVzAQUdQLLM7CyrnME6LZHCoy92ZERW8HXmyjw/hiccup.png',
    },
    sortOrder: 999,
    identifier: 'hiccup',
    type: NftType.PANCAKE,
    variationId: 10,
  },
  {
    name: 'Sleepy',
    description: 'Aww, looks like eating pancakes all day is tough work. Sweet dreams!',
    images: {
      lg: 'sleepy-lg.png',
      md: 'sleepy-md.png',
      sm: 'sleepy-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmYD9AtzyQPjSa9jfZcZq88gSaRssdhGmKqQifUDjGFfXm/sleepy.png',
      blur: 'sleepy-blur.png',
    },
    sortOrder: 999,
    identifier: 'sleepy',
    type: NftType.PANCAKE,
    variationId: 5,
  },
  {
    name: 'Sunny',
    description: 'Sunny is always cheerful when there are pancakes around. Smile!',
    images: {
      lg: 'sunny-lg.png',
      md: 'sunny-md.png',
      sm: 'sunny-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmYD9AtzyQPjSa9jfZcZq88gSaRssdhGmKqQifUDjGFfXm/sunny.png',
      blur: 'sunny-blur.png',
    },
    sortOrder: 999,
    identifier: 'sunny',
    type: NftType.PANCAKE,
    variationId: 9,
  },
  {
    name: 'Churro',
    description: "Don't let that dopey smile deceive you... Churro's a master OVEN chef!",
    images: {
      lg: 'churro-lg.png',
      md: 'churro-md.png',
      sm: 'churro-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmYD9AtzyQPjSa9jfZcZq88gSaRssdhGmKqQifUDjGFfXm/churro.png',
      blur: 'churro-blur.png',
    },
    sortOrder: 999,
    identifier: 'churro',
    type: NftType.PANCAKE,
    variationId: 8,
  },
  {
    name: 'Dollop',
    description: "Nommm... Oh hi, I'm just meditating on the meaning of OVEN.",
    images: {
      lg: 'dollop-lg.png',
      md: 'dollop-md.png',
      sm: 'dollop-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmYD9AtzyQPjSa9jfZcZq88gSaRssdhGmKqQifUDjGFfXm/dollop.png',
      blur: 'dollop-blur.png',
    },
    sortOrder: 999,
    identifier: 'dollop',
    type: NftType.PANCAKE,
    variationId: 6,
  },
  {
    name: 'Twinkle',
    description: "Three guesses what's put that twinkle in those eyes! (Hint: it's OVEN)",
    images: {
      lg: 'twinkle-lg.png',
      md: 'twinkle-md.png',
      sm: 'twinkle-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmYD9AtzyQPjSa9jfZcZq88gSaRssdhGmKqQifUDjGFfXm/twinkle.png',
      blur: 'twinkle-blur.png',
    },
    sortOrder: 999,
    identifier: 'twinkle',
    type: NftType.PANCAKE,
    variationId: 7,
  },
  {
    name: 'Swapsies',
    description: 'These bunnies love nothing more than swapping pancakes. Especially on BSC.',
    images: {
      lg: 'swapsies-lg.png',
      md: 'swapsies-md.png',
      sm: 'swapsies-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmXdHqg3nywpNJWDevJQPtkz93vpfoHcZWQovFz2nmtPf5/swapsies.png',
      blur: 'swapsies-blur.png',
    },
    sortOrder: 999,
    identifier: 'swapsies',
    type: NftType.PANCAKE,
    variationId: 0,
  },
  {
    name: 'Drizzle',
    description: "It's raining syrup on this bunny, but he doesn't seem to mind. Can you blame him?",
    images: {
      lg: 'drizzle-lg.png',
      md: 'drizzle-md.png',
      sm: 'drizzle-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmXdHqg3nywpNJWDevJQPtkz93vpfoHcZWQovFz2nmtPf5/drizzle.png',
      blur: 'drizzle-blur.png',
    },
    sortOrder: 999,
    identifier: 'drizzle',
    type: NftType.PANCAKE,
    variationId: 1,
  },
  {
    name: 'Blueberries',
    description: "These bunnies like their pancakes with blueberries. What's your favorite topping?",
    images: {
      lg: 'blueberries-lg.png',
      md: 'blueberries-md.png',
      sm: 'blueberries-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmXdHqg3nywpNJWDevJQPtkz93vpfoHcZWQovFz2nmtPf5/blueberries.png',
      blur: 'blueberries-blur.png',
    },
    sortOrder: 999,
    identifier: 'blueberries',
    type: NftType.PANCAKE,
    variationId: 2,
  },
  {
    name: 'Circular',
    description: "Love makes the world go 'round... but so do pancakes. And these bunnies know it.",
    images: {
      lg: 'circular-lg.png',
      md: 'circular-md.png',
      sm: 'circular-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmXdHqg3nywpNJWDevJQPtkz93vpfoHcZWQovFz2nmtPf5/circular.png',
      blur: 'circular-blur.png',
    },
    sortOrder: 999,
    identifier: 'circular',
    type: NftType.PANCAKE,
    variationId: 3,
  },
  {
    name: 'Sparkle',
    description: 'It’s sparkling syrup, pancakes, and even lottery tickets! This bunny really loves it.',
    images: {
      lg: 'sparkle-lg.png',
      md: 'sparkle-md.png',
      sm: 'sparkle-sm.png',
      ipfs: 'https://gateway.pinata.cloud/ipfs/QmXdHqg3nywpNJWDevJQPtkz93vpfoHcZWQovFz2nmtPf5/sparkle.png',
      blur: 'sparkle-blur.png',
    },
    sortOrder: 999,
    identifier: 'sparkle',
    type: NftType.PANCAKE,
    variationId: 4,
  },
]

export default Nfts
