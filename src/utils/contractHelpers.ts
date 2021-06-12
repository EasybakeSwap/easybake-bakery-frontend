
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'
import { poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'

// Addresses
import {
  getAddress,
  getEasyBakeProfileAddress,
  // getPancakeRabbitsAddress,
  getBunnyFactoryAddress,
  // getBunnySpecialAddress,
  getOvenAddress,
  getSugarAddress,
  getLotteryAddress,
  getLotteryTicketAddress,
  getMasterChefAddress,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
  getTradingCompetitionAddress,
  getOvenVaultAddress,
  getPredictionsAddress,
  getChainlinkOracleAddress,
} from 'utils/addressHelpers'

// ABI
import profileABI from 'config/abi/easybakeProfile.json'
// import pancakeRabbitsAbi from 'config/abi/pancakeRabbits.json'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
// import bunnySpecialAbi from 'config/abi/bunnySpecial.json'
import erc20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import lpTokenAbi from 'config/abi/easybake_v2_lp.json'
import ovenAbi from 'config/abi/oven.json'
import sugarAbi from 'config/abi/sugar.json'
import ifoAbi from 'config/abi/ifo.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import lotteryAbi from 'config/abi/lottery.json'
import lotteryTicketAbi from 'config/abi/lotteryNft.json'
import masterChef from 'config/abi/masterchef.json'
import sousChef from 'config/abi/sousChef.json'
import claimRefundAbi from 'config/abi/claimRefund.json'
import tradingCompetitionAbi from 'config/abi/tradingCompetition.json'
import ovenVaultAbi from 'config/abi/ovenVault.json'
import predictionsAbi from 'config/abi/predictions.json'
import chainlinkOracleAbi from 'config/abi/chainlinkOracle.json'
import { DEFAULT_GAS_PRICE, TESTNET_CHAIN_ID } from 'config'
import { getSettings, getGasPriceInWei } from './settings'

export const getDefaultGasPrice = () => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  if (chainId === TESTNET_CHAIN_ID) {
    return 10
  }
  return DEFAULT_GAS_PRICE
}

const getContract = (abi: any, address: string, web3?: Web3, account?: string) => {
  const _web3 = web3 ?? web3NoAccount
  const gasPrice = account ? getSettings(account).gasPrice : getDefaultGasPrice()

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
export const getIfoContract = (address: string, web3?: Web3) => {
  return getContract(ifoAbi, address, web3)
}
export const getSousChefContract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  return getContract(sousChef, getAddress(config.contractAddress), web3)
}
export const getPointCenterIfoContract = (web3?: Web3) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(), web3)
}
export const getOvenContract = (web3?: Web3) => {
  return getContract(ovenAbi, getOvenAddress(), web3)
}
export const getSugarContract = (web3?: Web3) => {
  return getContract(sugarAbi, getSugarAddress(), web3)
}
export const getProfileContract = (web3?: Web3) => {
  return getContract(profileABI, getEasyBakeProfileAddress(), web3)
}
// export const getPancakeRabbitContract = (web3?: Web3) => {
//   return getContract(pancakeRabbitsAbi, getPancakeRabbitsAddress(), web3)
// }
export const getBunnyFactoryContract = (web3?: Web3) => {
  return getContract(bunnyFactoryAbi, getBunnyFactoryAddress(), web3)
}
// export const getBunnySpecialContract = (web3?: Web3) => {
//   return getContract(bunnySpecialAbi, getBunnySpecialAddress(), web3)
// }
export const getLotteryContract = (web3?: Web3) => {
  return getContract(lotteryAbi, getLotteryAddress(), web3)
}
export const getLotteryTicketContract = (web3?: Web3) => {
  return getContract(lotteryTicketAbi, getLotteryTicketAddress(), web3)
}
export const getMasterchefContract = (web3?: Web3) => {
  return getContract(masterChef, getMasterChefAddress(), web3)
}
export const getClaimRefundContract = (web3?: Web3) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(), web3)
}
export const getTradingCompetitionContract = (web3?: Web3) => {
  return getContract(tradingCompetitionAbi, getTradingCompetitionAddress(), web3)
}
export const getOvenVaultContract = (web3?: Web3) => {
  return getContract(ovenVaultAbi, getOvenVaultAddress(), web3)
}
export const getPredictionsContract = (web3?: Web3) => {
  return getContract(predictionsAbi, getPredictionsAddress(), web3)
}
export const getChainlinkOracleContract = (web3?: Web3) => {
  return getContract(chainlinkOracleAbi, getChainlinkOracleAddress(), web3)
}