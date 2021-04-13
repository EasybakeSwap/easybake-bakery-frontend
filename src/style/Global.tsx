import { createGlobalStyle } from 'styled-components'
import { PancakeTheme } from 'easybakeswap-uikit/dist/theme' // UPDATE

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: 0%;
      max-width: 0%;
    }
  }
`

export default GlobalStyle
