import { SettingsObject, SettingsType } from './types'

const BASE_URL = 'https://easybake.finance'

const settings: SettingsObject[] = [
  {
    name: 'pools',
    url: `${BASE_URL}/pools`,
    type: SettingsType.POOL,
  },
  {
    name: 'bakery',
    url: `${BASE_URL}/bakery`,
    type: SettingsType.FARM,
  },
]
export default settings
