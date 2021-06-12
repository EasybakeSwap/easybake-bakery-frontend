import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { AutoRenewIcon, Button, Flex, InjectedModalProps, Text } from 'easybake-uikit'
import { useOven } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { useProfile } from 'state/hooks'
import { getEasyBakeProfileAddress } from 'utils/addressHelpers'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useGetProfileCosts from 'hooks/useGetProfileCosts'
import { UseEditProfileResponse } from './reducer'

interface ApproveOvenPageProps extends InjectedModalProps {
  goToChange: UseEditProfileResponse['goToChange']
}

const ApproveOvenPage: React.FC<ApproveOvenPageProps> = ({ goToChange, onDismiss }) => {
  const [isApproving, setIsApproving] = useState(false)
  const { profile } = useProfile()
  const { account } = useWeb3React()
  const { numberOvenToUpdate, numberOvenToReactivate } = useGetProfileCosts()
  const ovenContract = useOven()
  const { toastError } = useToast()
  const cost = profile.isActive ? numberOvenToUpdate : numberOvenToReactivate

  const handleApprove = () => {
    ovenContract.methods
      .approve(getEasyBakeProfileAddress(), cost.times(2).toJSON())
      .send({ from: account })
      .on('sending', () => {
        setIsApproving(true)
      })
      .on('receipt', () => {
        goToChange()
      })
      .on('error', (error) => {
        toastError(('Error'), error?.message)
        setIsApproving(false)
      })
  }

  if (!profile) {
    return null
  }

  return (
    <Flex flexDirection="column">
      <Flex alignItems="center" justifyContent="space-between" mb="24px">
        <Text>{profile.isActive ? ('Cost to update:') : ('Cost to reactivate:')}</Text>
        <Text>{getFullDisplayBalance(cost)} OVEN</Text>
      </Flex>
      <Button
        disabled={isApproving}
        isLoading={isApproving}
        endIcon={isApproving ? <AutoRenewIcon spin color="currentColor" /> : null}
        width="100%"
        mb="8px"
        onClick={handleApprove}
      >
        {t('Approve')}
      </Button>
      <Button variant="text" width="100%" onClick={onDismiss} disabled={isApproving}>
        {('Close Window')}
      </Button>
    </Flex>
  )
}

export default ApproveOvenPage
