import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'

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
  const TranslateString = useI18n()
  const data = useGetStats()
  const tvl = data ? data.total_value_locked_all.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  return (
    <StyledTotalValueLockedCard style={{ textAlign: 'center' }}>
      <CardBody>
        <Heading size="md" mb="12px">
          Launch Details
        </Heading>
        {data ? (
          <>
            <a href='https://view.monday.com/1095099231-236887ea96824ef7051147cef14a9f2a?r=use1'>
              <Text color="textSubtle">Progress Tracker</Text>
            </a>

            <a href='https://easybake.medium.com/introducing-easybake-finance-e8f704a36e41'>
              <Text color="textSubtle">Introduction</Text>
            </a>
            
            <a href='https://forum.easybake.finance/c/tokenomics/6'>
              <Text color="textSubtle">Tokenomics</Text>
            </a>

            <a href='https://forum.easybake.finance'>
              <Text color="textSubtle">Forum</Text>
            </a>

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
