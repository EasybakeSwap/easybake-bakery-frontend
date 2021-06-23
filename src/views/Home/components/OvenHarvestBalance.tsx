import React from 'react'
import { Text } from 'easybake-uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'

import useAllEarnings from 'hooks/useAllEarnings'
import { usePriceOvenUsdc } from 'state/hooks'
import styled from 'styled-components'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import CardValue from './CardValue'
import CardUsdtValue from './CardUsdtValue'

const Block = styled.div`
  margin-bottom: 24px;
`

const OvenHarvestBalance = () => {
  
  const { account } = useWeb3React()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    const earningNumber = new BigNumber(earning)
    if (earningNumber.eq(0)) {
      return accum
    }
    return accum + earningNumber.div(DEFAULT_TOKEN_DECIMAL).toNumber()
  }, 0)
  const ovenPriceUsdc = usePriceOvenUsdc()
  const earningsUsdt = new BigNumber(earningsSum).multipliedBy(ovenPriceUsdc).toNumber()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '76px' }}>
        {('Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <CardValue value={earningsSum} lineHeight="1.5" />
      {ovenPriceUsdc.gt(0) && <CardUsdtValue value={earningsUsdt} />}
    </Block>
  )
}

export default OvenHarvestBalance
