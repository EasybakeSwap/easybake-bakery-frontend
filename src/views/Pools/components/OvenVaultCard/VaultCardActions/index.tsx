import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Flex, Text, Box } from 'easybake-uikit'
import { useWeb3React } from '@web3-react/core'
import { useOvenContract, useOvenVaultContract } from 'hooks/useContract'
import { BIG_ZERO } from 'utils/bigNumber'
import { VaultFees } from 'hooks/ovenVault/useGetVaultFees'
import { Pool } from 'state/types'
import { VaultUser } from 'views/Pools/types'
import VaultApprovalAction from './VaultApprovalAction'
import VaultStakeActions from './VaultStakeActions'

const InlineText = styled(Text)`
  display: inline;
`

const OvenVaultCardActions: React.FC<{
  pool: Pool
  userInfo: VaultUser
  pricePerFullShare: BigNumber
  stakingTokenPrice: number
  accountHasSharesStaked: boolean
  lastUpdated: number
  vaultFees: VaultFees
  isLoading: boolean
  setLastUpdated: () => void
}> = ({
  pool,
  userInfo,
  pricePerFullShare,
  stakingTokenPrice,
  accountHasSharesStaked,
  lastUpdated,
  vaultFees,
  isLoading,
  setLastUpdated,
}) => {
  const { account } = useWeb3React()
  const { stakingToken, userData } = pool
  const [isVaultApproved, setIsVaultApproved] = useState(false)
  const ovenContract = useOvenContract()
  const ovenVaultContract = useOvenVaultContract()
  const stakingTokenBalance = userData?.stakingTokenBalance ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO

  useEffect(() => {
    const checkApprovalStatus = async () => {
      try {
        const response = await ovenContract.methods.allowance(account, ovenVaultContract.options.address).call()
        const currentAllowance = new BigNumber(response)
        setIsVaultApproved(currentAllowance.gt(0))
      } catch (error) {
        setIsVaultApproved(false)
      }
    }

    checkApprovalStatus()
  }, [account, ovenContract, ovenVaultContract, lastUpdated])

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column">
        <Box display="inline">
          <InlineText
            color={accountHasSharesStaked ? 'secondary' : 'textSubtle'}
            textTransform="uppercase"
            bold
            fontSize="12px"
          >
            {accountHasSharesStaked ? stakingToken.symbol : 'stake'}
          </InlineText>
          <InlineText
            color={accountHasSharesStaked ? 'textSubtle' : 'secondary'}
            textTransform="uppercase"
            bold
            fontSize="12px"
          >
            {accountHasSharesStaked ? 'staked (compounding)' : `${stakingToken.symbol}`}
          </InlineText>
        </Box>
        {isVaultApproved ? (
          <VaultStakeActions
            isLoading={isLoading}
            pool={pool}
            stakingTokenBalance={stakingTokenBalance}
            stakingTokenPrice={stakingTokenPrice}
            vaultFees={vaultFees}
            userInfo={userInfo}
            pricePerFullShare={pricePerFullShare}
            accountHasSharesStaked={accountHasSharesStaked}
            setLastUpdated={setLastUpdated}
          />
        ) : (
          <VaultApprovalAction pool={pool} isLoading={isLoading} setLastUpdated={setLastUpdated} />
        )}
      </Flex>
    </Flex>
  )
}

export default OvenVaultCardActions
