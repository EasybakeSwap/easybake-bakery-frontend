import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex } from 'easybake-uikit'


const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  transition: brightness 0.2s;
  
  &:hover {
    filter: brightness(125%);
    cursor: pointer;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`
const MediumCard = () => {
  return (
    <StyledFarmStakingCard onClick={() => window.open('https://easybake.medium.com','_blank')}>
      <CardBody>
        <Heading color="contrast" size="lg">
          Discover our
        </Heading>
        <CardMidContent color="violet">
        UTILITY
        </CardMidContent>
        <Flex justifyContent="space-between">
          <Heading color="contrast" size="lg">
            in our Medium.
          </Heading>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default MediumCard
