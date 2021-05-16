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
  getOvenVaultContract,
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
export const useERC721Contract = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getErc721Contract(address, web3), [address, web3])
}
export const useOvenContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getOvenContract(web3), [web3])
}
export const useSugarContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getSugarContract(web3), [web3])
}
export const useMasterchefContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getMasterchefContract(web3), [web3])
}
export const useLpContract = (id) => {
  const web3 = useWeb3()
  return useMemo(() => getLpContract(id, web3), [id, web3])
}
export const useSousChefContract = (id) => {
  const web3 = useWeb3()
  return useMemo(() => getSouschefContract(id, web3), [id, web3])
}
export const useOvenVaultContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getOvenVaultContract(web3), [web3])
}
// export const useProfile = () => {
//   const web3 = useWeb3()
//   return useMemo(() => getProfileContract(web3), [web3])
// }