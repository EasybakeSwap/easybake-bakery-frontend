import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex } from 'easybake-uikit'
import { IcingButtonLG, BaseButtonLG } from 'components/IcingButton/sizes/LG'
import { useWeb3React } from '@web3-react/core'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import OvenHarvestBalance from './OvenHarvestBalance'
import CakeWalletBalance from './OvenWalletBalance'

const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/lilac.png');
  background-repeat: no-repeat;
  background-position: center;
  min-height: 180px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

// const CardImage = styled.img`
//   margin-bottom: 16px;
// `

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  /* Prompts the OVEN token suggestion in MetaMask */
  const addWatchOvenToken = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const provider = window.ethereum
    if (provider) {
      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await provider.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              // Rinkeby address
              address: '0x6be759Bd2808b869b821AE5d8184e2eFfe5eF396', // June 7th 2021
              symbol: 'OVEN',
              decimals: '18',
              image: 'https://easybake.finance/favicon.ico',
            },
          },
        })

        if (wasAdded) {
          // TODO: alert added 
        }
      } catch (error) {
        // TODO: find a way to handle when the user rejects transaction or it fails
      }
    }
  }, [])

  return (
    <StyledFarmStakingCard>
      <CardBody>
      <Heading size="xl" mb="24px" style={{ textAlign: 'center' }}>
          EasyBake $OVEN
        </Heading>
        {/* <CardImage src="/images/OVEN.svg" alt="OVEN logo" width={64} height={64} /> */}
        <Block style={{ textAlign: 'center' }}>
          <OvenHarvestBalance />
          <Label style={{ textAlign: 'center' }}>OVEN to Claim</Label>
        </Block>
        <Block style={{ textAlign: 'center' }}>
          <CakeWalletBalance />
          <Label style={{ textAlign: 'center' }}>OVEN in Wallet</Label>
        </Block>
        <br/>
        <Flex justifyContent="center">
          <BaseButtonLG btnName='Add Oven Token' onClick={addWatchOvenToken}>
            {/* Add Oven Token
            <img
              style={{ marginLeft: 8}}
              width={20}
              height={20}
              src="/images/farms/oven-eth.svg"
              alt=""
            /> */}
          </BaseButtonLG>
          </Flex>
        <Actions>
          {account ? (
            <Flex justifyContent="center">
              <IcingButtonLG 
                btnName={`Claim all (${balancesWithValue.length})`}
                isLoading={pendingTx}
                isDisabled={balancesWithValue.length <= 0}
                onClick={harvestAllFarms}
              />
            </Flex>
          ) : (
            <Flex justifyContent="center">
              <UnlockButton scale="12.5rem"/>
            </Flex>
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
