import BigNumber from 'bignumber.js'
import { convertSharesToOven } from 'views/Pools/helpers'
import { getOvenVaultContract } from 'utils/contractHelpers'
import makeBatchRequest from 'utils/makeBatchRequest'

const ovenVaultContract = getOvenVaultContract()

export const fetchPublicVaultData = async () => {
  try {
    const [sharePrice, shares, estimatedOvenBountyReward, totalPendingOvenHarvest] = await makeBatchRequest([
      ovenVaultContract.methods.getPricePerFullShare().call,
      ovenVaultContract.methods.totalShares().call,
      ovenVaultContract.methods.calculateHarvestCakeRewards().call,
      ovenVaultContract.methods.calculateTotalpendingOvenRewards().call,
    ])
    const totalSharesAsBigNumber = new BigNumber(shares as string)
    const sharePriceAsBigNumber = new BigNumber(sharePrice as string)
    const totalOvenInVaultEstimate = convertSharesToOven(totalSharesAsBigNumber, sharePriceAsBigNumber)
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalOvenInVault: totalOvenInVaultEstimate.ovenAsBigNumber.toJSON(),
      estimatedOvenBountyReward: new BigNumber(estimatedOvenBountyReward as string).toJSON(),
      totalPendingOvenHarvest: new BigNumber(totalPendingOvenHarvest as string).toJSON(),
    }
  } catch (error) {
    return {
      totalShares: null,
      pricePerFullShare: null,
      totalOvenInVault: null,
      estimatedOvenBountyReward: null,
      totalPendingOvenHarvest: null,
    }
  }
}

export const fetchVaultFees = async () => {
  try {
    const [performanceFee, callFee, withdrawalFee, withdrawalFeePeriod] = await makeBatchRequest([
      ovenVaultContract.methods.performanceFee().call,
      ovenVaultContract.methods.callFee().call,
      ovenVaultContract.methods.withdrawFee().call,
      ovenVaultContract.methods.withdrawFeePeriod().call,
    ])
    return {
      performanceFee: parseInt(performanceFee as string, 10),
      callFee: parseInt(callFee as string, 10),
      withdrawalFee: parseInt(withdrawalFee as string, 10),
      withdrawalFeePeriod: parseInt(withdrawalFeePeriod as string, 10),
    }
  } catch (error) {
    return {
      performanceFee: null,
      callFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null,
    }
  }
}

export default fetchPublicVaultData
