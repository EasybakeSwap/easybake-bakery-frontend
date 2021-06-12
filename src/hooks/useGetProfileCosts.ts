import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { getProfileContract } from 'utils/contractHelpers'
import makeBatchRequest from 'utils/makeBatchRequest'
import { useToast } from 'state/hooks'

const useGetProfileCosts = () => {
  const [costs, setCosts] = useState({
    numberOvenToReactivate: new BigNumber(0),
    numberOvenToRegister: new BigNumber(0),
    numberOvenToUpdate: new BigNumber(0),
  })
  const { toastError } = useToast()

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const profileContract = getProfileContract()
        const [numberOvenToReactivate, numberOvenToRegister, numberOvenToUpdate] = await makeBatchRequest([
          profileContract.methods.numberOvenToReactivate().call,
          profileContract.methods.numberOvenToRegister().call,
          profileContract.methods.numberOvenToUpdate().call,
        ])

        setCosts({
          numberOvenToReactivate: new BigNumber(numberOvenToReactivate as string),
          numberOvenToRegister: new BigNumber(numberOvenToRegister as string),
          numberOvenToUpdate: new BigNumber(numberOvenToUpdate as string),
        })
      } catch (error) {
        toastError('Error', 'Could not retrieve OVEN costs for profile')
      }
    }

    fetchCosts()
  }, [setCosts, toastError])

  return costs
}

export default useGetProfileCosts
