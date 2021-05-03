import React from 'react'
import { Button, useWalletModal } from 'easybake-uikit'
import useAuth from 'hooks/useAuth'

const UnlockButton = (props) => {
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button onClick={onPresentConnectModal} {...props}>
      Unlock Wallet
    </Button>
  )
}

export default UnlockButton
