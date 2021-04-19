import React from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import {
  Card,
  CardBody,
  CheckmarkCircleIcon,
  Flex,
  Heading,
  Link,
  Tag,
  Text,
  PrizeIcon,
  OpenNewIcon,
  BlockIcon,
} from 'easybakeswap-uikit'
import { useProfile } from 'state/hooks'
import Menu from './components/Menu'
import CardHeader from './components/CardHeader'
import ComingSoon from './components/ComingSoon'
import WalletNotConnected from './components/WalletNotConnected'
import StatBox from './components/StatBox'
import ProfileAvatar from './components/ProfileAvatar'

const Content = styled.div`
  flex: 1;
`

const Username = styled(Heading)`
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 40px;
    line-height: 44px;
  }
`

const Status = styled.div`
  position: absolute;
  right: 24px;
  top: 24px;
`

const ResponsiveText = styled(Text)`
  font-size: 12px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }
`

const AddressLink = styled(Link)`
  display: inline-block;
  font-weight: 400;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80px;
  white-space: nowrap;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
    width: auto;
  }
`

const PublicProfile = () => {
  const { account } = useWallet()
  const { profile } = useProfile()

  if (!account) {
    return <WalletNotConnected />
  }

  return (
    <>
      <Menu />
      <div>
        <Card>
          <CardHeader>
            <Flex alignItems={['start', null, 'center']} flexDirection={['column', null, 'row']}>
              <ProfileAvatar profile={profile} />
              <Content>
                <Username>{`@${profile.username}`}</Username>
                <Flex alignItems="center">
                  <AddressLink href={`https://etherscan.io/address/${account}`} color="text" external>
                    {account}
                  </AddressLink>
                  <OpenNewIcon ml="4px" />
                </Flex>
                <ResponsiveText bold>{profile.team.name}</ResponsiveText>
              </Content>
            </Flex>
            <Status>
              {profile.isActive ? (
                <Tag startIcon={<CheckmarkCircleIcon width="18px" />} outline>
                  Active
                </Tag>
              ) : (
                <Tag variant="failure" startIcon={<BlockIcon width="18px" />} outline>
                  Paused
                </Tag>
              )}
            </Status>
          </CardHeader>
          <CardBody>
            <StatBox icon={PrizeIcon} title={profile.points} subtitle={ 'Points' } mb="24px" />
            <Heading as="h4" size="md">
              Achievements
            </Heading>
            <ComingSoon />
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default PublicProfile
