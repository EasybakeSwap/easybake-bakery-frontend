import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex } from 'easybake-uikit'

// const [background, setBackground] = useState()

// const setBrightness = (hoverColor) => {
//   setBackground(hoverColor);
// }

const StyledFarmStakingCard = styled(Card)`
  background: violet;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  transition: brightness 0.2s;
  
  &:hover {
    filter: brightness(110%);
    cursor: pointer;
  }

  onHover: 
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`

const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`
const TelegramCard = () => {
  return (
    <StyledFarmStakingCard onClick={() => window.open('https://t.me/EasyBakeSwap','_blank')}>
      <CardBody>
        <Heading color="contrast" size="lg">
          Stay informed 
        </Heading>
        <CardMidContent color="invertedContrast">DAILY</CardMidContent>
        <Flex justifyContent="space-between">
          <Heading color="contrast" size="lg">
            in our Telegram.
          </Heading>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default TelegramCard
