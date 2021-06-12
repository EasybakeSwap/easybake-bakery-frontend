import { useEffect, useRef, useState } from 'react'
import { ERC_BLOCK_TIME } from 'config'
import { useTime } from 'state/hooks'

/**
 * Returns a countdown in seconds of a given block
 */
const useTimeCountdown = (blockTime: number) => {
  const timer = useRef<ReturnType<typeof setTimeout>>(null)
  const [secondsRemaining, setSecondsRemaining] = useState(0)
  const { currentTime } = useTime()

  useEffect(() => {
    if (currentTime > 0) {
      const secondsBetweenBlocks = (blockTime - currentTime) * ERC_BLOCK_TIME

      // Only start a countdown if the provided block number is greater than the current block
      if (blockTime > currentTime) {
        clearInterval(timer.current)
        setSecondsRemaining(secondsBetweenBlocks)

        timer.current = setInterval(() => {
          setSecondsRemaining((prevSecondsRemaining) => {
            if (prevSecondsRemaining === 0) {
              clearInterval(timer.current)
              return 0
            }

            return prevSecondsRemaining - 1
          })
        }, 1000)
      }
    }

    return () => {
      clearInterval(timer.current)
    }
  }, [currentTime, blockTime, timer, setSecondsRemaining])

  return secondsRemaining
}

export default useTimeCountdown
