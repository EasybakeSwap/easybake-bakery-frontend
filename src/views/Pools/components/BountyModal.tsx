import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { Modal, Text, Flex, Button, AutoRenewIcon } from 'easybake-uikit' // Disabled: HelpIcon, useTooltip
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useOvenVaultContract } from 'hooks/useContract'
import useTheme from 'hooks/useTheme'
import useToast from 'hooks/useToast'
import UnlockButton from 'components/UnlockButton'

interface BountyModalProps {
  ovenBountyToDisplay: string
  dollarBountyToDisplay: string
  totalPendingOvenHarvest: BigNumber
  callFee: number
  onDismiss?: () => void
  TooltipComponent?: React.ElementType
}

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundDisabled};
  height: 1px;
  margin: 16px auto;
  width: 100%;
`

const BountyModal: React.FC<BountyModalProps> = ({
  ovenBountyToDisplay,
  dollarBountyToDisplay,
  totalPendingOvenHarvest,
  callFee,
  onDismiss,
}) => {
  const { account } = useWeb3React()
  const { theme } = useTheme()
  const { toastError, toastSuccess } = useToast()
  const ovenVaultContract = useOvenVaultContract()
  const [pendingTx, setPendingTx] = useState(false)
  const callFeeAsDecimal = callFee / 100
  const totalYieldToDisplay = getFullDisplayBalance(totalPendingOvenHarvest, 18, 3)
  // const { targetRef, tooltip, tooltipVisible } = useTooltip(<TooltipComponent />, {
  //   placement: 'bottom',
  //   tooltipPadding: { right: 15 },
  // })

  const handleConfirmClick = async () => {
    ovenVaultContract.methods
      .harvest()
      .send({ from: account })
      .on('sending', () => {
        setPendingTx(true)
      })
      .on('receipt', () => {
        toastSuccess('Bounty collected!', 'OVEN bounty has been sent to your wallet.')
        setPendingTx(false)
        onDismiss()
      })
      .on('error', (error) => {
        console.error(error)
        toastError(
          'Could not be collected',
          'There may be an issue with your transaction, or another user claimed the bounty first.',
        )
        setPendingTx(false)
      })
  }

  return (
    <Modal title='Claim Bounty' onDismiss={onDismiss} headerBackground={theme.colors.gradients.cardHeader}>
      {/* {tooltipVisible && tooltip} */}
      <Flex alignItems="flex-start" justifyContent="space-between">
        <Text>You`ll claim</Text>
        <Flex flexDirection="column">
          <Text bold>{ovenBountyToDisplay} OVEN</Text>
          <Text fontSize="12px" color="textSubtle">
            ~ {dollarBountyToDisplay} USD
          </Text>
        </Flex>
      </Flex>
      <Divider />
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="14px" color="textSubtle">
          Pool total pending yield
        </Text>
        <Text fontSize="14px" color="textSubtle">
          {totalYieldToDisplay} OVEN
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="24px">
        <Text fontSize="14px" color="textSubtle">
          Bounty
        </Text>
        <Text fontSize="14px" color="textSubtle">
          {callFeeAsDecimal}%
        </Text>
      </Flex>
      {account ? (
        <Button
          isLoading={pendingTx}
          endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
          onClick={handleConfirmClick}
          mb="28px"
        >
          Confirm
        </Button>
      ) : (
        <UnlockButton scale="100%" />
      )}
      {/* <Flex justifyContent="center" alignItems="center">
        <Text fontSize="16px" bold color="textSubtle" mr="4px">
          What's this?
        </Text>
        <span ref={targetRef}>
          <HelpIcon color="textSubtle" />
        </span>
      </Flex> */}
    </Modal>
  )
}

export default BountyModal
