import React from 'react'
import styled from 'styled-components'
import { Image, Button } from 'easybakeswap-uikit'
import { CommunityTag } from 'components/Tags'

import Card from './Card'
// import CardTitle from './CardTitle'

const Balance = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 40px;
  font-weight: 600;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  margin-bottom: 16px;
`

const DetailPlaceholder = styled.div`
  display: flex;
  font-size: 14px;
`
const Value = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
`

const Footer = styled.div`
  border-top: 1px solid ${({ theme }) => (theme.isDark ? '#524B63' : '#E9EAEB')};
  padding: 24px;
`
const Coming: React.FC = () => {
  return (
    <Card>
      <div style={{ padding: '32px' }}>
        {/* <CardTitle>
          {'Your Project?'}{' '}
          <span role="img" aria-label="eyes">
          </span>
        </CardTitle>
        <Image src="/images/bunny-placeholder.svg" width={64} height={64} alt="Your project here" />
        <Balance>???</Balance>
        <Label>{'Create a pool for your token'}</Label> */}
        <Button variant="secondary" as="a" href="https://docs.google.com/viewform" external fullWidth mb="16px">
          {'Apply Now'}
        </Button>
        {/* <DetailPlaceholder>
          <div style={{ flex: 1 }}>{'APR'}:</div>
          <Value>??</Value>
        </DetailPlaceholder>
        <DetailPlaceholder>
          <div style={{ flex: 1 }}>
            <span role="img" aria-label="syrup">
              {' '}
            </span>
            {'Your Stake'}:
          </div>
          <Value>??? OVEN</Value>
        </DetailPlaceholder> */}
      </div>
      <Footer style={{ textAlign: 'center' }}>
        <CommunityTag />
      </Footer>
    </Card>
  )
}

export default Coming
