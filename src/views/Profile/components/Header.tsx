import React from 'react'
import { Button, Flex, Heading, useModal } from 'easybakeswap-uikit'
import { useProfile } from 'state/hooks'
import HeaderWrapper from './HeaderWrapper'

const ProfileHeader = () => {
  const { hasProfile } = useProfile()

  return (
    <HeaderWrapper>
      <Flex
        flexDirection={['column', null, 'row']}
        alignItems={['start', null, 'center']}
        justifyContent="space-between"
      >
        <div>
          <Heading as="h1" size="xxl" mb="8px" color="secondary">
            { 'Your Profile' }
          </Heading>
          <Heading as="h2" size="lg" mb="16px">
            { 'Check your stats and collect achievements' }
          </Heading>
        </div>
      </Flex>
    </HeaderWrapper>
  )
}

export default ProfileHeader
