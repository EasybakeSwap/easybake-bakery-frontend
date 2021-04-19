import React from 'react'
import { Heading, Text } from 'easybakeswap-uikit'
import UnlockButton from 'components/UnlockButton'

const WalletNotConnected = () => {

  return (
    <div>
      <Heading size="xl" mb="8px">
        Whoopsies!
      </Heading>
      <Text>
      { 'Please connect your wallet to continue' }
      </Text>
      <UnlockButton />
    </div>
  )
}

export default WalletNotConnected
