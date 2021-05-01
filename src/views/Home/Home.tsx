import React from 'react'
import styled from 'styled-components'
import { BaseLayout } from 'easybake-uikit'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
// import OvenStats from 'views/Home/components/OvenStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import MediumCard from 'views/Home/components/MediumCard'
import TelegramCard from 'views/Home/components/TelegramCard'
import ForumCard from './components/ForumCard'

// const Hero = styled.div`
//   align-items: center;
//   background-image: url('/images/choco-cakes.png');
//   background-repeat: repeat;
//   background-position: top;
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   margin: auto;
//   margin-bottom: 32px;
//   padding-top: 96px;
//   text-align: center;

//   ${({ theme }) => theme.mediaQueries.lg} {
//     // background-image: url('/images/lilac.png');
//     background-position: center;
//     height: 165px;
//     padding-top: 0;
//   }
// `

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
      <div>
        <Cards>
          <FarmStakingCard />
        </Cards>
        <CTACards>
          <MediumCard />
          <TelegramCard />
          <ForumCard />
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
