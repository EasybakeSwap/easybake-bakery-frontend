import React, { useState, useRef, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Heading, Flex } from 'easybake-uikit'
import { IcingButtonSM } from 'components/IcingButton/sizes/SM'
// import BigNumber from 'bignumber.js'
import { FarmWithStakedValue } from 'views/Bakery/components/FarmCard/FarmCard'
import { getBalanceNumber } from 'utils/formatBalance'
import { useHarvest } from 'hooks/useHarvest'
// import { usePriceOvenUsdc } from 'state/hooks'
import { useCountUp } from 'react-countup'

import { ActionContainer, ActionTitles, Title, Subtle, ActionContent } from './styles'

const HarvestAction: React.FunctionComponent<FarmWithStakedValue> = ({ pid, userData }) => {
  const { account } = useWeb3React()
  const rawEarningsBalance = account ? getBalanceNumber(userData.earnings) : 0
  // const ovenPrice = usePriceOvenUsdc()
  // const earnings = null
  const earningsUsdc = 1
  let displayBalance;
  if(rawEarningsBalance > 0 && rawEarningsBalance < 0.001) {
    displayBalance = '<0.001'
  } else { 
    displayBalance = rawEarningsBalance.toLocaleString() 
  }

  if (!account) {
    displayBalance = 'Unlock Wallet'
  }


  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)

  const { update } = useCountUp({
    start: 0,
    end: earningsUsdc,
    duration: 1,
    separator: ',',
    decimals: 3,
  })
  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(earningsUsdc)
  }, [earningsUsdc, updateValue])

  return (
    <ActionContainer>
      <ActionTitles>
        <Title>EARNED </Title>
        <Subtle>OVEN</Subtle>
      </ActionTitles>
      <ActionContent>
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>
          {displayBalance}
          {/* {countUp > 0 && <Staked>~{countUp}USD</Staked>} */}
        </Heading>
          <IcingButtonSM
            btnName='Collect'
            isLoading={pendingTx}
            isDisabled={rawEarningsBalance === 0 || !account}
            onClick={async () => {
              setPendingTx(true)
              await onReward()
              setPendingTx(false)
            }}
          />
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
