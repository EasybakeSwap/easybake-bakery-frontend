import React from 'react'
import styled from 'styled-components'
import { Skeleton, Text, useTooltip, HelpIcon, Flex, Box, useModal, useMatchBreakpoints } from 'easybake-uikit'
import { Pool } from 'state/types'
import BigNumber from 'bignumber.js'
import { PoolCategory } from 'config/constants/types'
import { BIG_ZERO } from 'utils/bigNumber'
import { formatNumber, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import Balance from 'components/Balance'
import { useOvenVault } from 'state/hooks'

import { getOvenVaultEarnings } from 'views/Pools/helpers'
import BaseCell, { CellContent } from './BaseCell'
import CollectModal from '../../PoolCard/Modals/CollectModal'

interface EarningsCellProps {
  pool: Pool
  account: string
  userDataLoaded: boolean
}

const StyledCell = styled(BaseCell)`
  flex: 4.5;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex: 1 0 120px;
  }
`

const HelpIconWrapper = styled.div`
  align-self: center;
`

const EarningsCell: React.FC<EarningsCellProps> = ({ pool, account, userDataLoaded }) => {
  
  const { isXs, isSm } = useMatchBreakpoints()
  const { sousId, earningToken, poolCategory, userData, earningTokenPrice, isAutoVault } = pool
  const isManualOvenPool = sousId === 0

  const earnings = userData?.pendingReward ? new BigNumber(userData.pendingReward) : BIG_ZERO
  // These will be reassigned later if its Auto OVEN vault
  let earningTokenBalance = getBalanceNumber(earnings, earningToken.decimals)
  let earningTokenDollarBalance = getBalanceNumber(earnings.multipliedBy(earningTokenPrice), earningToken.decimals)
  let hasEarnings = account && earnings.gt(0)
  const fullBalance = getFullDisplayBalance(earnings, earningToken.decimals)
  const formattedBalance = formatNumber(earningTokenBalance, 3, 3)
  const earningsDollarValue = formatNumber(earningTokenDollarBalance)
  const isEthPool = poolCategory === PoolCategory.ETH

  // Auto OVEN vault calculations
  const {
    userData: { ovenAtLastUserAction, userShares, lastUserActionTime },
    pricePerFullShare,
  } = useOvenVault()
  const { hasAutoEarnings, autoOvenToDisplay, autoUsdToDisplay } = getOvenVaultEarnings(
    account,
    ovenAtLastUserAction,
    userShares,
    pricePerFullShare,
    earningTokenPrice,
  )

  const lastActionInMs = lastUserActionTime && parseInt(lastUserActionTime) * 1000
  const dateTimeLastAction = new Date(lastActionInMs)
  const dateStringToDisplay = dateTimeLastAction.toLocaleString()

  const labelText = isAutoVault ? t('Recent OVEN profit') : t('%asset% Earned', { asset: earningToken.symbol })
  earningTokenBalance = isAutoVault ? autoOvenToDisplay : earningTokenBalance
  hasEarnings = isAutoVault ? hasAutoEarnings : hasEarnings
  earningTokenDollarBalance = isAutoVault ? autoUsdToDisplay : earningTokenDollarBalance

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Balance fontSize="16px" value={autoOvenToDisplay} decimals={3} bold unit=" OVEN" />
      <Balance fontSize="16px" value={autoUsdToDisplay} decimals={2} bold prefix="~$" />
      {('Earned since your last action')}
      <Text>{dateStringToDisplay}</Text>
    </>,
    { placement: 'bottom' },
  )

  const [onPresentCollect] = useModal(
    <CollectModal
      formattedBalance={formattedBalance}
      fullBalance={fullBalance}
      earningToken={earningToken}
      earningsDollarValue={earningsDollarValue}
      sousId={sousId}
      isEthPool={isEthPool}
      isCompoundPool={isManualOvenPool}
    />,
  )

  const handleEarningsClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    onPresentCollect()
  }

  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="textSubtle" textAlign="left">
          {labelText}
        </Text>
        {!userDataLoaded && account ? (
          <Skeleton width="80px" height="16px" />
        ) : (
          <>
            {tooltipVisible && tooltip}
            <Flex>
              <Box mr="8px" height="32px" onClick={!isAutoVault && hasEarnings ? handleEarningsClick : undefined}>
                <Balance
                  mt="4px"
                  bold={!isXs && !isSm}
                  fontSize={isXs || isSm ? '14px' : '16px'}
                  color={hasEarnings ? 'primary' : 'textDisabled'}
                  decimals={hasEarnings ? 5 : 1}
                  value={hasEarnings ? earningTokenBalance : 0}
                />
                {hasEarnings ? (
                  <Balance
                    display="inline"
                    fontSize="12px"
                    color={hasEarnings ? 'textSubtle' : 'textDisabled'}
                    decimals={2}
                    value={earningTokenDollarBalance}
                    unit=" USD"
                    prefix="~"
                  />
                ) : (
                  <Text mt="4px" fontSize="12px" color={hasEarnings ? 'textSubtle' : 'textDisabled'}>
                    0 USD
                  </Text>
                )}
              </Box>
              {isAutoVault && hasEarnings && !isXs && !isSm && (
                <HelpIconWrapper ref={targetRef}>
                  <HelpIcon color="textSubtle" />
                </HelpIconWrapper>
              )}
            </Flex>
          </>
        )}
      </CellContent>
    </StyledCell>
  )
}

export default EarningsCell