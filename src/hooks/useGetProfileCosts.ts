import { useEffect, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { multicallv2 } from 'utils/multicall'
import profileABI from 'config/abi/pancakeProfile.json'
import { getProfileAddress } from 'utils/addressHelpers'
import useToast from './useToast'

const useGetProfileCosts = () => {
  const { t } = useTranslation()
  const [costs, setCosts] = useState({
    numberMakiToReactivate: BIG_ZERO,
    numberMakiToRegister: BIG_ZERO,
    numberMakiToUpdate: BIG_ZERO,
  })
  const { toastError } = useToast()

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const calls = ['numberMakiToReactivate', 'numberMakiToRegister', 'numberMakiToUpdate'].map((method) => ({
          address: getProfileAddress(),
          name: method,
        }))
        const [[numberMakiToReactivate], [numberMakiToRegister], [numberMakiToUpdate]] = await multicallv2(
          profileABI,
          calls,
        )

        setCosts({
          numberMakiToReactivate: new BigNumber(numberMakiToReactivate.toString()),
          numberMakiToRegister: new BigNumber(numberMakiToRegister.toString()),
          numberMakiToUpdate: new BigNumber(numberMakiToUpdate.toString()),
        })
      } catch (error) {
        toastError(t('Error'), t('Could not retrieve MAKI costs for profile'))
      }
    }

    fetchCosts()
  }, [setCosts, toastError, t])

  return costs
}

export default useGetProfileCosts