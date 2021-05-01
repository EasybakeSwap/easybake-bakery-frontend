import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from 'easybake-uikit'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`
const ForumCard = () => {
  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="contrast" size="lg">
          Help us bake up
        </Heading>
        <CardMidContent color="violet">
          LIMITLESS
        </CardMidContent>
        <Flex justifyContent="space-between">
          <Heading color="contrast" size="lg">
            possibilities.
          </Heading>
          <a href = 'https://forum.easybake.finance' >
            <ArrowForwardIcon mt={30} color="primary" />
          </a>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default ForumCard
