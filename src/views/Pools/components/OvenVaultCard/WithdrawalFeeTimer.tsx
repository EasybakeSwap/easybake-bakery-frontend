import React from 'react'
import { Text } from 'easybake-uikit'
import getTimePeriods from 'utils/getTimePeriods'


const WithdrawalFeeTimer: React.FC<{ secondsRemaining: number }> = ({ secondsRemaining }) => {
  
  const { days, hours, minutes } = getTimePeriods(secondsRemaining)

  return <Text fontSize="14px">{( { day: days, hour: hours, minute: minutes })}</Text> // '%day%d : %hour%h : %minute%m',
}

export default WithdrawalFeeTimer
