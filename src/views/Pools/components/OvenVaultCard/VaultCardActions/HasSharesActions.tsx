import React from 'react'
import { Flex, Text, IconButton, AddIcon, MinusIcon, Heading, useModal, Skeleton } from 'easybake-uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber, formatNumber } from 'utils/formatBalance'
import { Pool } from 'state/types'
import { VaultFees } from 'hooks/ovenVault/useGetVaultFees'
import { VaultUser } from 'views/Pools/types'
import NotEnoughTokensModal from '../../PoolCard/Modals/NotEnoughTokensModal'
import { convertSharesToOven } from '../../../helpers'
import VaultStakeModal from '../VaultStakeModal'

interface HasStakeActionProps {
  pool: Pool
  stakingTokenBalance: BigNumber
  stakingTokenPrice: number
  userInfo: VaultUser
  pricePerFullShare: BigNumber
  vaultFees: VaultFees
  setLastUpdated: () => void
}

const HasSharesActions: React.FC<HasStakeActionProps> = ({
  pool,
  stakingTokenBalance,
  stakingTokenPrice,
  userInfo,
  pricePerFullShare,
  vaultFees,
  setLastUpdated,
}) => {
  const { stakingToken } = pool
  const { ovenAsBigNumber, ovenAsDisplayBalance } = convertSharesToOven(userInfo.shares, pricePerFullShare)

  const stakedDollarValue = formatNumber(
    getBalanceNumber(ovenAsBigNumber.multipliedBy(stakingTokenPrice), stakingToken.decimals),
  )

  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)

  const [onPresentStake] = useModal(
    <VaultStakeModal
      stakingMax={stakingTokenBalance}
      pool={pool}
      userInfo={userInfo}
      stakingTokenPrice={stakingTokenPrice}
      setLastUpdated={setLastUpdated}
    />,
  )

  const [onPresentUnstake] = useModal(
    <VaultStakeModal
      stakingMax={ovenAsBigNumber}
      pool={pool}
      stakingTokenPrice={stakingTokenPrice}
      pricePerFullShare={pricePerFullShare}
      userInfo={userInfo}
      vaultFees={vaultFees}
      setLastUpdated={setLastUpdated}
      isRemovingStake
    />,
  )

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column">
        <Heading>{ovenAsDisplayBalance}</Heading>
        <Text fontSize="12px" color="textSubtle">{`~${
          stakingTokenPrice ? stakedDollarValue : <Skeleton mt="1px" height={16} width={64} />
        } USD`}</Text>
      </Flex>
      <Flex>
        <IconButton variant="secondary" onClick={onPresentUnstake} mr="6px">
          <MinusIcon color="primary" width="24px" />
        </IconButton>
        <IconButton variant="secondary" onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}>
          <AddIcon color="primary" width="24px" height="24px" />
        </IconButton>
      </Flex>
    </Flex>
  )
}

export default HasSharesActions
