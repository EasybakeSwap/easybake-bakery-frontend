import React from 'react'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceOvenUsdc } from 'state/hooks'
import { Text } from 'easybake-uikit'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'bignumber.js'
import styled from 'styled-components'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 24px;
`

interface OvebWinningsProps {
  claimAmount: BigNumber
}

const OvenWinnings: React.FC<OvebWinningsProps> = ({ claimAmount }) => {
  const { account } = useWeb3React()
  const ovenAmount = getBalanceNumber(claimAmount)
  const ovenPriceBusd = usePriceOvenUsdc()
  const claimAmountBusd = new BigNumber(ovenAmount).multipliedBy(ovenPriceBusd).toNumber()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '76px' }}>
        Locked
      </Text>
    )
  }

  return (
    <Block>
      <CardValue value={ovenAmount} lineHeight="1.5" />
      {!ovenPriceBusd.eq(0) && <CardBusdValue value={claimAmountBusd} decimals={2} />}
    </Block>
  )
}

export default OvenWinnings
