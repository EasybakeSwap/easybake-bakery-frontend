import BigNumber from 'bignumber.js'
import { ResetCSS } from 'easybakeswap-uikit'
import React, { lazy, Suspense, useEffect } from 'react'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import { useFetchPublicData } from 'state/hooks'
import { useWallet } from 'use-wallet'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'
import Pools from './views/Pools'
import ToastListener from './components/ToastListener'
import history from './routerHistory'
import GlobalStyle from './style/Global'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const Bakery = lazy(() => import('./views/Bakery'))
const NotFound = lazy(() => import('./views/NotFound'))


// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account, connect } = useWallet()

  // Monkey patch warn() because of web3 flood
  // To be removed when web3 1.3.5 is released
  useEffect(() => {
    console.warn = () => null
  }, [])

  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  useFetchPublicData()
  // useFetchProfile()

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/bakery">
              <Bakery />
            </Route>
            <Route path="/pools">
              <Pools />
            </Route>
            {/* Redirect */}
            {/* 404 */}
            <Route path="/staking">
              <Redirect to="/pools" />
            </Route>
            <Route path = "/sugar">
              <Redirect to = "/pools" />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Menu>
      <ToastListener />
    </Router>
  )
}

export default React.memo(App)
