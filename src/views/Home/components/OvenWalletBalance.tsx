import React from 'react'
import { Text } from 'easybakeswap-uikit' // UPDATE
import { useWallet } from '@binance-chain/bsc-use-wallet' // UPDATE
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getOvenAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from './CardValue'

const OvenWalletBalance = () => {
  const TranslateString = useI18n()
  const ovenBalance = useTokenBalance(getOvenAddress())
  const { account } = useWallet()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '36px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return <CardValue value={getBalanceNumber(ovenBalance)} fontSize="24px" />
}

export default OvenWalletBalance
