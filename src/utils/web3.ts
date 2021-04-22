import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'
import getRpcUrl from 'utils/getRpcUrl'

// ABI
import lpTokenAbi from 'config/abi/lpToken.json'

const RPC_URL = getRpcUrl()
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)

/**
 * Provides a web3 instance using our own private provider httpProver
 */
const getWeb3 = () => {
  const web3 = new Web3(httpProvider)
  return web3
}

const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? getWeb3()
  return new _web3.eth.Contract((abi as unknown) as AbiItem, address)
}

export const getLpContract = (address: string, web3?: Web3) => {
  return getContract(lpTokenAbi, address, web3)
}



export { getWeb3, getContract, httpProvider }
