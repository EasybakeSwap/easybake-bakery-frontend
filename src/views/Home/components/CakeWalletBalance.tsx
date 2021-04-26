import React from 'react'
import { Text } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getOvenAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceOvenUsdc } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const OvenWalletBalance = () => {
  const TranslateString = useI18n()
  const ovenBalance = useTokenBalance(getOvenAddress())
  const ovenPriceUsdc = usePriceOvenUsdc()
  const busdBalance = new BigNumber(getBalanceNumber(ovenBalance)).multipliedBy(ovenPriceUsdc).toNumber()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '54px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={getBalanceNumber(ovenBalance)} decimals={4} fontSize="24px" lineHeight="36px" />
      {!ovenPriceUsdc.eq(0) ? <CardBusdValue value={busdBalance} /> : <br />}
    </>
  )
}

export default OvenWalletBalance
