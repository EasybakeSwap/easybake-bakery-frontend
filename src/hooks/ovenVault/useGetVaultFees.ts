import { useEffect, useState } from 'react'
import { useOvenVaultContract } from 'hooks/useContract'
import makeBatchRequest from 'utils/makeBatchRequest'

export interface VaultFees {
  performanceFee: string
  callFee: string
  withdrawalFee: string
  withdrawalFeePeriod: string
}

const useGetVaultFees = () => {
  const ovenVaultContract = useOvenVaultContract()
  const [fees, setFees] = useState({
    performanceFee: null,
    callFee: null,
    withdrawalFee: null,
    withdrawalFeePeriod: null,
  })

  useEffect(() => {
    const getFees = async () => {
      const [
        contractPerformanceFee,
        contractWithdrawalFeeTimePeriod,
        contractCallFee,
        contractWithdrawalFee,
      ] = await makeBatchRequest([
        ovenVaultContract.methods.performanceFee().call,
        ovenVaultContract.methods.withdrawFeePeriod().call,
        ovenVaultContract.methods.callFee().call,
        ovenVaultContract.methods.withdrawFee().call,
      ])

      setFees({
        performanceFee: contractPerformanceFee as string,
        callFee: contractCallFee as string,
        withdrawalFee: contractWithdrawalFee as string,
        withdrawalFeePeriod: contractWithdrawalFeeTimePeriod as string,
      })
    }

    getFees()
  }, [ovenVaultContract])

  return fees
}

export default useGetVaultFees
