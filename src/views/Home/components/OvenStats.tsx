import React from 'react'
import { Card, CardBody, Heading, Text } from 'easybake-uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'

import { getOvenAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledOvenStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const OvenStats = () => {
  
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getOvenAddress()))
  const ovenSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  return (
    <StyledOvenStats>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {('Oven Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{('Total OVEN Supply')}</Text>
          {ovenSupply && <CardValue fontSize="14px" value={ovenSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">{('Total OVEN Burned')}</Text>
          <CardValue fontSize="14px" decimals={0} value={burnedBalance} />
        </Row>
        <Row>
          <Text fontSize="14px">{('New OVEN/block')}</Text>
          <CardValue fontSize="14px" decimals={0} value={20} />
        </Row>
      </CardBody>
    </StyledOvenStats>
  )
}

export default OvenStats
