/* eslint-disable */
import React from 'react'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex, Box } from 'easybake-uikit'
import { tokenEarnedPerThousandDollarsCompounding, getRoi } from 'utils/compoundApyHelpers'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  tokenPrice: number
  apr: number
  linkLabel: string
  linkHref: string
  earningTokenSymbol?: string
  roundingDecimals?: number
  compoundFrequency?: number
  performanceFee?: number
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 12px;
`

const GridItem = styled.div``

const GridHeaderItem = styled.div`
  max-width: 180px;
`

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({
  onDismiss,
  tokenPrice,
  apr,
  linkLabel,
  linkHref,
  earningTokenSymbol = 'OVEN',
  roundingDecimals = 2,
  compoundFrequency = 1,
  performanceFee = 0,
}) => {
  
  const oneThousandDollarsWorthOfToken = 1000 / tokenPrice

  const tokenEarnedPerThousand1D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 1,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand7D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 7,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand30D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 30,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand365D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 365,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })

  return (
    <Modal title={('ROI')} onDismiss={onDismiss}>
      <Grid>
        <GridHeaderItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="12px">
            Timeframe
          </Text>
        </GridHeaderItem>
        <GridHeaderItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mr="12px" ml="12px" mb="12px">
            ROI
          </Text>
        </GridHeaderItem>
        <GridHeaderItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="12px">
            { earningTokenSymbol } per $1,000
          </Text>
        </GridHeaderItem>
        {/* 1 day row */}
        <GridItem>
          <Text> 1 </Text>
        </GridItem>
        <GridItem>
          <Text mr="12px" ml="12px">
            {getRoi({ amountEarned: tokenEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfToken }).toFixed(
              roundingDecimals,
            )}
            %
          </Text>
        </GridItem>
        <GridItem>
          <Text>{tokenEarnedPerThousand1D}</Text>
        </GridItem>
        {/* 7 day row */}
        <GridItem>
          <Text> 7 </Text>
        </GridItem>
        <GridItem>
          <Text mr="12px" ml="12px">
            {getRoi({ amountEarned: tokenEarnedPerThousand7D, amountInvested: oneThousandDollarsWorthOfToken }).toFixed(
              roundingDecimals,
            )}
            %
          </Text>
        </GridItem>
        <GridItem>
          <Text>{tokenEarnedPerThousand7D}</Text>
        </GridItem>
        {/* 30 day row */}
        <GridItem>
          <Text> 30 </Text>
        </GridItem>
        <GridItem>
          <Text mr="12px" ml="12px">
            {getRoi({
              amountEarned: tokenEarnedPerThousand30D,
              amountInvested: oneThousandDollarsWorthOfToken,
            }).toFixed(roundingDecimals)}
            %
          </Text>
        </GridItem>
        <GridItem>
          <Text>{tokenEarnedPerThousand30D}</Text>
        </GridItem>
        {/* 365 day / APY row */}
        <GridItem style={{ maxWidth: '180px' }}>
          <Text>{('365D(APY)')}</Text>
        </GridItem>
        <GridItem>
          <Text mr="12px" ml="12px">
            {getRoi({
              amountEarned: tokenEarnedPerThousand365D,
              amountInvested: oneThousandDollarsWorthOfToken,
            }).toFixed(roundingDecimals)}
            %
          </Text>
        </GridItem>
        <GridItem>
          <Text>{tokenEarnedPerThousand365D}</Text>
        </GridItem>
      </Grid>
      <Flex justifyContent="center">
        <Box mb="28px" maxWidth="280px">
          <Text fontSize="12px" textAlign="center" color="textSubtle">
            
              'Calculated based on current rates. Compounding daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns: ',
              { compoundFrequency }
            
          </Text>
          {performanceFee > 0 && (
            <Text mt="14px" fontSize="12px" textAlign="center" color="textSubtle">
              All estimated rates take into account this pool’s performance fee: { performanceFee }
            </Text>
          )}
        </Box>
      </Flex>
      <Flex justifyContent="center">
        <LinkExternal href={linkHref}>{linkLabel}</LinkExternal>
      </Flex>
    </Modal>
  )
}

export default ApyCalculatorModal
