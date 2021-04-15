// import React from 'react'
// import styled from 'styled-components'
// import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from 'easybakeswap-uikit'
// import { NavLink } from 'react-router-dom'

// const StyledFarmStakingCard = styled(Card)`
//   margin-left: auto;
//   margin-right: auto;
//   width: 100%;

//   ${({ theme }) => theme.mediaQueries.lg} {
//     margin: 0;
//     max-width: none;
//   }
// `
// const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
//   line-height: 44px;
// `
// const WinCard = () => {
//   const lotteryPrize = Math.round(10000).toLocaleString()

//   return (
//     <StyledFarmStakingCard>
//       <CardBody>
//         <Heading color="contrast" size="lg">
//           Lottery with
//         </Heading>
//         <CardMidContent color="#7645d9">${lotteryPrize}</CardMidContent>
//         <Flex justifyContent="space-between">
//           <Heading color="contrast" size="lg">
//             up for grabs
//           </Heading>
//           <NavLink exact activeClassName="active" to="/lottery" id="lottery-pot-cta">
//             <ArrowForwardIcon mt={30} color="primary" />
//           </NavLink>
//         </Flex>
//       </CardBody>
//     </StyledFarmStakingCard>
//   )
// }

// export default WinCard

import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from 'easybakeswap-uikit'
import { NavLink } from 'react-router-dom'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`
const WinCard = () => {
  const lotteryPrize = Math.round(10000).toLocaleString()

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="contrast" size="lg">
          Help us bake up
        </Heading>
        <CardMidContent color="#7645d9">
          LIMITLESS
        </CardMidContent>
        <Flex justifyContent="space-between">
          <Heading color="contrast" size="lg">
            possibilities.
          </Heading>
          <a href = 'https://forum.easybake.finance' >
            <ArrowForwardIcon mt={30} color="primary" />
          </a>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default WinCard
