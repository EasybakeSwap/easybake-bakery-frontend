import React, { useMemo } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Heading, Flex } from 'easybake-uikit' // disabled: Image
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import usePersistState from 'hooks/usePersistState'
import { usePools, useBlock } from 'state/hooks'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import PageHeader from 'components/PageHeader'
import PoolCard from './components/PoolCard'
import OvenVaultCard from './components/OvenVaultCard'
import PoolTabButtons from './components/PoolTabButtons'
// import BountyCard from './components/BountyCard'

const Pools: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWeb3React()
  const pools = usePools(account)
  const { currentBlock } = useBlock()
  const [stakedOnly, setStakedOnly] = usePersistState(false, 'easybake_pool_staked')

  const [finishedPools, openPools] = useMemo(
    () => partition(pools, (pool) => pool.isFinished || currentBlock > pool.endBlock),
    [currentBlock, pools],
  )
  const stakedOnlyFinishedPools = useMemo(
    () => finishedPools.filter((pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)),
    [finishedPools],
  )
  const stakedOnlyOpenPools = useMemo(
    () => openPools.filter((pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)),
    [openPools],
  )
  const hasStakeInFinishedPools = stakedOnlyFinishedPools.length > 0

  // This pool is passed explicitly to the oven vault
  const ovenPoolData = useMemo(() => openPools.find((pool) => pool.sousId === 0), [openPools])

  return (
    <>
      <PageHeader>
        <Flex justifyContent="space-between" flexDirection={['column', null, 'row']}>
          <Flex flexDirection="column" mr={['8px', 0]}>
            <Heading as="h1" size="xxl" color="violet" mb="24px">
              SUGAR REFINERY
            </Heading>
            <Heading size="md" color="text">
              Simply refine your tokens to earn SUGAR.
            </Heading>
            <Heading size="md" color="text">
              High APR, low risk.
            </Heading>
          </Flex>
          <Flex height="fit-content" justifyContent="center" alignItems="center" mt={['24px', null, '0']}>
            {/* <BountyCard /> */}
          </Flex>
        </Flex>
      </PageHeader>
      <Page>
        <PoolTabButtons
          stakedOnly={stakedOnly}
          setStakedOnly={setStakedOnly}
          hasStakeInFinishedPools={hasStakeInFinishedPools}
        />
        <FlexLayout>
          <Route exact path={`${path}`}>
            <>
              <OvenVaultCard pool={ovenPoolData} showStakedOnly={stakedOnly} />
              {stakedOnly
                ? orderBy(stakedOnlyOpenPools, ['sortOrder']).map((pool) => (
                    <PoolCard key={pool.sousId} pool={pool} account={account} />
                  ))
                : orderBy(openPools, ['sortOrder']).map((pool) => (
                    <PoolCard key={pool.sousId} pool={pool} account={account} />
                  ))}
            </>
          </Route>
          <Route path={`${path}/history`}>
            {stakedOnly
              ? orderBy(stakedOnlyFinishedPools, ['sortOrder']).map((pool) => (
                  <PoolCard key={pool.sousId} pool={pool} account={account} />
                ))
              : orderBy(finishedPools, ['sortOrder']).map((pool) => (
                  <PoolCard key={pool.sousId} pool={pool} account={account} />
                ))}
          </Route>
        </FlexLayout>
        {/* <Image
          mx="auto"
          mt="12px"
          src="/images/3d-syrup-bunnies.png"
          alt="Pancake illustration"
          width={192}
          height={184.5}
        /> */}
      </Page>
    </>
  )
}

export default Pools
