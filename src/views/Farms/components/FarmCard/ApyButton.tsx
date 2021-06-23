import React from 'react'
import BigNumber from 'bignumber.js'
import { IconButton, useModal, CalculateIcon } from 'easybake-uikit'
import ApyCalculatorModal from 'components/ApyCalculatorModal'


export interface ApyButtonProps {
  lpLabel?: string
  ovenPrice?: BigNumber
  apr?: number
  addLiquidityUrl?: string
}

const ApyButton: React.FC<ApyButtonProps> = ({ lpLabel, ovenPrice, apr, addLiquidityUrl }) => {
  
  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal
      linkLabel={'Get LP'}
      tokenPrice={ovenPrice.toNumber()}
      apr={apr}
      linkHref={addLiquidityUrl}
    />,
  )

  const handleClickButton = (event): void => {
    event.stopPropagation()
    onPresentApyModal()
  }

  return (
    <IconButton onClick={handleClickButton} variant="text" scale="sm" ml="4px">
      <CalculateIcon width="18px" />
    </IconButton>
  )
}

export default ApyButton