import React from 'react' // removed useContext
import { Menu as UikitMenu } from 'easybake-uikit'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
// import { usePriceOvenUsd } from 'state/hooks'
import config from './config'

const Menu = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  // const ovenPriceUsd = usePriceOvenUsdc()
  // const { profile } = useProfile()

  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      ovenPriceUsd={7.13} // ovenPriceUsd.toNumber()
      links={config}
      // profile={{
      //   username: profile?.username,
      //   image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
      //   profileLink: '/profile',
      //   noProfileLink: '/profile',
      //   showPip: !profile?.username,
      // }}
      {...props}
    />
  )
}

export default Menu
