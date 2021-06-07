import React from 'react'
import { useWalletModal } from 'easybake-uikit'
import { BaseButtonLG } from 'components/IcingButton/sizes/LG'
import useAuth from 'hooks/useAuth'

const UnlockButton = ({scale}) => {
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <BaseButtonLG btnName='Unlock Wallet' scale={scale} onClick={onPresentConnectModal} />
  )
}

export default UnlockButton
