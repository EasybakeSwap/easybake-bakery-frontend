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
} from 'utils/addressHelpers'

// ABI
import ovenAbi from 'config/abi/oven.json'
import sugarAbi from 'config/abi/sugar.json'
import erc20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import masterChef from 'config/abi/masterchef.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefEth from 'config/abi/sousChefEth.json'
import uniV2LpAbi from 'config/abi/uni_v2_lp.json'


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
  return getContract(uniV2LpAbi, address, web3)
}
export const getSouschefContract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = sousChef
  return getContract(abi, getAddress(config.contractAddress), web3)
}
export const getSousChefEthContract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = sousChefEth
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
