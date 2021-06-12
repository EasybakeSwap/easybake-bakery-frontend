import BigNumber from 'bignumber.js'
import { getOvenVaultContract } from 'utils/contractHelpers'

const ovenVaultContract = getOvenVaultContract()

const fetchVaultUser = async (account: string) => {
  try {
    const userContractResponse = await ovenVaultContract.methods.userInfo(account).call()
    return {
      isLoading: false,
      userShares: new BigNumber(userContractResponse.shares).toJSON(),
      lastDepositedTime: userContractResponse.lastDepositedTime as string,
      lastUserActionTime: userContractResponse.lastUserActionTime as string,
      ovenAtLastUserAction: new BigNumber(userContractResponse.ovenAtLastUserAction).toJSON(),
    }
  } catch (error) {
    return {
      isLoading: true,
      userShares: null,
      lastDepositedTime: null,
      lastUserActionTime: null,
      ovenAtLastUserAction: null,
    }
  }
}

export default fetchVaultUser
