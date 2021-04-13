import React, { useContext } from 'react'
import { Menu as UikitMenu } from 'easybakeswap-uikit' // UPDATE
import { useWallet } from '@binance-chain/bsc-use-wallet' // UPDATE
import useTheme from 'hooks/useTheme'
import { usePriceOvenUsdc } from 'state/hooks'
import config from './config'

const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { isDark, toggleTheme } = useTheme()
  const ovenPriceUsd = usePriceOvenUsdc()

  return (
    <UikitMenu
      account={account}
      login={connect}
      logout={reset}
      isDark={isDark}
      toggleTheme={toggleTheme}
      ovenPriceUsdc={ovenPriceUsd.toNumber()}
      links={config}
      {...props}
    />
  )
}

export default Menu
