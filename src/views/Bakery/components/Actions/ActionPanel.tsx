import React from 'react'
import styled from 'styled-components'
import { LinkExternal, Text } from 'easybakeswap-uikit'
import { FarmWithStakedValue } from 'views/Bakery/components/FarmCard/FarmCard'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'

import HarvestAction from './HarvestAction'
// import StakedAction from './StakedAction'
// import Apr, { AprProps } from '../FarmTable/Apr'
import Multiplier, { MultiplierProps } from '../FarmTable/Multiplier'
import Liquidity, { LiquidityProps } from '../FarmTable/Liquidity'

export interface ActionPanelProps {
  // apr: AprProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 24px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const StakeContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const InfoContainer = styled.div`
  min-width: 200px;
`

const ValueContainer = styled.div`
  display: block;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({ details, multiplier, liquidity }) => {
  const farm = details

  const isActive = farm.multiplier !== '0X'
  // const { quoteToken, token, dual } = farm
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  // const liquidityUrlPathParts = getLiquidityUrlPathParts({
  //   quoteTokenAddress: quoteToken.address,
  //   tokenAddress: token.address,
  // })
  const lpAddress = farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const etherscan = `https://etherscan.com/address/${lpAddress}`
  // const info = `https://pancakeswap.info/pair/${lpAddress}`

  return (
    <Container>
      <InfoContainer>
        {isActive && (
          <StakeContainer>
            {/* <StyledLinkExternal href={`https://exchange.pancakeswap.finance/#/add/${liquidityUrlPathParts}`}>
              Get ${lpLabel}, {lpLabel}
            </StyledLinkExternal> */}
          </StakeContainer>
        )}
        <StyledLinkExternal href={etherscan}>View Contract</StyledLinkExternal>
        {/* <StyledLinkExternal href={info}>See Pair Info</StyledLinkExternal> */}
      </InfoContainer>
      <ValueContainer>
        <ValueWrapper>
          <Text>APR</Text>
          {/* <Apr {...apr} /> */}
        </ValueWrapper>
        <ValueWrapper>
          <Text>Multiplier</Text>
          {/* <Multiplier {...multiplier} /> */}
        </ValueWrapper>
        <ValueWrapper>
          <Text>Liquidity</Text>
          {/* <Liquidity {...liquidity} /> */}
        </ValueWrapper>
      </ValueContainer>
      <ActionContainer>
        <HarvestAction {...farm} />
        {/* <StakedAction {...farm} /> */}
      </ActionContainer>
    </Container>
  )
}

export default ActionPanel
