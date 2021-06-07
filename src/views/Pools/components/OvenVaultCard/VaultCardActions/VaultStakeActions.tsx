import React from 'react'
import { Flex, Button, useModal, Skeleton } from 'easybake-uikit'
import BigNumber from 'bignumber.js'
import { Pool } from 'state/types'
import { VaultFees } from 'hooks/ovenVault/useGetVaultFees'
import { VaultUser } from 'views/Pools/types'
import NotEnoughTokensModal from '../../PoolCard/Modals/NotEnoughTokensModal'
import VaultStakeModal from '../VaultStakeModal'
import HasSharesActions from './HasSharesActions'

interface VaultStakeActionsProps {
  pool: Pool
  stakingTokenBalance: BigNumber
  stakingTokenPrice: number
  userInfo: VaultUser
  accountHasSharesStaked: boolean
  pricePerFullShare: BigNumber
  isLoading?: boolean
  vaultFees: VaultFees
  setLastUpdated: () => void
}

const VaultStakeActions: React.FC<VaultStakeActionsProps> = ({
  pool,
  stakingTokenBalance,
  stakingTokenPrice,
  userInfo,
  accountHasSharesStaked,
  pricePerFullShare,
  isLoading = false,
  vaultFees,
  setLastUpdated,
}) => {
  const { stakingToken } = pool
  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)
  const [onPresentStake] = useModal(
    <VaultStakeModal
      stakingMax={stakingTokenBalance}
      stakingTokenPrice={stakingTokenPrice}
      userInfo={userInfo}
      pool={pool}
      setLastUpdated={setLastUpdated}
    />,
  )

  const renderStakeAction = () => {
    return accountHasSharesStaked ? (
      <HasSharesActions
        pool={pool}
        stakingTokenBalance={stakingTokenBalance}
        stakingTokenPrice={stakingTokenPrice}
        userInfo={userInfo}
        pricePerFullShare={pricePerFullShare}
        setLastUpdated={setLastUpdated}
        vaultFees={vaultFees}
      />
    ) : (
      <Button onClick={stakingTokenBalance.gt(0) ? onPresentStake : onPresentTokenRequired}>Stake</Button>
    )
  }

  return <Flex flexDirection="column">{isLoading ? <Skeleton width="100%" height="52px" /> : renderStakeAction()}</Flex>
}

export default VaultStakeActions
