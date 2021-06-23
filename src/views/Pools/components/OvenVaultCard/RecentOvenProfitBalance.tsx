import React from 'react'
import { Text, TooltipText, useTooltip } from 'easybake-uikit'

import Balance from 'components/Balance'

interface RecentOvenProfitBalanceProps {
  ovenToDisplay: number
  dollarValueToDisplay: number
  dateStringToDisplay: string
}

const RecentOvenProfitBalance: React.FC<RecentOvenProfitBalanceProps> = ({
  ovenToDisplay,
  dollarValueToDisplay,
  dateStringToDisplay,
}) => {
  

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Balance fontSize="16px" value={ovenToDisplay} decimals={3} bold unit=" OVEN" />
      <Balance fontSize="16px" value={dollarValueToDisplay} decimals={2} bold prefix="~$" />
      {('Earned since your last action')}
      <Text>{dateStringToDisplay}</Text>
    </>,
    {
      placement: 'bottom-end',
    },
  )

  return (
    <>
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef} small>
        <Balance fontSize="14px" value={ovenToDisplay} />
      </TooltipText>
    </>
  )
}

export default RecentOvenProfitBalance
