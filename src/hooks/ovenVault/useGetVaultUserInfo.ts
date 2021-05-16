import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { BIG_ZERO } from 'utils/bigNumber'
import { useOvenVaultContract } from 'hooks/useContract'

const useGetVaultUserInfo = (lastUpdated?: number) => {
  const { account } = useWeb3React()
  const ovenVaultContract = useOvenVaultContract()
  const [userInfo, setUserInfo] = useState({
    shares: BIG_ZERO,
    ovenAtLastUserAction: BIG_ZERO,
    lastDepositedTime: '',
    lastUserActionTime: '',
  })

  useEffect(() => {
    //   user-specific vault contract fetches
    const fetchUserVaultInfo = async () => {
      const userContractInfo = await ovenVaultContract.methods.userInfo(account).call()
      setUserInfo({
        shares: new BigNumber(userContractInfo.shares),
        ovenAtLastUserAction: new BigNumber(userContractInfo.ovenAtLastUserAction),
        lastDepositedTime: userContractInfo.lastDepositedTime,
        lastUserActionTime: userContractInfo.lastUserActionTime,
      })
    }

    if (account) {
      fetchUserVaultInfo()
    }
  }, [account, ovenVaultContract, lastUpdated])

  return userInfo
}

export default useGetVaultUserInfo
