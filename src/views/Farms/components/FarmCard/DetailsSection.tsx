import React from 'react'

import styled from 'styled-components'
import { Text, Flex, LinkExternal, Skeleton } from 'easybake-uikit'

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
  totalValueFormatted,
  lpLabel,
  addLiquidityUrl,
}) => {
  

  return (
    <Wrapper>
      <Flex justifyContent="space-between">
        <Text>{('Total Liquidity')}:</Text>
        {totalValueFormatted ? <Text>{totalValueFormatted}</Text> : <Skeleton width={75} height={25} />}
      </Flex>
      {!removed && (
        <StyledLinkExternal href={addLiquidityUrl}> GET LP </StyledLinkExternal>
      )}
      <StyledLinkExternal href={etherscanAddress}>{('View Contract')}</StyledLinkExternal>
      <StyledLinkExternal href={infoAddress}>{('See Pair Info')}</StyledLinkExternal>
    </Wrapper>
  )
}

export default DetailsSection
