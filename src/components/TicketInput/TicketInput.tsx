import React from 'react'
import styled from 'styled-components'
import { Button, Flex, Input, InputProps } from 'easybake-uikit'


interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  availableSymbol: string
  value: string
  onSelectMax?: () => void
  onChange: (evt: React.FormEvent<HTMLInputElement>) => void
}

const TicketInput: React.FC<TokenInputProps> = ({ max, symbol, availableSymbol, onChange, onSelectMax, value }) => {
  

  return (
    <>
      <Flex alignItems="center">
        <Input type="number" inputMode="numeric" min="0" onChange={onChange} placeholder="0" value={value} />
        <StyledTokenAdornmentWrapper>
          <StyledSpacer />
          <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
          <StyledSpacer />
          <Button scale="sm" onClick={onSelectMax}>
            Max
          </Button>
        </StyledTokenAdornmentWrapper>
      </Flex>
      <StyledMaxText>
        { max.toLocaleString()} { availableSymbol } Available
      </StyledMaxText>
    </>
  )
}

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledMaxText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 44px;
  justify-content: flex-end;
`

const StyledTokenSymbol = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 700;
`

export default TicketInput
