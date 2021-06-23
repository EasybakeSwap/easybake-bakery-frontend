import React from 'react'
import { Flex, Text, IconButton, AddIcon, MinusIcon, useModal, Skeleton } from 'easybake-uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { Pool } from 'state/types'
import { useOvenVault, usePriceOvenUsdc } from 'state/hooks'
import Balance from 'components/Balance'
import NotEnoughTokensModal from '../../PoolCard/Modals/NotEnoughTokensModal'
import { convertSharesToOven } from '../../../helpers'
import VaultStakeModal from '../VaultStakeModal'

interface HasStakeActionProps {
  pool: Pool
  stakingTokenBalance: BigNumber
}

const HasSharesActions: React.FC<HasStakeActionProps> = ({ pool, stakingTokenBalance }) => {
  const {
    userData: { userShares },
    pricePerFullShare,
  } = useOvenVault()
  const { stakingToken } = pool
  const { ovenAsBigNumber, ovenAsNumberBalance } = convertSharesToOven(userShares, pricePerFullShare)
  const ovenPriceUsdc = usePriceOvenUsdc()
  const stakedDollarValue = ovenPriceUsdc.gt(0)
    ? getBalanceNumber(ovenAsBigNumber.multipliedBy(ovenPriceUsdc), stakingToken.decimals)
    : 0

  const [onPresentTokenRequired] = useModal(<NotEnoughTokensModal tokenSymbol={stakingToken.symbol} />)
  const [onPresentStake] = useModal(<VaultStakeModal stakingMax={stakingTokenBalance} pool={pool} />)
  const [onPresentUnstake] = useModal(<VaultStakeModal stakingMax={ovenAsBigNumber} pool={pool} isRemovingStake />)

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column">
        <Balance fontSize="20px" bold value={ovenAsNumberBalance} decimals={5} />
        <Text fontSize="12px" color="textSubtle">
          {ovenPriceUsdc.gt(0) ? (
            <Balance value={stakedDollarValue} fontSize="12px" color="textSubtle" decimals={2} prefix="~" unit=" USD" />
          ) : (
            <Skeleton mt="1px" height={16} width={64} />
          )}
        </Text>
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
