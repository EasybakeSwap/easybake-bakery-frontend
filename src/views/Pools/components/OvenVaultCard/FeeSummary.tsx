import React from 'react'
import { Text, Flex, useTooltip, TooltipText } from 'easybake-uikit'

import { useOvenVault } from 'state/hooks'
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'

interface FeeSummaryProps {
  stakingTokenSymbol: string
  stakeAmount: string
}

const FeeSummary: React.FC<FeeSummaryProps> = ({ stakingTokenSymbol, stakeAmount }) => {
  
  const {
    fees: { withdrawalFee },
  } = useOvenVault()
  const feeAsDecimal = withdrawalFee / 100
  const feeInOven = (parseFloat(stakeAmount) * (feeAsDecimal / 100)).toFixed(4)
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Text bold mb="4px">
        Unstaking fee: { feeAsDecimal }
      </Text>
      <Text>
          Only applies within 3 days of staking. Unstaking after 3 days will not include a fee. Timer resets every time you stake new OVEN in the pool.'
      </Text>
    </>,
    { placement: 'top-start' },
  )

  return (
    <>
      <Flex mt="24px" alignItems="center" justifyContent="space-between">
        {tooltipVisible && tooltip}
        <TooltipText ref={targetRef} small>
          {('Unstaking Fee')}
        </TooltipText>
        <Text fontSize="14px">
          {stakeAmount ? feeInOven : '-'} {stakingTokenSymbol}
        </Text>
      </Flex>
      <UnstakingFeeCountdownRow />
    </>
  )
}

export default FeeSummary
