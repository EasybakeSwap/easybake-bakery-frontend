import React from 'react'
import styled from 'styled-components'
import { HelpIcon, useTooltip } from 'easybake-uikit'

const ReferenceElement = styled.div`
  display: inline-block;
`

export interface MultiplierProps {
  multiplier: string
}

const MultiplierWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  width: 36px;
  text-align: right;
  margin-right: 14px;

  ${({ theme }) => theme.mediaQueries.lg} {
    text-align: left;
    margin-right: 0;
  }
`

const Disabled = styled.div`
  color: ${({ theme }) => theme.colors.textDisabled};
`
const Active = styled.div`
  color: ${({ theme }) => theme.colors.text};
`  

const Container = styled.div`
  display: flex;
  align-items: center;
`

const SubContainer = styled.div`
  position: relative;
  left: 3px;
  display: flex;
  align-items: center;
`

const Multiplier: React.FunctionComponent<MultiplierProps> = ({ multiplier }) => {
  const displayMultiplier = multiplier ? <Active>{multiplier.toLowerCase()}</Active> : <Disabled>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</Disabled>
  const tooltipContent = (
    <div>
      The temperature represents the amount of $OVEN rewards each oven gets.
      <br />
      <br />
      For example, if a 1x oven was getting 1 $OVEN per block, a 40x oven would be getting 40 $OVEN per block.
    </div>
  )
  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, 'top-end', 'hover', undefined, undefined, [
    20,
    10,
  ])

  return (
    <Container>
      <SubContainer>
        <MultiplierWrapper>{displayMultiplier}</MultiplierWrapper>
        <ReferenceElement ref={targetRef}>
          <HelpIcon color="textSubtle" />
        </ReferenceElement>
      </SubContainer>
      {tooltipVisible && tooltip}
    </Container>
  )
}

export default Multiplier
