import { useEffect, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import { getProfileContract } from 'utils/contractHelpers'
import makeBatchRequest from 'utils/makeBatchRequest'
import { BIG_ZERO } from 'utils/bigNumber'
import useToast from './useToast'

const useGetProfileCosts = () => {
  const { t } = useTranslation()
  const [costs, setCosts] = useState({
    numberOvenToReactivate: BIG_ZERO,
    numberOvenToRegister: BIG_ZERO,
    numberOvenToUpdate: BIG_ZERO,
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
        toastError(t('Error'), t('Could not retrieve OVEN costs for profile'))
      }
    }

    fetchCosts()
  }, [setCosts, toastError, t])

  return costs
}

export default useGetProfileCosts
