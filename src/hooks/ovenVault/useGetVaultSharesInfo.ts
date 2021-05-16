import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { convertSharesToOven } from 'views/Pools/helpers'
import { useOvenVaultContract } from 'hooks/useContract'
import makeBatchRequest from 'utils/makeBatchRequest'

const useGetVaultSharesInfo = (lastUpdated?: number) => {
  const ovenVaultContract = useOvenVaultContract()
  const [totalShares, setTotalShares] = useState(null)
  const [totalOvenInVault, setTotalOvenInVault] = useState(null)
  const [pricePerFullShare, setPricePerFullShare] = useState(null)

  useEffect(() => {
    const getTotalShares = async () => {
      const [sharePrice, shares] = await makeBatchRequest([
        ovenVaultContract.methods.getPricePerFullShare().call,
        ovenVaultContract.methods.totalShares().call,
      ])
      const sharePriceAsBigNumber = new BigNumber(sharePrice as string)
      const totalSharesAsBigNumber = new BigNumber(shares as string)
      const totalOvenInVaultEstimate = convertSharesToOven(totalSharesAsBigNumber, sharePriceAsBigNumber)
      setPricePerFullShare(sharePriceAsBigNumber)
      setTotalShares(totalSharesAsBigNumber)
      setTotalOvenInVault(totalOvenInVaultEstimate.ovenAsBigNumber)
    }
    getTotalShares()
  }, [ovenVaultContract, lastUpdated])

  return { totalShares, totalOvenInVault, pricePerFullShare }
}

export default useGetVaultSharesInfo
