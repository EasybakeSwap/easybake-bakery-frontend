import React from 'react'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceOvenUsdt } from 'state/hooks'
import { Text } from 'easybake-uikit'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'bignumber.js'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import CardValue from './CardValue'
import CardUsdtValue from './CardUsdtValue'

const Block = styled.div`
  margin-bottom: 24px;
`

interface OvenWinningsProps {
  claimAmount: BigNumber
}

const OvenWinnings: React.FC<OvenWinningsProps> = ({ claimAmount }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const ovenAmount = getBalanceNumber(claimAmount)
  const ovenPriceUsdt = usePriceOvenUsdt()
  const claimAmountBusd = new BigNumber(ovenAmount).multipliedBy(ovenPriceUsdt).toNumber()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '76px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <CardValue value={ovenAmount} lineHeight="1.5" />
      {ovenPriceUsdt.gt(0) && <CardUsdtValue value={claimAmountBusd} decimals={2} />}
    </Block>
  )
}

export default OvenWinnings
