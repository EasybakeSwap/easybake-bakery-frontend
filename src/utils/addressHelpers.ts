import { MAINNET_CHAIN_ID } from 'config'
import addresses from 'config/constants/contracts'
import tokens from 'config/constants/tokens'
import { Address } from 'config/constants/types'

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[MAINNET_CHAIN_ID]
}

// In Use
export const getOvenAddress = () => {
  return getAddress(tokens.oven.address)
}
export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getOvenVaultAddress = () => {
  return getAddress(addresses.ovenVault)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}
export const getWethAddress = () => {
  return getAddress(tokens.weth.address)
}

// Unused
export const getLotteryAddress = () => {
  return getAddress(addresses.ovenVault)
}
export const getLotteryTicketAddress = () => {
  return getAddress(addresses.ovenVault)
}
export const getLotteryV2Address = () => {
  return getAddress(addresses.ovenVault)
}
export const getPancakeProfileAddress = () => {
  return getAddress(addresses.ovenVault)
}
export const getPancakeRabbitsAddress = () => {
  return getAddress(addresses.ovenVault)
}
export const getBunnyFactoryAddress = () => {
  return getAddress(addresses.ovenVault)
}
export const getClaimRefundAddress = () => {
  return getAddress(addresses.ovenVault)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.ovenVault)
}
export const getBunnySpecialAddress = () => {
  return getAddress(addresses.ovenVault)
}
export const getTradingCompetitionAddress = () => {
  return getAddress(addresses.ovenVault)
}
export const getEasterNftAddress = () => {
  return getAddress(addresses.ovenVault)
}
export const getPredictionsAddress = () => {
  return getAddress(addresses.ovenVault)
}
export const getChainlinkOracleAddress = () => {
  return getAddress(addresses.ovenVault)
}
