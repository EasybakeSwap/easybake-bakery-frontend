import React, { useContext } from 'react'
import { Menu as UikitMenu } from 'easybakeswap-uikit' // UPDATE
import { useWallet } from '@binance-chain/bsc-use-wallet' // UPDATE
import { allLanguages } from 'config/localisation/languageCodes'
import useTheme from 'hooks/useTheme'
import { usePriceOvenUsdc, useProfile } from 'state/hooks'
import config from './config'

const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { isDark, toggleTheme } = useTheme()
  const ovenPriceUsd = usePriceOvenUsdc()
  const { profile } = useProfile()

  return (
    <UikitMenu
      account={account}
      login={connect}
      logout={reset}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang='EN'
      langs={allLanguages}
      setLang= 'EN'
      ovenPriceUsdc={ovenPriceUsd.toNumber()}
      links={config}
      profile={{
        username: profile?.username,
        image: profile?.nft ? '' : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
      {...props}
    />
  )
}

export default Menu
