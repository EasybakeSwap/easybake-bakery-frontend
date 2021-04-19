import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from 'easybakeswap-uikit' // UPDATE
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import OvenStats from 'views/Home/components/OvenStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import OvenWinnings from './components/OvenWinnings'
import WinCard from './components/WinCard'

const Hero = styled.div`
  align-items: center;
  background-image: url('/images/choco-cakes.png');
  background-repeat: repeat;
  background-position: top;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 96px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    // background-image: url('/images/lilac.png');
    background-position: center;
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 12;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`

const Home: React.FC = () => {

  return (
    <Page>
       {/* <Hero>
       </Hero> */}
      <div>
        <Cards>
          <FarmStakingCard />
        </Cards>
        <CTACards>
          <EarnAPYCard />
          <EarnAssetCard />
          <WinCard />
        </CTACards>
        <Cards>
          {/* <OvenStats /> */}
          <TotalValueLockedCard />
        </Cards>
      </div>
    </Page>
  )
}

export default Home
