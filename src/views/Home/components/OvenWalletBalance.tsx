import React from 'react'
import { Text } from 'easybakeswap-uikit' // UPDATE
import { useWallet } from '@binance-chain/bsc-use-wallet' // UPDATE
import useTokenBalance from 'hooks/useTokenBalance'
import { getOvenAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from './CardValue'

const OvenWalletBalance = () => {
  const ovenBalance = useTokenBalance(getOvenAddress())
  const { account } = useWallet()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '36px' }}>
        Locked
      </Text>
    )
  }

  return <CardValue value={getBalanceNumber(ovenBalance)} fontSize="24px" />
}

export default OvenWalletBalance
