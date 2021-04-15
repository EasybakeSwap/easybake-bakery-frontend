import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from 'easybakeswap-uikit' // UPDATE
import { NavLink } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'
import { useFarms, usePriceEthUsd } from 'state/hooks'
import { BLOCKS_PER_YEAR, OVEN_PER_BLOCK, OVEN_POOL_PID } from 'config'

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
const EarnAPYCard = () => {
  const farmsLP = useFarms()
  const ethPrice = usePriceEthUsd

  const maxAPY = useRef(Number.MIN_VALUE)

  const getHighestAPY = () => {
    const activeFarms = farmsLP.filter((farm) => farm.pid !== 1000 && farm.multiplier !== '0X')

    calculateAPY(activeFarms)

    return (maxAPY.current * 100).toLocaleString('en-US').slice(0, -1)
  }

  const calculateAPY = useCallback(
    (farmsToDisplay) => {
      const ovenPriceVsETH = new BigNumber(farmsLP.find((farm) => farm.pid === OVEN_POOL_PID)?.tokenPriceVsQuote || 0)

      farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const ovenRewardPerBlock = OVEN_PER_BLOCK.times(farm.poolWeight)
        const ovenRewardPerYear = ovenRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = ovenPriceVsETH.times(ovenRewardPerYear).div(farm.lpTotalInQuoteToken)

        if (farm.quoteTokenSymbol === QuoteToken.OVEN) {
          apy = ovenRewardPerYear.div(farm.lpTotalInQuoteToken)
        } else if (farm.dual) {
          const ovenApy =
            farm && ovenPriceVsETH.times(ovenRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)
          const dualApy =
            farm.tokenPriceVsQuote &&
            new BigNumber(farm.tokenPriceVsQuote)
              .times(farm.dual.rewardPerBlock)
              .times(BLOCKS_PER_YEAR)
              .div(farm.lpTotalInQuoteToken)

          apy = ovenApy && dualApy && ovenApy.plus(dualApy)
        }

        if (maxAPY.current < apy.toNumber()) maxAPY.current = apy.toNumber()

        return apy
      })
    },
    [ethPrice, farmsLP],
  )

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="contrast" size="lg">
          Discover our
        </Heading>
        <CardMidContent color="#7645d9">
          {getHighestAPY() ? (
            `${getHighestAPY()}% ${'APR'}`
          ) : (
            `UTILITY`// <Skeleton animation="pulse" variant="rect" height="44px" />
          )}
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

export default EarnAPYCard
