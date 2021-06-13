import React, { useMemo } from 'react'
import { Flex, Skeleton, Text } from 'easybake-uikit'
import styled from 'styled-components'

import BigNumber from 'bignumber.js'
import Balance from 'components/Balance'
import { Pool } from 'state/types'
import { useOvenVault } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import BaseCell, { CellContent } from './BaseCell'

interface TotalStakedCellProps {
  pool: Pool
}

const StyledCell = styled(BaseCell)`
  flex: 2 0 100px;
`

const TotalStakedCell: React.FC<TotalStakedCellProps> = ({ pool }) => {
  
  const { sousId, stakingToken, totalStaked, isAutoVault } = pool
  const { totalOvenInVault } = useOvenVault()

  const isManualOvenPool = sousId === 0

  const totalStakedBalance = useMemo(() => {
    if (isAutoVault) {
      return getBalanceNumber(totalOvenInVault, stakingToken.decimals)
    }
    if (isManualOvenPool) {
      const manualOvenTotalMinusAutoVault = new BigNumber(totalStaked).minus(totalOvenInVault)
      return getBalanceNumber(manualOvenTotalMinusAutoVault, stakingToken.decimals)
    }
    return getBalanceNumber(totalStaked, stakingToken.decimals)
  }, [isAutoVault, totalOvenInVault, isManualOvenPool, totalStaked, stakingToken.decimals])

  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="textSubtle" textAlign="left">
          {('Total staked')}
        </Text>
        {totalStakedBalance ? (
          <Flex height="100%" alignItems="center">
            <Balance fontSize="16px" value={totalStakedBalance} decimals={0} unit={` ${stakingToken.symbol}`} />
          </Flex>
        ) : (
          <Skeleton width="80px" height="16px" />
        )}
      </CellContent>
    </StyledCell>
  )
}

export default TotalStakedCell
