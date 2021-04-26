import { useMemo } from 'react'
import useWeb3 from 'hooks/useWeb3'
import {
  getOvenContract,
  getSugarContract,
  getErc20Contract,
  getErc721Contract,
  getLpContract,
  getMasterchefContract,
  getSouschefContract,
} from 'utils/contractHelpers'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useERC20 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getErc20Contract(address, web3), [address, web3])
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getErc721Contract(address, web3), [address, web3])
}
export const useOven = () => {
  const web3 = useWeb3()
  return useMemo(() => getOvenContract(web3), [web3])
}
export const useSugar = () => {
  const web3 = useWeb3()
  return useMemo(() => getSugarContract(web3), [web3])
}
export const useMasterchef = () => {
  const web3 = useWeb3()
  return useMemo(() => getMasterchefContract(web3), [web3])
}
export const useLp = (id) => {
  const web3 = useWeb3()
  return useMemo(() => getLpContract(id, web3), [id, web3])
}
export const useSousChef = (id) => {
  const web3 = useWeb3()
  return useMemo(() => getSouschefContract(id, web3), [id, web3])
}
// export const useProfile = () => {
//   const web3 = useWeb3()
//   return useMemo(() => getProfileContract(web3), [web3])
// }