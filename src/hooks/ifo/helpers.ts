import { IfoStatus } from 'config/constants/types'

export const getStatus = (currentBlock: number, startTime: number, endTime: number): IfoStatus => {
  // Add an extra check to currentBlock because it takes awhile to fetch so the initial value is 0
  // making the UI change to an inaccurate status
  if (currentBlock === 0) {
    return 'idle'
  }

  if (currentBlock < startTime) {
    return 'coming_soon'
  }

  if (currentBlock >= startTime && currentBlock <= endTime) {
    return 'live'
  }

  if (currentBlock > endTime) {
    return 'finished'
  }

  return 'idle'
}

export default null
