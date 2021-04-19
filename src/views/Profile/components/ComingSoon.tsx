import React from 'react'
import { BunnyPlaceholderIcon, Flex, Heading } from 'easybakeswap-uikit'

interface ComingSoonProps {
  children?: React.ReactNode
}

const ComingSoon: React.FC<ComingSoonProps> = ({ children }) => {

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center" p="24px">
      <BunnyPlaceholderIcon width="72px" height="72px" />
      <Heading as="h5" size="md" color="textDisabled">
        { children || 'Coming Soon!' }
      </Heading>
    </Flex>
  )
}

export default ComingSoon
