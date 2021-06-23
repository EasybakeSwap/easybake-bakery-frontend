import { useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { multicallv2 } from 'utils/multicall'
import profileABI from 'config/abi/pancakeProfile.json'
import { getProfileAddress } from 'utils/addressHelpers'
import useToast from './useToast'

const useGetProfileCosts = () => {
  
  const [costs, setCosts] = useState({
    numberOvenToReactivate: BIG_ZERO,
    numberOvenToRegister: BIG_ZERO,
    numberOvenToUpdate: BIG_ZERO,
  })
  const { toastError } = useToast()

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const calls = ['numberOvenToReactivate', 'numberOvenToRegister', 'numberOvenToUpdate'].map((method) => ({
          address: getProfileAddress(),
          name: method,
        }))
        const [[numberOvenToReactivate], [numberOvenToRegister], [numberOvenToUpdate]] = await multicallv2(
          profileABI,
          calls,
        )

        setCosts({
          numberOvenToReactivate: new BigNumber(numberOvenToReactivate.toString()),
          numberOvenToRegister: new BigNumber(numberOvenToRegister.toString()),
          numberOvenToUpdate: new BigNumber(numberOvenToUpdate.toString()),
        })
      } catch (error) {
        toastError('Error: Could not retrieve OVEN costs for profile')
      }
    }

    fetchCosts()
  }, [setCosts, toastError])

  return costs
}

export default useGetProfileCosts