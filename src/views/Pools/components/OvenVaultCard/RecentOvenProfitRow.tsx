import React from 'react'
import BigNumber from 'bignumber.js'
import { Flex, Text } from 'easybake-uikit'
import { useWeb3React } from '@web3-react/core'
import RecentOvenProfitBalance from './RecentOvenProfitBalance'

interface RecentCakeProfitRowProps {
  ovenAtLastUserAction: BigNumber
  userShares: BigNumber
  pricePerFullShare: BigNumber
}

const RecentCakeProfitCountdownRow: React.FC<RecentCakeProfitRowProps> = ({
  ovenAtLastUserAction,
  userShares,
  pricePerFullShare,
}) => {
  const { account } = useWeb3React()
  const shouldDisplayOvenProfit =
    account && ovenAtLastUserAction && ovenAtLastUserAction.gt(0) && userShares && userShares.gt(0)

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="14px">Recent OVEN profit:</Text>
      {shouldDisplayOvenProfit && (
        <RecentOvenProfitBalance
          ovenAtLastUserAction={ovenAtLastUserAction}
          userShares={userShares}
          pricePerFullShare={pricePerFullShare}
        />
      )}
    </Flex>
  )
}

export default RecentCakeProfitCountdownRow
