import React from 'react'
import { Text } from 'easybake-uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'

import { getOvenAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceOvenUsdc } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardUsdcValue from './CardUsdcValue'

const OvenWalletBalance = () => {
  
  const { balance: ovenBalance } = useTokenBalance(getOvenAddress())
  const ovenPriceUsdc = usePriceOvenUsdc()
  const busdBalance = new BigNumber(getBalanceNumber(ovenBalance)).multipliedBy(ovenPriceUsdc).toNumber()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '54px' }}>
        {('Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={getBalanceNumber(ovenBalance)} decimals={4} fontSize="24px" lineHeight="36px" />
      {ovenPriceUsdc.gt(0) ? <CardUsdcValue value={busdBalance} /> : <br />}
    </>
  )
}

export default OvenWalletBalance
