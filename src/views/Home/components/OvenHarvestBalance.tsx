import React from 'react'
import { Text } from 'easybakeswap-uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useAllEarnings from 'hooks/useAllEarnings'
import CardValue from './CardValue'

const OvenHarvestBalance = () => {
  const { account } = useWallet()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '60px' }}>
        Locked
      </Text>
    )
  }

  return <CardValue value={earningsSum} />
}

export default OvenHarvestBalance
