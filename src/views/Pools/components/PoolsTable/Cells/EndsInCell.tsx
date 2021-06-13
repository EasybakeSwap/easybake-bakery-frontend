import React from 'react'
import styled from 'styled-components'
import { Flex, Link, Skeleton, Text, TimerIcon } from 'easybake-uikit'
import { getErcScanBlockCountdownUrl } from 'utils/ercscan'
import { Pool } from 'state/types'
import { useTime } from 'state/hooks'
import Balance from 'components/Balance'

import { getPoolBlockInfo } from 'views/Pools/helpers'
import BaseCell, { CellContent } from './BaseCell'

interface FinishCellProps {
  pool: Pool
}

const StyledCell = styled(BaseCell)`
  flex: 2 0 100px;
`

const EndsInCell: React.FC<FinishCellProps> = ({ pool }) => {
  const { sousId, totalStaked, endTime, isFinished } = pool
  const { currentTime } = useTime()
  

  const { shouldShowBlockCountdown, timeUntilStart, timeRemaining, hasPoolStarted, blocksToDisplay } =
    getPoolBlockInfo(pool, currentTime)

  const isOvenPool = sousId === 0

  const renderBlocks = shouldShowBlockCountdown ? (
    <Flex alignItems="center">
      <Flex flex="1.3">
        <Balance fontSize="16px" value={blocksToDisplay} decimals={0} />
        <Text ml="4px" textTransform="lowercase">
          {('Blocks')}
        </Text>
      </Flex>
      <Flex flex="1">
        <Link external href={getErcScanBlockCountdownUrl(endTime)} onClick={(e) => e.stopPropagation()}>
          <TimerIcon ml="4px" />
        </Link>
      </Flex>
    </Flex>
  ) : (
    <Text>-</Text>
  )

  // A bit hacky way to determine if public data is loading relying on totalStaked
  // Opted to go for this since we don't really need a separate publicDataLoaded flag
  // anywhere else
  const isLoadingPublicData = !totalStaked.gt(0) || !currentTime || (!timeRemaining && !timeUntilStart)
  const showLoading = isLoadingPublicData && !isOvenPool && !isFinished
  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="textSubtle" textAlign="left">
          {hasPoolStarted || !shouldShowBlockCountdown ? ('Ends in') : ('Starts in')}
        </Text>
        {showLoading ? <Skeleton width="80px" height="16px" /> : renderBlocks}
      </CellContent>
    </StyledCell>
  )
}

export default EndsInCell
