import { useMemo } from 'react'
import useWeb3 from 'hooks/useWeb3'
import {
  getErc20Contract,
  getOvenContract,
  getBunnyFactoryContract,
  // getBunnySpecialContract,
  // getPancakeRabbitContract,
  getProfileContract,
  // getIfoContract,
  getLotteryContract,
  getLotteryTicketContract,
  getMasterchefContract,
  getPointCenterIfoContract,
  getSousChefContract,
  getClaimRefundContract,
  getTradingCompetitionContract,
  // getEasterNftContract,
  getErc721Contract,
  getOvenVaultContract,
  getPredictionsContract,
  getChainlinkOracleContract,
  getLotteryContract,
} from 'utils/contractHelpers'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

// export const useIfoContract = (address: string) => {
//   const web3 = useWeb3()
//   return useMemo(() => getIfoContract(address, web3), [address, web3])
// }

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

export const useBunnyFactory = () => {
  const web3 = useWeb3()
  return useMemo(() => getBunnyFactoryContract(web3), [web3])
}

// export const usePancakeRabbits = () => {
//   const web3 = useWeb3()
//   return useMemo(() => getPancakeRabbitContract(web3), [web3])
// }

export const useProfile = () => {
  const web3 = useWeb3()
  return useMemo(() => getProfileContract(web3), [web3])
}

export const useLottery = () => {
  const web3 = useWeb3()
  return useMemo(() => getLotteryContract(web3), [web3])
}

export const useLotteryTicket = () => {
  const web3 = useWeb3()
  return useMemo(() => getLotteryTicketContract(web3), [web3])
}

export const useMasterchef = () => {
  const web3 = useWeb3()
  return useMemo(() => getMasterchefContract(web3), [web3])
}

export const useSousChef = (id) => {
  const web3 = useWeb3()
  return useMemo(() => getSousChefContract(id, web3), [id, web3])
}

export const usePointCenterIfoContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getPointCenterIfoContract(web3), [web3])
}

// export const useBunnySpecialContract = () => {
//   const web3 = useWeb3()
//   return useMemo(() => getBunnySpecialContract(web3), [web3])
// }

export const useClaimRefundContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getClaimRefundContract(web3), [web3])
}

export const useTradingCompetitionContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getTradingCompetitionContract(web3), [web3])
}

// export const useEasterNftContract = () => {
//   const web3 = useWeb3()
//   return useMemo(() => getEasterNftContract(web3), [web3])
// }

export const useOvenVaultContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getOvenVaultContract(web3), [web3])
}

export const usePredictionsContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getPredictionsContract(web3), [web3])
}

export const useChainlinkOracleContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getChainlinkOracleContract(web3), [web3])
}
