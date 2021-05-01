import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, Flex } from 'easybake-uikit'
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

const CardImage = styled.img`
  margin-bottom: 16px;
`

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
              address: '0x95b3B3E534DA76CBa9DEd682eedf8724eF8e38aB',
              symbol: 'OVEN',
              decimals: '18',
              // Need to fix Icon - might be due to testnet*
              image: 'https://raw.githubusercontent.com/EasybakeSwap/easybake-bakery-frontend/prod/public/logo.png',
            },
          },
        })

        if (wasAdded) {
          console.log('Token was added')
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
          <Button scale="sm" onClick={addWatchOvenToken}>
            Add Oven Token
            <img
              style={{ marginLeft: 8}}
              width={20}
              height={20}
              src="/images/wallet/metamask.png"
              alt=""
            />
          </Button>
          </Flex>
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              width="100%"
            >
              {pendingTx ? 'Collecting OVEN' : `CLAIM (${balancesWithValue.length})`}
            </Button>
          ) : (
            <UnlockButton width="100%" />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
