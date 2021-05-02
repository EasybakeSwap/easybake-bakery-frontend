import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Text } from 'easybake-uikit'

const StyledTotalValueLockedCard = styled(Card)`
  background-image: url('/images/lilac.png');
  margin-left: auto;
  margin-right: auto;
`

const LaunchDetailsCard = () => {
  return (
    <StyledTotalValueLockedCard style={{ textAlign: 'center' }}>
      <CardBody>
        <Heading size="md" mb="12px">
          Launch Details
        </Heading>
        <a href="https://view.monday.com/1095099231-236887ea96824ef7051147cef14a9f2a?r=use1">
          <Text color="textSubtle">Progress Tracker</Text>
        </a>

        <a href="https://easybake.medium.com/introducing-easybake-finance-e8f704a36e41">
          <Text color="textSubtle">Introduction</Text>
        </a>

        <a href="https://forum.easybake.finance/c/tokenomics/6">
          <Text color="textSubtle">Tokenomics</Text>
        </a>

        <a href="https://forum.easybake.finance">
          <Text color="textSubtle">Forum</Text>
        </a>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default LaunchDetailsCard
