import React from 'react'
import { Route } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Page from 'components/layout/Page'
import PageLoader from 'components/PageLoader'
import { useProfile } from 'state/hooks'
import Header from './components/Header'
import PublicProfile from './PublicProfile'

const Profile = () => {
  const { isInitialized, isLoading, hasProfile } = useProfile()
  const { account } = useWallet()

  if (!isInitialized || isLoading) {
    return <PageLoader />
  }

  return (
    <Page>
      <Header />
      <Route exact path="/profile">
        <PublicProfile />
      </Route>
      <Route path="/profile/tasks">
      </Route>
    </Page>
  )
}

export default Profile
