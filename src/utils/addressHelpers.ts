import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'
import tokens from 'config/constants/tokens'

export const getAddress = (address: Address): string => {
  const mainNetChainId = 1
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

export const getOvenAddress = () => {
  return getAddress(tokens.oven.address)
}
export const getSugarAddress = () => {
  return getAddress(tokens.sugar.address)
}
export const getWethAddress = () => {
  return getAddress(tokens.weth.address)
}
export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}
export const getOvenVaultAddress = () => {
  return getAddress(addresses.ovenVault)
}
// export const getLotteryTicketAddress = () => {
//   return getAddress(addresses.lotteryNFT)
// }
// export const getPancakeProfileAddress = () => {
//   return getAddress(addresses.pancakeProfile)
// }