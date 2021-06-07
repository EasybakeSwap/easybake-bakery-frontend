import React from 'react'
import { Flex, Text, useTooltip } from 'easybake-uikit' // disabeld TooltipText
import { useWeb3React } from '@web3-react/core'
import useWithdrawalFeeTimer from 'hooks/ovenVault/useWithdrawalFeeTimer'
import WithdrawalFeeTimer from './WithdrawalFeeTimer'

interface UnstakingFeeCountdownRowProps {
  withdrawalFee: string
  lastDepositedTime: string
  withdrawalFeePeriod?: string
}

const UnstakingFeeCountdownRow: React.FC<UnstakingFeeCountdownRowProps> = ({
  withdrawalFee,
  lastDepositedTime,
  withdrawalFeePeriod = '259200',
}) => {
  const { account } = useWeb3React()
  const feeAsDecimal = parseInt(withdrawalFee) / 100 || '-'
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Text bold mb="4px">
        Unstaking fee: {feeAsDecimal}
      </Text>
      <Text>
        Only applies within 3 days of staking. Unstaking after 3 days will not include a fee. Timer resets every time
        you stake new OVEN in the pool.
      </Text>
    </>,
    { placement: 'bottom-start' },
  )

  const { secondsRemaining, hasUnstakingFee } = useWithdrawalFeeTimer(
    parseInt(lastDepositedTime, 10),
    parseInt(withdrawalFeePeriod, 10),
  )

  // The user has made a deposit, but has no fee
  const noFeeToPay = lastDepositedTime && !hasUnstakingFee

  // Show the timer if a user is connected, has deposited, and has an unstaking fee
  const shouldShowTimer = account && lastDepositedTime && hasUnstakingFee

  const getRowText = () => {
    if (noFeeToPay) {
      return 'unstaking fee'
    }
    if (shouldShowTimer) {
      return 'unstaking fee until'
    }
    return 'unstaking fee if withdrawn within 72h'
  }

  // targetRef - text (replacement for TooltipText)
  return (
    <Flex alignItems="center" justifyContent="space-between">
      {tooltipVisible && tooltip}
      <Text ref={targetRef} small> 
        {noFeeToPay ? '0' : feeAsDecimal}% {getRowText()}
      </Text>
      {shouldShowTimer && <WithdrawalFeeTimer secondsRemaining={secondsRemaining} />}
    </Flex>
  )
}

export default UnstakingFeeCountdownRow
