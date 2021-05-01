import React from 'react'
import { Text } from 'easybake-uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import useAllEarnings from 'hooks/useAllEarnings'
// import { usePriceOvenUsdc } from 'state/hooks'
import styled from 'styled-components'
import CardValue from './CardValue'
// import CardBusdValue from './CardBusdValue'

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
    let displayedAmount = amount;

    if(amount > 0 && amount < 0.001) {
      displayedAmount = '<0.001'
    }  
    
    return displayedAmount
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
      <CardValue value={earningsSum.toLocaleString() } lineHeight="1.5"/>
      {/* {!ovenPriceUsdc.eq(0) && <CardBusdValue value={earningsUsdc} />} */}
    </Block>
  )
}

export default OvenHarvestBalance
