import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from '@pancakeswap-libs/uikit'


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
const MediumCard = () => {
  return (
    <StyledFarmStakingCard>
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
          <a href = 'https://easybake.medium.com' >
            <ArrowForwardIcon mt={30} color="primary" />
          </a>
          {/* <NavLink exact activeClassName="active" to="/bakery" id="farm-apy-cta">
            <ArrowForwardIcon mt={30} color="primary" />
          </NavLink> */}
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default MediumCard
