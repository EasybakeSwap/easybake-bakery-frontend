import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex } from 'easybakeswap-uikit'
import { calculateOvenEarnedPerThousandDollars, apyModalRoi } from 'utils/compoundApyHelpers'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  lpLabel?: string
  ovenPrice?: BigNumber
  apy?: BigNumber
  addLiquidityUrl?: string
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 24px;
`

const GridItem = styled.div`
  margin-bottom: '10px';
`

const Description = styled(Text)`
  max-width: 320px;
  margin-bottom: 28px;
`

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({
  onDismiss,
  lpLabel,
  ovenPrice,
  apy,
  addLiquidityUrl,
}) => {
  const farmApy = apy.times(new BigNumber(100)).toNumber()
  const oneThousandDollarsWorthOfOven = 1000 / ovenPrice.toNumber()

  const ovenEarnedPerThousand1D = calculateOvenEarnedPerThousandDollars({ numberOfDays: 1, farmApy, ovenPrice })
  const ovenEarnedPerThousand7D = calculateOvenEarnedPerThousandDollars({ numberOfDays: 7, farmApy, ovenPrice })
  const ovenEarnedPerThousand30D = calculateOvenEarnedPerThousandDollars({ numberOfDays: 30, farmApy, ovenPrice })
  const ovenEarnedPerThousand365D = calculateOvenEarnedPerThousandDollars({ numberOfDays: 365, farmApy, ovenPrice })

  return (
    <Modal title="ROI" onDismiss={onDismiss}>
      <Grid>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            Timeframe
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
           ROI 
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
          OVEN per $1000
          </Text>
        </GridItem>
        {/* 1 day row */}
        <GridItem>
          <Text>1D</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: ovenEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfOven })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{ovenEarnedPerThousand1D}</Text>
        </GridItem>
        {/* 7 day row */}
        <GridItem>
          <Text>7D</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: ovenEarnedPerThousand7D, amountInvested: oneThousandDollarsWorthOfOven })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{ovenEarnedPerThousand7D}</Text>
        </GridItem>
        {/* 30 day row */}
        <GridItem>
          <Text>30D</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: ovenEarnedPerThousand30D, amountInvested: oneThousandDollarsWorthOfOven })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{ovenEarnedPerThousand30D}</Text>
        </GridItem>
        {/* 365 day / APY row */}
        <GridItem>
          <Text>365D(APY)</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: ovenEarnedPerThousand365D, amountInvested: oneThousandDollarsWorthOfOven })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{ovenEarnedPerThousand365D}</Text>
        </GridItem>
      </Grid>
      <Description fontSize="12px" color="textSubtle">
          Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.
      </Description>
      <Flex justifyContent="center">
        <LinkExternal href={addLiquidityUrl}>
          Get {lpLabel}
        </LinkExternal>
      </Flex>
    </Modal>
  )
}

export default ApyCalculatorModal
