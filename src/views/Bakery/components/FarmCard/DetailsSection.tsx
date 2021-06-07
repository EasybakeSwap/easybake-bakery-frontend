import React from 'react'
import styled from 'styled-components'
import { Flex, LinkExternal } from 'easybake-uikit'

export interface ExpandableSectionProps {
  etherscanAddress?: string
  infoAddress?: string
  removed?: boolean
  totalValueFormatted?: string
  lpLabel?: string
  addLiquidityUrl?: string
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  etherscanAddress,
  infoAddress,
  removed,
  // totalValueFormatted,
  lpLabel,
  addLiquidityUrl,
}) => {
  
  return (
    <Wrapper>
        {!removed && (
          <Flex justifyContent="center">
          <StyledLinkExternal href={addLiquidityUrl}>Get {lpLabel} Tokens</StyledLinkExternal>
        </Flex>
        )}
        <Flex justifyContent="center">
          <StyledLinkExternal href={etherscanAddress} bold={false}>
          View Etherscan Contract
          </StyledLinkExternal>
        </Flex>
        <Flex justifyContent="center">
          <StyledLinkExternal href={infoAddress}>See Pair Info</StyledLinkExternal>
        </Flex>
      {/* <Flex justifyContent="space-between">
        <Text>Total Liquidity:</Text>
        <Text>{totalValueFormatted}</Text>
      </Flex> */}
    </Wrapper>
  )
}

export default DetailsSection
