import React from 'react'
import { Card, CardBody, Heading, Text } from 'easybakeswap-uikit' // UPDATE
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
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
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getOvenAddress())
  const ovenSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0

  return (
    <StyledOvenStats style={{ textAlign: 'center' }}>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'Oven Token Stats')}
        </Heading>
        <Row>
          <CardValue fontSize="24px" value={ovenSupply} />
          <Text fontSize="12px">{TranslateString(536, 'Total OVEN Supply')}</Text>
        </Row>
        <Row>
          <CardValue fontSize="24px" value={getBalanceNumber(burnedBalance)} />
          <Text fontSize="12px">{TranslateString(538, 'Total OVEN Burned')}</Text>
        </Row>
        <Row>
          <CardValue fontSize="24px" decimals={0} value={40} />
          <Text fontSize="12px">{TranslateString(540, 'OVEN per Block')}</Text>
        </Row>
      </CardBody>
    </StyledOvenStats>
  )
}

export default OvenStats
