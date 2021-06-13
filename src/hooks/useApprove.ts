import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { useAppDispatch } from 'state'
import { updateUserAllowance } from 'state/actions'
import { approve } from 'utils/callHelpers'
import { useMasterchef, useOven, useSousChef, useOvenVaultContract } from './useContract'
import useToast from './useToast'
import useLastUpdated from './useLastUpdated'

// Approve a Farm
export const useApprove = (lpContract: Contract) => {
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}

// Approve a Pool
export const useSousApprove = (lpContract: Contract, sousId, earningTokenSymbol) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const sousChefContract = useSousChef(sousId)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const tx = await approve(lpContract, sousChefContract, account)
      dispatch(updateUserAllowance[account])
      if (tx) {
        toastSuccess(
          ('Staking Enabled') +
          ({ symbol: earningTokenSymbol }),
        )
        setRequestedApproval(false)
      } else {
        // user rejected tx or didn't go thru
        toastError(('Error'), ('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
      toastError(('Error'), e?.message)
    }
  }, [account, dispatch, lpContract, sousChefContract, sousId, earningTokenSymbol, toastError, toastSuccess])

  return { handleApprove, requestedApproval }
}

// Approve OVEN auto pool
export const useVaultApprove = (setLastUpdated: () => void) => {
  const { account } = useWeb3React()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const ovenVaultContract = useOvenVaultContract()
  const ovenContract = useOven()

  const handleApprove = () => {
    ovenContract.methods
      .approve(ovenVaultContract.options.address, ethers.constants.MaxUint256)
      .send({ from: account })
      .on('sending', () => {
        setRequestedApproval(true)
      })
      .on('receipt', () => {
        toastSuccess(('Staking Enabled' + { symbol: 'OVEN' }))
        setLastUpdated()
        setRequestedApproval(false)
      })
      .on('error', (error) => {
        console.error(error)
        toastError(('Error'), ('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
      })
  }

  return { handleApprove, requestedApproval }
}

export const useCheckVaultApprovalStatus = () => {
  const [isVaultApproved, setIsVaultApproved] = useState(false)
  const { account } = useWeb3React()
  const ovenContract = useOven()
  const ovenVaultContract = useOvenVaultContract()
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  useEffect(() => {
    const checkApprovalStatus = async () => {
      try {
        const response = await ovenContract.methods.allowance(account, ovenVaultContract.options.address).call()
        const currentAllowance = new BigNumber(response)
        setIsVaultApproved(currentAllowance.gt(0))
      } catch (error) {
        setIsVaultApproved(false)
      }
    }

    checkApprovalStatus()
  }, [account, ovenContract, ovenVaultContract, lastUpdated])

  return { isVaultApproved, setLastUpdated }
}

// // Approve the lottery
// export const useLotteryApprove = () => {
//   const { account } = useWeb3React()
//   const ovenContract = useOven()
//   const lotteryContract = useLottery()

//   const handleApprove = useCallback(async () => {
//     try {
//       const tx = await approve(ovenContract, lotteryContract, account)
//       return tx
//     } catch (e) {
//       return false
//     }
//   }, [account, ovenContract, lotteryContract])

//   return { onApprove: handleApprove }
// }

// Approve an IFO
export const useIfoApprove = (tokenContract: Contract, spenderAddress: string) => {
  const { account } = useWeb3React()
  const onApprove = useCallback(async () => {
    const tx = await tokenContract.methods.approve(spenderAddress, ethers.constants.MaxUint256).send({ from: account })
    return tx
  }, [account, spenderAddress, tokenContract])

  return onApprove
}
