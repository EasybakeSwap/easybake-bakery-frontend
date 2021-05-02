import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'

export interface EarnedProps {
  earnings: number
  pid: number
}

const Amount = styled.span<{ earned: number }>`
  color: ${({ earned, theme }) => (earned ? theme.colors.text : theme.colors.textDisabled)};
  display: flex;
  align-items: center;
`
// const DisabledText = styled.div`
//   color: ${({ theme }) => theme.colors.textDisabled};
// `

const Earned: React.FunctionComponent<EarnedProps> = ({ earnings }) => {
  const { account } = useWeb3React()
  const amountEarned = account ? earnings : null
  
  let dispayedAmountEarned;
  if(amountEarned > 0 && amountEarned < 0.001) {
    dispayedAmountEarned = '<0.001'
  } else if (amountEarned === null) {
    dispayedAmountEarned = 'Unlock Wallet'
  }
  else { 
    dispayedAmountEarned = amountEarned.toLocaleString() 
  }

  return amountEarned ? <Amount earned={amountEarned}>{dispayedAmountEarned}</Amount> : <Amount earned={null}>{dispayedAmountEarned}</Amount>
}

export default Earned
