import { useEffect, useState } from 'react'

// import BigNumber from 'bignumber.js'
// // import { getProfileContract } from 'utils/contractHelpers'
// import makeBatchRequest from 'utils/makeBatchRequest'
// import { BIG_ZERO } from 'utils/bigNumber'
// import useToast from './useToast'

// const useGetProfileCosts = () => {
//   const [costs, setCosts] = useState({
//     OvenT: BIG_ZERO,
//     numberOvenToRegister: BIG_ZERO,
//     numberOvenToUpdate: BIG_ZERO,
//   })
//   const { toastError } = useToast()

//   useEffect(() => {
//     const fetchCosts = async () => {
//       try {
//         // const profileContract = getProfileContract()
//         // const [OvenT, numberOvenToRegister, numberOvenToUpdate] = await makeBatchRequest([
//         //   profileContract.methods.OvenT().call,
//         //   profileContract.methods.numberOvenToRegister().call,
//         //   profileContract.methods.numberOvenToUpdate().call,
//         // ])

//         setCosts({
//           OvenT: new BigNumber(OvenT as string),
//           numberOvenToRegister: new BigNumber(numberOvenToRegister as string),
//           numberOvenToUpdate: new BigNumber(numberOvenToUpdate as string),
//         })
//       } catch (error) {
//         toastError(('Error'), ('Could not retrieve OVEN costs for profile'))
//       }
//     }

//     fetchCosts()
//   }, [setCosts, toastError, t])

//   return costs
// }

// export default useGetProfileCosts
