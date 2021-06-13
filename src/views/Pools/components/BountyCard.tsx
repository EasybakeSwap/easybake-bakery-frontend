import React, { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  Text,
  Flex,
  HelpIcon,
  Button,
  Heading,
  Skeleton,
  useModal,
  Box,
  useTooltip,
} from 'easybake-uikit'

import { getBalanceNumber } from 'utils/formatBalance'
import { useOvenVault, usePriceOvenUsdc } from 'state/hooks'
import Balance from 'components/Balance'
import BountyModal from './BountyModal'

const StyledCard = styled(Card)`
  width: 100%;
  flex: 1;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 240px;
  }
`

const BountyCard = () => {
  
  const {
    estimatedOvenBountyReward,
    totalPendingOvenHarvest,
    fees: { callFee },
  } = useOvenVault()
  const ovenPriceUsdc = usePriceOvenUsdc()

  const estimatedDollarBountyReward = useMemo(() => {
    return new BigNumber(estimatedOvenBountyReward).multipliedBy(ovenPriceUsdc)
  }, [ovenPriceUsdc, estimatedOvenBountyReward])

  const hasFetchedDollarBounty = estimatedDollarBountyReward.gte(0)
  const hasFetchedCakeBounty = estimatedOvenBountyReward ? estimatedOvenBountyReward.gte(0) : false
  const dollarBountyToDisplay = hasFetchedDollarBounty ? getBalanceNumber(estimatedDollarBountyReward, 18) : 0
  const ovenBountyToDisplay = hasFetchedCakeBounty ? getBalanceNumber(estimatedOvenBountyReward, 18) : 0

  const TooltipComponent = () => (
    <>
      <Text mb="16px">This bounty is given as a reward for providing a service to other users.</Text>
      <Text mb="16px">
      Whenever you successfully claim the bounty, you’re also helping out by activating the Auto OVEN Pool’s compounding function for everyone.
      </Text>
      <Text style={{ fontWeight: 'bold' }}>
        {('Auto-Compound Bounty: %fee%% of all Auto OVEN pool users pending yield' + { fee: callFee / 100 })}
      </Text>
    </>
  )

  const [onPresentBountyModal] = useModal(
    <BountyModal
      ovenBountyToDisplay={ovenBountyToDisplay}
      dollarBountyToDisplay={dollarBountyToDisplay}
      totalPendingOvenHarvest={totalPendingOvenHarvest}
      callFee={callFee}
      TooltipComponent={TooltipComponent}
    />,
  )

  const { targetRef, tooltip, tooltipVisible } = useTooltip(<TooltipComponent />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })

  return (
    <>
      {tooltipVisible && tooltip}
      <StyledCard>
        <CardBody>
          <Flex flexDirection="column">
            <Flex alignItems="center" mb="12px">
              <Text fontSize="16px" bold color="textSubtle" mr="4px">
                Auto OVEN Bounty
              </Text>
              <Box ref={targetRef}>
                <HelpIcon color="textSubtle" />
              </Box>
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex flexDirection="column" mr="12px">
              <Heading>
                {hasFetchedCakeBounty ? (
                  <Balance fontSize="20px" bold value={ovenBountyToDisplay} decimals={3} />
                ) : (
                  <Skeleton height={20} width={96} mb="2px" />
                )}
              </Heading>
              {hasFetchedDollarBounty ? (
                <Balance
                  fontSize="12px"
                  color="textSubtle"
                  value={dollarBountyToDisplay}
                  decimals={2}
                  unit=" USD"
                  prefix="~"
                />
              ) : (
                <Skeleton height={16} width={62} />
              )}
            </Flex>
            <Button
              disabled={!dollarBountyToDisplay || !ovenBountyToDisplay || !callFee}
              onClick={onPresentBountyModal}
              scale="sm"
            >
              Claim
            </Button>
          </Flex>
        </CardBody>
      </StyledCard>
    </>
  )
}

export default BountyCard
