import React, { useState } from 'react'
import { Button, AutoRenewIcon, Skeleton } from 'easybake-uikit'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useOvenContract, useOvenVaultContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { Pool } from 'state/types'

interface ApprovalActionProps {
  pool: Pool
  setLastUpdated: () => void
  isLoading?: boolean
}

const ApprovalAction: React.FC<ApprovalActionProps> = ({ pool, isLoading = false, setLastUpdated }) => {
  const { account } = useWeb3React()
  const { stakingToken } = pool
  const ovenVaultContract = useOvenVaultContract()
  const ovenContract = useOvenContract()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { toastSuccess, toastError } = useToast()

  const handleApprove = () => {
    ovenContract.methods
      .approve(ovenVaultContract.options.address, ethers.constants.MaxUint256)
      .send({ from: account })
      .on('sending', () => {
        setRequestedApproval(true)
      })
      .on('receipt', () => {
        toastSuccess(`Contract Enabled`, `You can now stake in the ${stakingToken.symbol} vault!`)
        setLastUpdated()
        setRequestedApproval(false)
      })
      .on('error', (error) => {
        console.error(error)
        toastError('Error', `Please try again. Confirm the transaction and make sure you are paying enough gas!`)
        setRequestedApproval(false)
      })
  }

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <Button
          isLoading={requestedApproval}
          endIcon={requestedApproval ? <AutoRenewIcon spin color="currentColor" /> : null}
          disabled={requestedApproval}
          onClick={handleApprove}
          width="100%"
        >
          Enable
        </Button>
      )}
    </>
  )
}

export default ApprovalAction
