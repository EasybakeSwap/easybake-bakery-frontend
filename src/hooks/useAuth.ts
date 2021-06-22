
import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { ConnectorNames, connectorLocalStorageKey } from 'maki-uikit'
import { connectorsByName } from 'utils/web3React'
import { setupNetwork } from 'utils/wallet'
import useToast from 'hooks/useToast'
import { profileClear } from 'state/profile'
import { useAppDispatch } from 'state'
import { useTranslation } from 'contexts/Localization'

const useAuth = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { activate, deactivate } = useWeb3React()
  const { toastError } = useToast()

  const login = useCallback(
    (connectorId: ConnectorNames) => {
      const connector = connectorsByName.injected
      if (connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork()
            if (hasSetup) {
              activate(connector)
            }
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey)
            if (error instanceof NoEthereumProviderError) {
              toastError(t('Provider Error'), t('Provider Not Found'))
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connectorId === connectorsByName.walletconnect) { // instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector
                walletConnector.walletConnectProvider = null
              }
              toastError(t('Authorization Error'), t('Please Authorize Account Access'))
            } else {
              toastError(error.name, error.message)
            }
          }
        })
      } else {
        toastError(t('No Connector Found'), t('Invalid Connector Config'))
      }
    },
    [t, activate, toastError],
  )

  const logout = useCallback(() => {
    dispatch(profileClear())
    deactivate()
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem('walletconnect')) {
      connectorsByName.walletconnect.close()
      connectorsByName.walletconnect.walletConnectProvider = null
    }
  }, [deactivate, dispatch])

  return { login, logout }
}

export default useAuth