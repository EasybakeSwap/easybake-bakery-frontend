import React from 'react'
import styled from 'styled-components'
import { HelpIcon, Text, useTooltip } from 'easybake-uikit'
import BigNumber from 'bignumber.js'

const ReferenceElement = styled.div`
  display: inline-block;
`

export interface LiquidityProps {
  liquidity: BigNumber
}

const LiquidityWrapper = styled.div`
  min-width: 110px;
  font-weight: 600;
  text-align: right;
  margin-right: 14px;

  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: left;
    margin-right: 0;
  }
`

const DisabledText = styled.div`
  color: ${({ theme }) => theme.colors.textDisabled};
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Liquidity: React.FunctionComponent<LiquidityProps> = ({ liquidity }) => {
  const displayLiquidity = liquidity
    ? `$${Number(liquidity).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : <DisabledText>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</DisabledText>
    const { targetRef, tooltip, tooltipVisible } = useTooltip(
      'The total value of the funds in this farm’s liquidity pool',
      { placement: 'top-end', tooltipOffset: [20, 10] },
    )

  return (
    <Container>
      <LiquidityWrapper>
        <Text>{displayLiquidity}</Text>
      </LiquidityWrapper>
      <ReferenceElement ref={targetRef}>
        <HelpIcon color="textSubtle" />
      </ReferenceElement>
      {tooltipVisible && tooltip}
    </Container>
  )
}

export default Liquidity
