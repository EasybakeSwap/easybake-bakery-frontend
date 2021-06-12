import React from 'react'
import { Text } from 'easybake-uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import { getOvenAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
// import { usePriceOvenUsdc } from 'state/hooks'
// import { BigNumber } from 'bignumber.js'
import styled from 'styled-components'
import CardValue from './CardValue'
// import CardUsdcValue from './CardUsdcValue'

const Block = styled.div`
  margin-bottom: 0px;
`

const TextPosition = styled.div`
  position: relative;
  top: 5px;
`

const OvenWalletBalance = () => {
  const ovenBalance = useTokenBalance(getOvenAddress())
  // const ovenPriceUsdc = usePriceOvenUsdc()
  // const usdcBalance = new BigNumber(getBalanceNumber(ovenBalance)).multipliedBy(ovenPriceUsdc).toNumber()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <TextPosition>
        <Text color="textDisabled" style={{ lineHeight: '50px' }}>
          Locked
        </Text>
      </TextPosition>
    )
  }

  return (
    <Block>
      <CardValue value={getBalanceNumber(ovenBalance)} decimals={4} fontSize="24px" lineHeight="36px" />
      {/* {!ovenPriceUsdc.eq(0) ? <CardUsdcValue value={usdcBalance} /> : <br />} */}
    </Block>
  )
}

export default OvenWalletBalance
