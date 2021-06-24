import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'
import { poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'
import { DEFAULT_GAS_PRICE } from 'config'

// -----------------
// Addresses
// -----------------
import {
  getAddress,
  getOvenAddress,
  getMasterChefAddress,
  getOvenVaultAddress,
  getMulticallAddress,
  // getProfileAddress,
  // getBunnyFactoryAddress,
  // getBunnySpecialAddress,
  // getClaimRefundAddress,
  // getPointCenterIfoAddress
} from 'utils/addressHelpers'

// -----------------
//  ABIs
// -----------------
// Standards
import erc20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import lpTokenAbi from 'config/abi/easybake_v2_lp.json'

// Native contracts
import ovenAbi from 'config/abi/oven.json'
import masterChef from 'config/abi/masterchef.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefEth from 'config/abi/sousChefEth.json'
import ovenVaultAbi from 'config/abi/ovenVault.json' // NEEDS TO BE UPDATED W/ MULTICALL V2
import multiCall from 'config/abi/Multicall.json' // NEEDS TO BE UPDATED W/ MULTICALL V2

// Not implemented yet
import profileAbi from 'config/abi/pancakeProfile.json'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
import bunnySpecialAbi from 'config/abi/bunnySpecial.json'
import claimRefundAbi from 'config/abi/claimRefund.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'

// Settings
import { getSettings, getGasPriceInWei } from './settings'

// -----------------
//  Functions
// -----------------
export const getContract = (abi: any, address: string, web3?: Web3, account?: string) => {
  const _web3 = web3 ?? web3NoAccount
  const gasPrice = account ? getSettings(account).gasPrice : DEFAULT_GAS_PRICE

  return new _web3.eth.Contract(abi as unknown as AbiItem, address, {
    gasPrice: getGasPriceInWei(gasPrice).toString(),
  })
}
export const getErc20Contract = (address: string, web3?: Web3) => {
  return getContract(erc20Abi, address, web3)
}
export const getErc721Contract = (address: string, web3?: Web3) => {
  return getContract(erc721Abi, address, web3)
}
export const getLpContract = (address: string, web3?: Web3) => {
  return getContract(lpTokenAbi, address, web3)
}
export const getOvenContract = (web3?: Web3) => {
  return getContract(ovenAbi, getOvenAddress(), web3)
}
export const getOvenVaultContract = (web3?: Web3) => {
  return getContract(ovenVaultAbi, getOvenVaultAddress(), web3)
}
export const getMasterchefContract = (web3?: Web3) => {
  return getContract(masterChef, getMasterChefAddress(), web3)
}
export const getSousChefContract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = config.poolCategory === PoolCategory.ETH ? sousChefEth : sousChef
  return getContract(abi, getAddress(config.contractAddress), web3)
}

export const getMulticallContract = (web3?: Web3) => {
  return getContract(multiCall, getMulticallAddress(), web3)
}

// Not implemented yet - here to avoid errors
// export const getProfileContract = (web3?: Web3) => {
//   return getContract(profileAbi, getProfileAddress(), web3)
// }
// export const getBunnyFactoryContract = (web3?: Web3) => {
//   return getContract(bunnyFactoryAbi, getBunnyFactoryAddress(), web3)
// }
// export const getBunnySpecialContract = (web3?: Web3) => {
//   return getContract(bunnySpecialAbi, getBunnySpecialAddress(), web3)
// }
// export const getClaimRefundContract = (web3?: Web3) => {
//   return getContract(claimRefundAbi, getClaimRefundAddress(), web3)
// }
// export const getPointCenterIfoContract = (web3?: Web3) => {
//   return getContract(pointCenterIfo, getPointCenterIfoAddress(), web3)
// }