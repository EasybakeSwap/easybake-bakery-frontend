import styled, {keyframes} from 'styled-components'

const Load = keyframes`{
  0% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}`;

const FlexLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  animation: ${Load} 300ms ease-in forwards;
  & > * {
    min-width: 280px;
    max-width: 31.5%;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 32px;
  }
`

export default FlexLayout
