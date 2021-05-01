import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading } from 'easybake-uikit'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWeb3React } from '@web3-react/core'
import { usePriceOvenUsdc } from 'state/hooks'
import CardBusdValue from '../../../Home/components/CardBusdValue'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const ovenPrice = usePriceOvenUsdc()

  const rawEarningsBalance = account ? getBalanceNumber(earnings) : 0
  const displayBalance = rawEarningsBalance.toLocaleString()
  const earningsBusd = rawEarningsBalance ? new BigNumber(rawEarningsBalance).multipliedBy(ovenPrice).toNumber() : 0

  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>
        {displayBalance}
        {earningsBusd > 0 && <CardBusdValue value={earningsBusd} />}
      </Heading>
      <Button
        disabled={rawEarningsBalance === 0 || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          setPendingTx(false)
        }}
      >
        {TranslateString(562, 'Harvest')}
      </Button>
    </Flex>
  )
}

export default HarvestAction
