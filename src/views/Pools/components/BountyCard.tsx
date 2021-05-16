import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Text, Flex, Button, Heading, Skeleton, useModal, useTooltip, HelpIcon, Box } from 'easybake-uikit'
import useGetVaultFees from 'hooks/ovenVault/useGetVaultFees'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useGetVaultBountyInfo from 'hooks/ovenVault/useGetVaultBountyInfo'
import BountyModal from './BountyModal'

const StyledCard = styled(Card)`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 240px;
  }
`

const InlineText = styled(Text)`
  display: inline;
`

const BountyCard = () => {
  const { estimatedOvenBountyReward, estimatedDollarBountyReward, totalPendingOvenHarvest } = useGetVaultBountyInfo()
  const { callFee } = useGetVaultFees()
  const [bounties, setBounties] = useState({
    modalOvenBountyToDisplay: '',
    cardOvenBountyToDisplay: '',
    dollarBountyToDisplay: '',
  })

  useEffect(() => {
    if (estimatedOvenBountyReward && estimatedDollarBountyReward && totalPendingOvenHarvest) {
      setBounties({
        modalOvenBountyToDisplay: getFullDisplayBalance(estimatedOvenBountyReward, 18, 5),
        cardOvenBountyToDisplay: getFullDisplayBalance(estimatedOvenBountyReward, 18, 3),
        dollarBountyToDisplay: getFullDisplayBalance(estimatedDollarBountyReward, 18, 2),
      })
    }
  }, [estimatedOvenBountyReward, estimatedDollarBountyReward, totalPendingOvenHarvest])

  const TooltipComponent = () => (
    <>
      <Text mb="16px">This bounty is given as a reward for providing a service to other users.</Text>
      <Text mb="16px">
        Whenever you successfully claim the bounty, you’re also helping out by activating the Auto OVEN Pool’s
        compounding function for everyone.
      </Text>
      <Text style={{ fontWeight: 'bold' }}>
        Auto-Compound Bounty: {callFee / 100} of all Auto OVEN pool users’ pending yield.
      </Text>
    </>
  )

  const [onPresentBountyModal] = useModal(
    <BountyModal
      ovenBountyToDisplay={bounties.modalOvenBountyToDisplay}
      dollarBountyToDisplay={bounties.dollarBountyToDisplay}
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
              <Heading>{bounties.cardOvenBountyToDisplay || <Skeleton height={20} width={96} mb="2px" />}</Heading>
              <InlineText fontSize="12px" color="textSubtle">
                {bounties.dollarBountyToDisplay ? (
                  `~ ${bounties.dollarBountyToDisplay} USD`
                ) : (
                  <Skeleton height={16} width={62} />
                )}
              </InlineText>
            </Flex>
            <Button
              disabled={!bounties.dollarBountyToDisplay || !bounties.cardOvenBountyToDisplay || !callFee}
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
