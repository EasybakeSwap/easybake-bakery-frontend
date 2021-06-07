import React from 'react'
import { Text, Flex, useTooltip } from 'easybake-uikit' // disabled: TooltipText
import { VaultFees } from 'hooks/ovenVault/useGetVaultFees'
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'

interface FeeSummaryProps {
  stakingTokenSymbol: string
  lastDepositedTime: string
  vaultFees: VaultFees
  stakeAmount: string
}

const FeeSummary: React.FC<FeeSummaryProps> = ({ stakingTokenSymbol, lastDepositedTime, vaultFees, stakeAmount }) => {
  const feeAsDecimal = parseInt(vaultFees.withdrawalFee) / 100
  const feeInOven = (parseFloat(stakeAmount) * (feeAsDecimal / 100)).toFixed(4)
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
    { placement: 'top-start' },
  )

  // targetRef - text (replacement for TooltipText)
  return (
    <>
      <Flex mt="24px" alignItems="center" justifyContent="space-between">
        {tooltipVisible && tooltip}
        <Text ref={targetRef} small>
          Unstaking Fee
        </Text>
        <Text fontSize="14px">
          {stakeAmount ? feeInOven : '-'} {stakingTokenSymbol}
        </Text>
      </Flex>
      <UnstakingFeeCountdownRow
        withdrawalFee={vaultFees.withdrawalFee}
        withdrawalFeePeriod={vaultFees.withdrawalFeePeriod}
        lastDepositedTime={lastDepositedTime}
      />
    </>
  )
}

export default FeeSummary