import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from 'easybakeswap-uikit'
import { useGetStats } from 'hooks/api'

// const StyledTotalValueLockedCard = styled(Card)`
//   align-items: center;
//   display: flex;
//   flex: 1;
// `
const StyledTotalValueLockedCard = styled(Card)`
  background-image: url('/images/lilac.png');
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

const TotalValueLockedCard = () => {
  const data = useGetStats()
  const tvl = data ? data.total_value_locked_all.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  return (
    <StyledTotalValueLockedCard style={{ textAlign: 'center' }}>
      <CardBody>
        <Heading size="lg" mb="24px">
          Total Value Locked (TVL)
        </Heading>
        {data ? (
          <>
            <Heading size="xl">{`$${tvl}`}</Heading>
            <Text color="textSubtle">{'Across all LPs and Sugar Pools'}</Text>
          </>
        ) : (
          <>
            <Skeleton height={66} />
          </>
        )}
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
