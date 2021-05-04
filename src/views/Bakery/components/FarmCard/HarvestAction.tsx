import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading } from 'easybake-uikit'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWeb3React } from '@web3-react/core'
// import { usePriceOvenUsdc } from 'state/hooks'
// import CardBusdValue from '../../../Home/components/CardBusdValue'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const { account } = useWeb3React()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  // const ovenPrice = usePriceOvenUsdc()

  const rawEarningsBalance = account ? getBalanceNumber(earnings) : 0
  // const earningsUsdc = rawEarningsBalance ? new BigNumber(rawEarningsBalance).multipliedBy(ovenPrice).toNumber() : 0
  
  let displayBalance;
  if(rawEarningsBalance > 0 && rawEarningsBalance < 0.001) {
    displayBalance = '<0.001'
  } else { 
    displayBalance = rawEarningsBalance.toLocaleString() 
  }

  if (!account) {
    displayBalance = 'Unlock Wallet'
  }

  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>
        {displayBalance}
        {/* {earningsUsdc > 0 && <CardBusdValue value={earningsUsdc} />} */}
      </Heading>
      <Button
        disabled={rawEarningsBalance === 0 || pendingTx || !account}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          setPendingTx(false)
        }}
      >
        Collect
      </Button>
    </Flex>
  )
}

export default HarvestAction
