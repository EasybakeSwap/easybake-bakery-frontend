// x

// export function useEagerConnect() {
//   const { activate, deactivate } = useWeb3React()

//   const [tried, setTried] = useState(false)

//   useEffect(() => {
//     injected.isAuthorized().then((isAuthorized: boolean) => {
//       if (isAuthorized) {
//         activate(injected, undefined, true).catch(() => {
//           setTried(true)
//         })
//       } else {
//         setTried(true)
//       }
//     })
//   }, []) // intentionally only running on mount (make sure it's only mounted once :)) // intentionally only running on mount (make sure it's only mounted once :))

//   // if the connection worked, wait until we get confirmation of that to flip the flag
//   useEffect(() => {
//     if (!tried && active) {
//       setTried(true)
//     }
//   }, [tried, active])
//   return tried
// }

// export default useEagerConnect



import { useEffect } from 'react'
import { connectorLocalStorageKey, ConnectorNames } from 'maki-uikit'
import useAuth from 'hooks/useAuth'

const _hecoListener = async () =>
  new Promise<void>((resolve) =>
    Object.defineProperty(window, 'HuobiChain', {
      get() {
        return this.heco
      },
      set(heco) {
        this.heco = heco

        resolve()
      },
    }),
  )

const useEagerConnect = () => {
  const { login } = useAuth()

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames

    if (connectorId) {
      const isConnectorHuobiChain = connectorId === ConnectorNames.Injected
      const isHuobiChainDefined = Reflect.has(window, 'HuobiChain')

      // Currently HECO extension doesn't always inject in time.
      // We must check to see if it exists, and if not, wait for it before proceeding.
      if (isConnectorHuobiChain && !isHuobiChainDefined) {
        _hecoListener().then(() => login(connectorId))

        return
      }

      login(connectorId)
    }
  }, [login])
}

export default useEagerConnect