import React from 'react'
import { Progress, ProgressProps } from 'easybake-uikit'
import { useTime } from 'state/hooks'

interface BlockProgressProps extends ProgressProps {
  startTime: number
  endTime: number
}

const BlockProgress: React.FC<BlockProgressProps> = ({ startTime, endTime, ...props }) => {
  const { currentTime } = useTime()
  const rawProgress = ((currentTime - startTime) / (endTime - startTime)) * 100
  const progress = rawProgress <= 100 ? rawProgress : 100

  return <Progress primaryStep={progress} {...props} />
}

export default BlockProgress
