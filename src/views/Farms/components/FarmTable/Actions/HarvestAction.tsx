import React, { useState, useRef, useEffect } from 'react'
import { Button, Skeleton } from 'easybake-uikit'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceAmount } from 'utils/formatBalance'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { usePriceOvenUsdc } from 'state/hooks'
import { useHarvest } from 'hooks/useHarvest'

import { useCountUp } from 'react-countup'

import { ActionContainer, ActionTitles, Title, Subtle, ActionContent, Earned, Staked } from './styles'

interface HarvestActionProps extends FarmWithStakedValue {
  userDataReady: boolean
}

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({ pid, userData, userDataReady }) => {
  const earningsBigNumber = new BigNumber(userData.earnings)
  const ovenPrice = usePriceOvenUsdc()
  let earnings = BIG_ZERO
  let earningsUsdt = 0
  let displayBalance = userDataReady ? earnings.toLocaleString() : <Skeleton width={60} />

  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    earnings = getBalanceAmount(earningsBigNumber)
    earningsUsdt = earnings.multipliedBy(ovenPrice).toNumber()
    displayBalance = earnings.toFixed(3, BigNumber.ROUND_DOWN)
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const { countUp, update } = useCountUp({
    start: 0,
    end: earningsUsdt,
    duration: 1,
    separator: ',',
    decimals: 3,
  })
  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(earningsUsdt)
  }, [earningsUsdt, updateValue])

  return (
    <ActionContainer>
      <ActionTitles>
        <Title>OVEN </Title>
        <Subtle>{('Earned').toUpperCase()}</Subtle>
      </ActionTitles>
      <ActionContent>
        <div>
          <Earned>{displayBalance}</Earned>
          {countUp > 0 && <Staked>~{countUp}USD</Staked>}
        </div>
        <Button
          disabled={!earnings || pendingTx || !userDataReady}
          onClick={async () => {
            setPendingTx(true)
            await onReward()
            dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))

            setPendingTx(false)
          }}
          ml="4px"
        >
          {('Harvest')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
