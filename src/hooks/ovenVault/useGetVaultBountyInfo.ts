import { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useGetApiPrice } from 'state/hooks'
import { useOvenVaultContract } from 'hooks/useContract'
import useRefresh from 'hooks/useRefresh'
import makeBatchRequest from 'utils/makeBatchRequest'
import { getOvenAddress } from 'utils/addressHelpers'

const useGetVaultBountyInfo = () => {
  const { fastRefresh } = useRefresh()
  const ovenVaultContract = useOvenVaultContract()
  const [estimatedDollarBountyReward, setEstimatedDollarBountyReward] = useState(null)
  const [estimatedOvenBountyReward, setEstimatedOvenBountyReward] = useState(null)
  const [totalPendingOvenHarvest, setTotalPendingOvenHarvest] = useState(null)

  const ovenPrice = useGetApiPrice(getOvenAddress())

  useEffect(() => {
    const fetchRewards = async () => {
      const [estimatedClaimableOvenReward, pendingTotalOvenHarvest] = await makeBatchRequest([
        ovenVaultContract.methods.calculateHarvestOvenRewards().call,
        ovenVaultContract.methods.calculateTotalPendingOvenRewards().call,
      ])
      if (ovenPrice) {
        const dollarValueOfClaimableReward = new BigNumber(estimatedClaimableOvenReward as string).multipliedBy(
          ovenPrice,
        )
        setEstimatedDollarBountyReward(dollarValueOfClaimableReward)
      }
      setEstimatedOvenBountyReward(new BigNumber(estimatedClaimableOvenReward as string))
      setTotalPendingOvenHarvest(new BigNumber(pendingTotalOvenHarvest as string))
    }
    fetchRewards()
  }, [ovenVaultContract, ovenPrice, fastRefresh])

  return { estimatedOvenBountyReward, estimatedDollarBountyReward, totalPendingOvenHarvest }
}

export default useGetVaultBountyInfo
