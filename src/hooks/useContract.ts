import { useEffect, useState } from 'react' // useMemo
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'
import useWeb3 from 'hooks/useWeb3'

// Addresses
import {
  getAddress,
  getMasterChefAddress,
  getOvenAddress,
  getOvenVaultAddress,
  getProfileAddress,
  getLotteryAddress,
} from 'utils/addressHelpers'
import { poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'

// ABIs
import erc20 from 'config/abi/erc20.json'
import masterChef from 'config/abi/masterchef.json'
import sousChef from 'config/abi/sousChef.json'
import sousChefHt from 'config/abi/sousChef.json'
import ovenVault from 'config/abi/ovenVault.json'
import profile from 'config/abi/pancakeProfile.json'

// import ifo from 'config/abi/ifo.json'
// import pointCenterIfo from 'config/abi/pointCenterIfo.json'
// import bunnySpecial from 'config/abi/bunnySpecial.json'
import lottery from 'config/abi/lottery.json'
import lotteryTicket from 'config/abi/lotteryNft.json'

const useContract = (abi: AbiItem, address: string, contractOptions?: ContractOptions) => {
  const web3 = useWeb3()
  const [contract, setContract] = useState(new web3.eth.Contract(abi, address, contractOptions))

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions))
  }, [abi, address, contractOptions, web3])

  return contract
}

/**
 * Helper hooks to get specific contracts (by ABI)
 */
export const useERC20 = (address: string) => {
  const erc20Abi = (erc20 as unknown) as AbiItem
  return useContract(erc20Abi, address)
}

export const useOven = () => {
  return useERC20(getOvenAddress())
}

export const useMasterchef = () => {
  const abi = (masterChef as unknown) as AbiItem
  return useContract(abi, getMasterChefAddress())
}

export const useSousChef = (id) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const rawAbi = config.poolCategory === PoolCategory.ETH ? sousChefHt : sousChef
  const abi = (rawAbi as unknown) as AbiItem
  return useContract(abi, getAddress(config.contractAddress))
}

// FIX ** NEED TO ADD
export const useOvenVaultContract = () => {
  const abi = (ovenVault as unknown) as AbiItem
  return useContract(abi, getOvenVaultAddress())
}

// Pancake
// export const useIfoContract = (address: string) => {
//   const ifoAbi = (erc20 as unknown) as AbiItem
//   return useContract(ifoAbi, address)
// }

// export const useBunnyFactory = () => {
//   const bunnyFactoryAbi = (erc20 as unknown) as AbiItem
//   return useContract(bunnyFactoryAbi, getOvenAddress())
// }

// export const usePancakeRabbits = () => {
//   const pancakeRabbitsAbi = (erc20 as unknown) as AbiItem
//   return useContract(pancakeRabbitsAbi, getOvenAddress())
// }

export const useProfile = () => {
  const abi = (profile as unknown) as AbiItem
  return useContract(abi, getProfileAddress())
}

export const useLottery = () => {
  const abi = (lottery as unknown) as AbiItem
  return useContract(abi, getLotteryAddress())
}

export const useLotteryTicket = () => {
  const abi = (lotteryTicket as unknown) as AbiItem
  return useContract(abi, getLotteryAddress()) // UPDATE get()
}


// export const usePointCenterIfoContract = () => {
//   const abi = (erc20 as unknown) as AbiItem
//   return useContract(abi, getOvenAddress())
// }

// export const useBunnySpecialContract = () => {
//   const abi = (erc20 as unknown) as AbiItem
//   return useContract(abi, getOvenAddress())
// }

export default useContract
