import React from 'react'
import styled from 'styled-components'
import { Flex, Heading, Image } from '@pancakeswap-libs/uikit' // disabled `Tag`

export interface ExpandableSectionProps {
  lpLabel?: string
  // multiplier?: string
  // isCommunityFarm?: boolean
  farmImage?: string
  tokenSymbol?: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 4px;
  }
`

// const MultiplierTag = styled(Tag)`
//   margin-left: 4px;
// `

// disabled: multiplier, isCommunityFarm,
const CardHeading: React.FC<ExpandableSectionProps> = ({ lpLabel, farmImage, tokenSymbol }) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <Image src={`/images/farms/${farmImage}.svg`} alt={tokenSymbol} width={64} height={64} />
      <Flex flexDirection="column" alignItems="flex-end">
        <Heading mb="4px">{lpLabel.split(' ')[0]}</Heading>
        <Flex justifyContent="center">{/* <MultiplierTag variant="secondary">{multiplier}</MultiplierTag> */}</Flex>
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
