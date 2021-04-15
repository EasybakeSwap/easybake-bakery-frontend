import React from 'react'
import { Card, CardBody, Heading, Text } from 'easybakeswap-uikit' // UPDATE
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { getOvenAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledOvenStats = styled(Card)`
  background-image: url('/images/lilac.png');
  margin-left: auto;
  margin-right: auto;
  min-height: 120px;
`

const Row = styled.div`
  align-items: center;
  display: center;
  font-size: 18px;
  justify-content: space-between;
  margin-bottom: 2px;
`

const OvenStats = () => {
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getOvenAddress())
  const ovenSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0

  return (
    <StyledOvenStats style={{ textAlign: 'center' }}>
      <CardBody>
        <Heading size="lg" mb="24px">
          Oven Token Stats
        </Heading>
        <Row>
          <CardValue fontSize="24px" value={ovenSupply} />
          <Text fontSize="12px">Total OVEN Supply</Text>
        </Row>
        <Row>
          <CardValue fontSize="24px" value={getBalanceNumber(burnedBalance)} />
          <Text fontSize="12px">Total OVEN Burned</Text>
        </Row>
        <Row>
          <CardValue fontSize="24px" decimals={0} value={14} />
          <Text fontSize="12px">OVEN per Block</Text>
        </Row>
      </CardBody>
    </StyledOvenStats>
  )
}

export default OvenStats
