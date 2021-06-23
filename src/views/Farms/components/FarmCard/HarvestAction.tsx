import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading } from 'easybake-uikit'

import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceAmount } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import { useWeb3React } from '@web3-react/core'
import { usePriceOvenUsdc } from 'state/hooks'
import CardUsdtValue from '../../../Home/components/CardUsdtValue'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const { account } = useWeb3React()
  
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const ovenPrice = usePriceOvenUsdc()
  const dispatch = useAppDispatch()
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO
  const displayBalance = rawEarningsBalance.toFixed(3, BigNumber.ROUND_DOWN)
  const earningsUsdt = rawEarningsBalance ? rawEarningsBalance.multipliedBy(ovenPrice).toNumber() : 0

  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Heading color={rawEarningsBalance.eq(0) ? 'textDisabled' : 'text'}>
        {displayBalance}
        {earningsUsdt > 0 && <CardUsdtValue value={earningsUsdt} />}
      </Heading>
      <Button
        disabled={rawEarningsBalance.eq(0) || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }))

          setPendingTx(false)
        }}
      >
        {('Harvest')}
      </Button>
    </Flex>
  )
}

export default HarvestAction
