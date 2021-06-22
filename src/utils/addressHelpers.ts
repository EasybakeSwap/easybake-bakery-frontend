import { MAINNET_CHAIN_ID } from 'config'
import addresses from 'config/constants/contracts'
import tokens from 'config/constants/tokens'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[MAINNET_CHAIN_ID]
}

// Native
export const getWethAddress = () => {
  return getAddress(tokens.weth.address)
}
export const getOvenAddress = () => {
  return getAddress(tokens.oven.address)
}
export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}

// Awaiting Implementation
// Note: using ovenVault address to prevent errors
export const getOvenVaultAddress = () => {
  return getAddress(addresses.ovenVault)
}
export const getProfileAddress = () => {
  return getAddress(addresses.ovenVault) // ovenProfile
}
export const getBunnyFactoryAddress = () => {
  return getAddress(addresses.ovenVault) // bunnyFactory
}
export const getBunnySpecialAddress = () => {
  return getAddress(addresses.ovenVault) // bunnySpecial
}
export const getClaimRefundAddress = () => {
  return getAddress(addresses.ovenVault) // claimRefund
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.ovenVault) // pointCenterIfo
}


// Pancakeswap

export const getLotteryAddress = () => {
  return getAddress(addresses.ovenVault) // lottery
}
// export const getLotteryTicketAddress = () => {
//   return getAddress(addresses.lotteryNFT)
// }
// export const getPancakeRabbitsAddress = () => {
//   return getAddress(addresses.pancakeRabbits)
// }
// export const getClaimRefundAddress = () => {
//   return getAddress(addresses.claimRefund)
// }
// export const getBunnySpecialAddress = () => {
//   return getAddress(addresses.bunnySpecial)
// }
