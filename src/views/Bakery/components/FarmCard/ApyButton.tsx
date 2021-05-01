import React from 'react'
import BigNumber from 'bignumber.js'
import { IconButton, useModal, CalculateIcon } from 'easybake-uikit'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import useI18n from 'hooks/useI18n'

export interface ApyButtonProps {
  lpLabel?: string
  ovenPrice?: BigNumber
  apr?: number
  addLiquidityUrl?: string
}

const ApyButton: React.FC<ApyButtonProps> = ({ lpLabel, ovenPrice, apr, addLiquidityUrl }) => {
  const TranslateString = useI18n()
  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal
      linkLabel={`${TranslateString(999, 'Get')} ${lpLabel}`}
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
