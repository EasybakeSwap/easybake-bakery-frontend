import React, { useState } from 'react'
import {
  Modal,
  Text,
  Button,
  Heading,
  Flex,
  AutoRenewIcon,
  ButtonMenu,
  ButtonMenuItem,
  HelpIcon,
  useTooltip,
} from 'easybake-uikit'

import useTheme from 'hooks/useTheme'
import { useSousHarvest } from 'hooks/useHarvest'
import { useSousStake } from 'hooks/useStake'
import useToast from 'hooks/useToast'
import { Token } from 'config/constants/types'

interface CollectModalProps {
  formattedBalance: string
  fullBalance: string
  earningToken: Token
  earningsDollarValue: string
  sousId: number
  isEthPool: boolean
  isCompoundPool?: boolean
  onDismiss?: () => void
}

const CollectModal: React.FC<CollectModalProps> = ({
  formattedBalance,
  fullBalance,
  earningToken,
  earningsDollarValue,
  sousId,
  isEthPool,
  isCompoundPool = false,
  onDismiss,
}) => {
  
  const { theme } = useTheme()
  const { toastSuccess, toastError } = useToast()
  const { onReward } = useSousHarvest(sousId, isEthPool)
  const { onStake } = useSousStake(sousId, isEthPool)
  const [pendingTx, setPendingTx] = useState(false)
  const [shouldCompound, setShouldCompound] = useState(isCompoundPool)
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Text mb="12px">{('Compound: collect and restake OVEN into pool.')}</Text>
      <Text>{('Harvest: collect OVEN and send to wallet')}</Text>
    </>,
    { placement: 'bottom-end', tooltipOffset: [20, 10] },
  )

  const handleHarvestConfirm = async () => {
    setPendingTx(true)
    // compounding
    if (shouldCompound) {
      try {
        await onStake(fullBalance, earningToken.decimals)
        toastSuccess(
          `${('Compounded')}!`,
          t('Your %symbol% earnings have been re-invested into the pool!', { symbol: earningToken.symbol }),
        )
        setPendingTx(false)
        onDismiss()
      } catch (e) {
        toastError(t('Canceled'), t('Please try again and confirm the transaction.'))
        setPendingTx(false)
      }
    } else {
      // harvesting
      try {
        await onReward()
        toastSuccess(
          `${('Harvested')}!`,
          t('Your %symbol% earnings have been sent to your wallet!', { symbol: earningToken.symbol }),
        )
        setPendingTx(false)
        onDismiss()
      } catch (e) {
        toastError(t('Canceled'), t('Please try again and confirm the transaction.'))
        setPendingTx(false)
      }
    }
  }

  return (
    <Modal
      title={`${earningToken.symbol} ${isCompoundPool ? t('Collect') : t('Harvest')}`}
      onDismiss={onDismiss}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      {isCompoundPool && (
        <Flex justifyContent="center" alignItems="center" mb="24px">
          <ButtonMenu
            activeIndex={shouldCompound ? 0 : 1}
            scale="sm"
            variant="subtle"
            onItemClick={(index) => setShouldCompound(!index)}
          >
            <ButtonMenuItem as="button">{('Compound')}</ButtonMenuItem>
            <ButtonMenuItem as="button">{('Harvest')}</ButtonMenuItem>
          </ButtonMenu>
          <Flex ml="10px" ref={targetRef}>
            <HelpIcon color="textSubtle" />
          </Flex>
          {tooltipVisible && tooltip}
        </Flex>
      )}

      <Flex justifyContent="space-between" alignItems="center" mb="24px">
        <Text>{shouldCompound ? t('Compounding') : t('Harvesting')}:</Text>
        <Flex flexDirection="column">
          <Heading>
            {formattedBalance} {earningToken.symbol}
          </Heading>
          <Text fontSize="12px" color="textSubtle">{`~${earningsDollarValue || 0} USD`}</Text>
        </Flex>
      </Flex>

      <Button
        mt="8px"
        onClick={handleHarvestConfirm}
        isLoading={pendingTx}
        endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
      >
        {pendingTx ? t('Confirming') : t('Confirm')}
      </Button>
      <Button variant="text" onClick={onDismiss} pb="0px">
        {('Close Window')}
      </Button>
    </Modal>
  )
}

export default CollectModal
