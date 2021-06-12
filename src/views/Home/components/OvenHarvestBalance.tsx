import React from 'react'
import { Text } from 'easybake-uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import useAllEarnings from 'hooks/useAllEarnings'
// import { usePriceOvenUsdc } from 'state/hooks'
import styled from 'styled-components'
import CardValue from './CardValue'
// import CardUsdcValue from './CardUsdcValue'

const Block = styled.div`
  margin-bottom: -8px;
`

const TextPosition = styled.div`
  position: relative;
  top: 5px;
`

const OvenHarvestBalance = () => {
  const { account } = useWeb3React()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    const amount = accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
    return amount;
  }, 0)
  // const ovenPriceUsdc = usePriceOvenUsdc()
  // const earningsUsdc = new BigNumber(earningsSum).multipliedBy(ovenPriceUsdc).toNumber()

  if (!account) {
    return (
      <TextPosition>
        <Text color="textDisabled" style={{ lineHeight: '60px' }}>
          Locked
        </Text>
      </TextPosition>
    )
  }

  return (
    <Block>
      <CardValue value={earningsSum} lineHeight="1.5"/>
      {/* {!ovenPriceUsdc.eq(0) && <CardUsdcValue value={earningsUsdc} />} */}
    </Block>
  )
}

export default OvenHarvestBalance
