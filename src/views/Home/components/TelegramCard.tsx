import React from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from '@pancakeswap-libs/uikit'
import pools from 'config/constants/pools'
import { Pool } from 'state/types'

const StyledFarmStakingCard = styled(Card)`
  background: linear-gradient(#53dee9, #7645d9);
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
const TelegramCard = () => {
  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="contrast" size="lg">
          Stay informed
        </Heading>
        <CardMidContent color="invertedContrast">DAILY</CardMidContent>
        <Flex justifyContent="space-between">
          <Heading color="contrast" size="lg">
            in our Telegram.
          </Heading>
          <a href = 'https://t.me/EasyBakeSwap' >
            <ArrowForwardIcon mt={30} color="primary" />
          </a>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default TelegramCard
