import BigNumber from 'bignumber.js'

export interface VaultUser {
  shares: BigNumber
  ovenAtLastUserAction: BigNumber
  lastDepositedTime: string
  lastUserActionTime: string
}
