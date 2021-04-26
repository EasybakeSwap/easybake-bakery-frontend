import addresses from 'config/constants/contracts'
import tokens from 'config/constants/tokens'
import { Address } from 'config/constants/types'

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
export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}
export const getWethAddress = () => {
  return getAddress(tokens.weth)
}

// export const getLotteryTicketAddress = () => {
//   return getAddress(addresses.lotteryNFT)
// }
// export const getPancakeProfileAddress = () => {
//   return getAddress(addresses.pancakeProfile)
// }