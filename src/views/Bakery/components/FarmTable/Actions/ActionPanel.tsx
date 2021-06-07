import React from 'react'
import styled from 'styled-components'
import { LinkExternal, Flex } from 'easybake-uikit'
import { FarmWithStakedValue } from 'views/Bakery/components/FarmCard/FarmCard'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'

import HarvestAction from './HarvestAction'
import StakedAction from './StakedAction'
// import Apr, { AprProps } from '../Apr'
// import Multiplier, { MultiplierProps } from '../Multiplier'
// import Liquidity, { LiquidityProps } from '../Liquidity'

export interface ActionPanelProps {
  // apr: AprProps
  // multiplier: MultiplierProps
  // liquidity: LiquidityProps
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

// const StakeContainer = styled.div`
//   color: ${({ theme }) => theme.colors.text};
//   align-items: center;
//   display: flex;
//   justify-content: space-between;

//   ${({ theme }) => theme.mediaQueries.sm} {
//     justify-content: flex-start;
//   }
// `

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

// const ValueContainer = styled.div`
//   display: block;

//   ${({ theme }) => theme.mediaQueries.lg} {
//     display: none;
//   }
// `

// const ValueWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin: 4px 0px;
// `

// disabled: apr, multiplier, liquidity
const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({ details }) => {
  const farm = details

  // const isActive = farm.multiplier !== '0X'
  const { quoteToken, token } = farm
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('EASYBAKE', '')
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const addLiquidityUrl = `https://swap.easybake.finance/#/add/${liquidityUrlPathParts}`
  const lpAddress = farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const etherscanAddress = `https://etherscan.com/address/${lpAddress}`
  const infoAddress = `https://info.easybake.finance//pair/${lpAddress}`

  return (
    <Container>
      <InfoContainer>
        <Flex justifyContent="center">
          <StyledLinkExternal href={addLiquidityUrl}>Get {lpLabel} Tokens</StyledLinkExternal>
        </Flex>
        <Flex justifyContent="center">
          <StyledLinkExternal href={etherscanAddress} bold={false}>
            View Etherscan Contract
          </StyledLinkExternal>
        </Flex>
        <Flex justifyContent="center">
          <StyledLinkExternal href={infoAddress}>See Pair Info</StyledLinkExternal>
        </Flex>
      </InfoContainer>
      {/* <ValueContainer>
        <ValueWrapper>
          <Text>APR</Text>
          <Apr {...apr} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>Multiplier</Text>
          <Multiplier {...multiplier} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>Liquidity</Text>
          <Liquidity {...liquidity} />
        </ValueWrapper>
      </ValueContainer> */}
      <ActionContainer>
        <HarvestAction {...farm} />
        <StakedAction {...farm} />
      </ActionContainer>
    </Container>
  )
}

export default ActionPanel
