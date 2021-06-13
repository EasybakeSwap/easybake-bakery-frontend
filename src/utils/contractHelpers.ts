import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'
import { poolsConfig } from 'config/constants'

// Addresses
import {
  getAddress,
  getOvenAddress,
  getSugarAddress,
  getMasterChefAddress,
  getOvenVaultAddress,
} from 'utils/addressHelpers'

// ABI
import erc20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import ovenAbi from 'config/abi/oven.json' // v2 (Chain: Ethereum)
import sugarAbi from 'config/abi/sugar.json' // v2 (Chain: Ethereum)
import masterChef from 'config/abi/masterchef.json' // v2 (Chain: Ethereum)
import sousChef from 'config/abi/sousChef.json' // v2 (Chain: Ethereum)
import easybakeV2LpAbi from 'config/abi/easybake_v2_lp.json' // v2 (Chain: Ethereum)
import ovenVaultAbi from 'config/abi/ovenVault.json' // v2 (Chain: Ethereum)


const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract((abi as unknown) as AbiItem, address)
}
export const getErc20Contract = (address: string, web3?: Web3) => {
  return getContract(erc20Abi, address, web3)
}
export const getErc721Contract = (address: string, web3?: Web3) => {
  return getContract(erc721Abi, address, web3)
}
export const getLpContract = (address: string, web3?: Web3) => {
  return getContract(easybakeV2LpAbi, address, web3)
}
export const getSousChefContract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = sousChef
  return getContract(abi, getAddress(config.contractAddress), web3)
}
export const getMasterchefContract = (web3?: Web3) => {
  return getContract(masterChef, getMasterChefAddress(), web3)
}
export const getOvenContract = (web3?: Web3) => {
  return getContract(ovenAbi, getOvenAddress(), web3)
}
export const getSugarContract = (web3?: Web3) => {
  return getContract(sugarAbi, getSugarAddress(), web3)
}
export const getOvenVaultContract = (web3?: Web3) => {
  return getContract(ovenVaultAbi, getOvenVaultAddress(), web3)
}
