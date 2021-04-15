import React from 'react'
// import { useTotalClaim } from 'hooks/useTickets'
import { getBalanceNumber } from 'utils/formatBalance'
import CardValue from './CardValue'

const OvenWinnings = () => {
  // const { claimAmount } = useTotalClaim()
  const claimAmount = 100
  // return <CardValue value={getBalanceNumber(claimAmount)} />
  return <CardValue value={100} />
}

export default OvenWinnings
