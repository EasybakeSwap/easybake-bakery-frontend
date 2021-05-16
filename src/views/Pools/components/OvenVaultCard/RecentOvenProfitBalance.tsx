import React from 'react'
import BigNumber from 'bignumber.js'
import { useTooltip, Text } from 'easybake-uikit' // disabled: TooltipText
import { getFullDisplayBalance } from 'utils/formatBalance'
import { convertSharesToOven } from '../../helpers'

interface RecentOvenProfitBalanceProps {
  ovenAtLastUserAction: BigNumber
  userShares: BigNumber
  pricePerFullShare: BigNumber
}

const RecentOvenProfitBalance: React.FC<RecentOvenProfitBalanceProps> = ({
  ovenAtLastUserAction,
  userShares,
  pricePerFullShare,
}) => {
  const currentSharesAsOven = convertSharesToOven(userShares, pricePerFullShare)
  const ovenProfit = currentSharesAsOven.ovenAsBigNumber.minus(ovenAtLastUserAction)
  const ovenToDisplay = ovenProfit.gte(0) ? getFullDisplayBalance(ovenProfit, 18, 5) : '0'

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    'Your estimated earnings since last manual stake or unstake:',
    { placement: 'bottom-end' },
  )

  return (
    <>
      {tooltipVisible && tooltip}
      <Text ref={targetRef} small>
      {ovenToDisplay}
      </Text>
    </>
  )
}

export default RecentOvenProfitBalance
