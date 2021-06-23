import React from 'react'
import { Flex, Text } from 'easybake-uikit'
import { useWeb3React } from '@web3-react/core'

import { useOvenVault, usePriceOvenUsdc } from 'state/hooks'
import { getOvenVaultEarnings } from 'views/Pools/helpers'
import RecentOvenProfitBalance from './RecentOvenProfitBalance'

const RecentOvenProfitCountdownRow = () => {
  
  const { account } = useWeb3React()
  const {
    pricePerFullShare,
    userData: { ovenAtLastUserAction, userShares, lastUserActionTime },
  } = useOvenVault()
  const ovenPriceBusd = usePriceOvenUsdc()
  const { hasAutoEarnings, autoOvenToDisplay, autoUsdToDisplay } = getOvenVaultEarnings(
    account,
    ovenAtLastUserAction,
    userShares,
    pricePerFullShare,
    ovenPriceBusd.toNumber(),
  )

  const lastActionInMs = lastUserActionTime && parseInt(lastUserActionTime) * 1000
  const dateTimeLastAction = new Date(lastActionInMs)
  const dateStringToDisplay = dateTimeLastAction.toLocaleString()

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="14px">{`${('Recent OVEN profit')}:`}</Text>
      {hasAutoEarnings && (
        <RecentOvenProfitBalance
          ovenToDisplay={autoOvenToDisplay}
          dollarValueToDisplay={autoUsdToDisplay}
          dateStringToDisplay={dateStringToDisplay}
        />
      )}
    </Flex>
  )
}

export default RecentOvenProfitCountdownRow
