import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Link, LinkExternal } from 'easybakeswap-uikit'

export interface ExpandableSectionProps {
  ercScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  addLiquidityUrl?: string
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  ercScanAddress,
  removed,
  totalValueFormated,
  lpLabel,
  addLiquidityUrl,
}) => {
  return (
    <Wrapper>
      <Flex justifyContent="center">
        <Text>Get LP Tokens:&nbsp;</Text>
        <StyledLinkExternal href={addLiquidityUrl}>{lpLabel}</StyledLinkExternal>
      </Flex>
      {/* {!removed && (
        <Flex justifyContent="space-between">
          Total Liquidity
          <Text>{totalValueFormated}</Text>
        </Flex>
      )} */}
      <Flex justifyContent="center" >
        <Link external href={ercScanAddress} bold={false}>
         View {lpLabel} on Etherscan
        </Link>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
