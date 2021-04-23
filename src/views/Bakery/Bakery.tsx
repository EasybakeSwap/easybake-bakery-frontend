import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Heading, RowType } from 'easybakeswap-uikit'
import { BLOCKS_PER_YEAR, OVEN_PER_BLOCK, OVEN_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import styled from 'styled-components'
// import { orderBy } from 'lodash'
import { getBalanceNumber } from 'utils/formatBalance'
import weth from 'config/constants/contracts'
import farms from 'config/constants/farms'

import Page from 'components/layout/Page'
import { useFarms, usePriceEthUsdc, usePriceOvenUsdc } from 'state/hooks'
import usePersistState from 'hooks/usePersistState'
import useRefresh from 'hooks/useRefresh'
import ToggleView from './components/ToggleView/ToggleView'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import { RowProps } from './components/FarmTable/Row'
import Divider from './components/Divider'
import { DesktopColumnSchema, ViewMode } from './components/types'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
  }
`

const Bakery: React.FC = () => {
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, 'pancake_farm_view')
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const farmsLP = useFarms()
  const ovenPrice = usePriceOvenUsdc()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const ethPrice = usePriceEthUsdc()

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const isActive = !pathname.includes('history')
  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X')

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed?: boolean) => {
      const ovenPriceVsETH = new BigNumber(farmsLP.find((farm) => farm.pid === OVEN_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const ovenRewardPerBlock = OVEN_PER_BLOCK.times(farm.poolWeight)
        const ovenRewardPerYear = ovenRewardPerBlock.times(BLOCKS_PER_YEAR)

        // ovenPriceInQuote * ovenRewardPerYear / lpTotalInQuoteToken
        let apy = ovenPriceVsETH.times(ovenRewardPerYear).div(farm.lpTotalInQuoteToken)

        if (farm.quoteTokenSymbol === QuoteToken.WETH) {
          apy = ovenPrice.div(ethPrice).times(ovenRewardPerYear).div(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.OVEN) {
          apy = ovenRewardPerYear.div(farm.lpTotalInQuoteToken)
        } else if (farm.dual) {
          const ovenApy =
            farm && ovenPriceVsETH.times(ovenRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)
          const dualApy =
            farm.tokenPriceVsQuote &&
            new BigNumber(farm.tokenPriceVsQuote)
              .times(farm.dual.rewardPerBlock)
              .times(BLOCKS_PER_YEAR)
              .div(farm.lpTotalInQuoteToken)

          apy = ovenApy && dualApy && ovenApy.plus(dualApy)
        }

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          removed={removed}
          ovenPrice={ovenPrice}
          ethPrice={ethPrice}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [farmsLP, ovenPrice, ethPrice, ethereum, account],
  )

  let farmsStaked = []
  if (isActive) {
    farmsStaked = farmsList(activeFarms)
  } else {
    farmsStaked = farmsList(inactiveFarms)
  }

  const rowData = farmsStaked.map((farm) => {
    // const { token, quoteToken } = farm
    // const quoteTokenAddress = weth
    // const tokenAddress = farms[tokenAddresses][process.env.REACT_APP_CHAIN_ID]
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')

    const row: RowProps = {
      // apr: {
      //   value: farm.apr && farm.apr.toLocaleString('en-US', { maximumFractionDigits: 2 }),
      //   multiplier: farm.multiplier,
      //   lpLabel,
      //   tokenAddress,
      //   quoteTokenAddress,
      //   cakePrice: ovenPrice,
      //   originalValue: farm.apr,
      // },
      farm: {
        image: farm.lpSymbol,
        label: lpLabel,
        pid: farm.pid,
      },
      earned: {
        earnings: farm.userData ? getBalanceNumber(new BigNumber(farm.userData.earnings)) : null,
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              // if (a.original.apr.value && b.original.apr.value) {
              //   return Number(a.original.apr.value) - Number(b.original.apr.value)
              // }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} />
    }

    return (
      <div>
        <FlexLayout>
          <Route exact path={`${path}`}>
            {farmsList(activeFarms, false)}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsList(inactiveFarms, true)}
          </Route>
        </FlexLayout>
      </div>
    )
  }

  return (
    <>
      <br />
      <Heading as="h1" size="xl" color="secondary" mb="24px" style={{ textAlign: 'center' }}>
        Bake DOUGH, Earn OVEN
      </Heading>
      <Heading size="lg" color="text" style={{ textAlign: 'center' }}>
        Stake Liquidity Pool (LP) tokens to earn.
      </Heading>
      <Page>
        <Divider />
        <ControlContainer>
          <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
        </ControlContainer>
        {renderContent()}
      </Page>
    </>
  )
}

export default Bakery
