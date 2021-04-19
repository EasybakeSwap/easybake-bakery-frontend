import React from 'react'
import styled from 'styled-components'
import { ChevronRightIcon, Button as UIKitButton, Flex, AutoRenewIcon, ChevronDownIcon } from 'easybakeswap-uikit'

interface ApproveConfirmButtonsProps {
  isApproveDisabled: boolean
  isApproving: boolean
  isConfirming: boolean
  isConfirmDisabled: boolean
  onApprove: () => void
  onConfirm: () => void
}

const Button = styled(UIKitButton)`
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    min-width: 160px;
    width: auto;
  }
`

const iconAttrs = { width: '24px', color: 'textDisabled' }

const ChevronRight = styled(ChevronRightIcon).attrs(iconAttrs)`
  display: none;

  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
  }
`

const ChevronBottom = styled(ChevronDownIcon).attrs(iconAttrs)`
  display: block;

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

const spinnerIcon = <AutoRenewIcon spin color="currentColor" />

const ApproveConfirmButtons: React.FC<ApproveConfirmButtonsProps> = ({
  isApproveDisabled,
  isApproving,
  isConfirming,
  isConfirmDisabled,
  onApprove,
  onConfirm,
}) => {

  return (
    <Flex py="8px" flexDirection={['column', null, 'row']} alignItems="center">
      <Button
        disabled={isApproveDisabled}
        onClick={onApprove}
        endIcon={isApproving ? spinnerIcon : undefined}
        isLoading={isApproving}
      >
        { isApproving ? 'Approving' : 'Approve' }
      </Button>
      <ChevronRight />
      <ChevronBottom />
      <Button
        onClick={onConfirm}
        disabled={isConfirmDisabled}
        isLoading={isConfirming}
        endIcon={isConfirming ? spinnerIcon : undefined}
      >
        { isConfirming ? 'Confirming' : 'Confirm' }
      </Button>
    </Flex>
  )
}

export default ApproveConfirmButtons
