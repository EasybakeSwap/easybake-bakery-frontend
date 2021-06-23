import React from 'react'
import { Text } from 'easybake-uikit'
import getTimePeriods from 'utils/getTimePeriods'


const WithdrawalFeeTimer: React.FC<{ secondsRemaining: number }> = ({ secondsRemaining }) => {
  
  const { days, hours, minutes } = getTimePeriods(secondsRemaining)

  return <Text fontSize="14px">{days}d : {hours}h : {minutes}m</Text>
}

export default WithdrawalFeeTimer
