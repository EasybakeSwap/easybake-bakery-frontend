import React, { useState, useCallback } from 'react'
// import styled from 'styled-components'
// import { Button, useModal, IconButton, AddIcon, MinusIcon } from 'easybakeswap-uikit'
// import UnlockButton from 'components/UnlockButton'
// import { useWeb3React } from '@web3-react/core'
// import { useFarmUser } from 'state/hooks'
// import { FarmWithStakedValue } from 'views/Bakery/components/FarmCard/FarmCard'
// import { useApprove } from 'hooks/useApprove'
// import { getLpContract } from 'utils/web3'
// import weth from 'config/constants/contracts'
// import farms from 'config/constants/farms'
// import { BASE_ADD_LIQUIDITY_URL } from 'config'
// import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
// import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
// import useStake from 'hooks/useStake'
// import useUnstake from 'hooks/useUnstake'
// import useWeb3 from 'hooks/useWeb3'

// import DepositModal from '../DepositModal'
// import WithdrawModal from '../WithdrawModal'
// import { ActionContainer, ActionTitles, ActionContent, Earned, Title, Subtle } from './styles'

// const IconButtonWrapper = styled.div`
//   display: flex;
// `

// const Staked: React.FunctionComponent<FarmWithStakedValue> = ({
//   pid,
//   lpSymbol,
//   lpAddresses,
//   quoteTokenSymbol,
//   tokenAddresses,
// }) => {
//   const { account } = useWeb3React()
//   const [requestedApproval, setRequestedApproval] = useState(false)
//   const { allowance, tokenBalance, stakedBalance } = useFarmUser(pid)
//   const { onStake } = useStake(pid)
//   const { onUnstake } = useUnstake(pid)
//   const web3 = useWeb3()

//   const isApproved = account && allowance && allowance.isGreaterThan(0)
//   const lpAddress = lpAddresses[process.env.REACT_APP_CHAIN_ID]
//   const liquidityUrlPathParts = getLiquidityUrlPathParts({
//     quoteTokenAdresses: weth,
//     quoteTokenSymbol: farms[quoteTokenSymbol],
//     tokenAddresses: farms[tokenAddresses],
//   })

//   const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

//   const displayBalance = useCallback(() => {
//     const stakedBalanceNumber = getBalanceNumber(stakedBalance)
//     if (stakedBalanceNumber > 0 && stakedBalanceNumber < 0.0001) {
//       return getFullDisplayBalance(stakedBalance).toLocaleString()
//     }
//     return stakedBalanceNumber.toLocaleString()
//   }, [stakedBalance])

//   const [onPresentDeposit] = useModal(
//     <DepositModal max={tokenBalance} onConfirm={onStake} tokenName={lpSymbol} addLiquidityUrl={addLiquidityUrl} />,
//   )
//   const [onPresentWithdraw] = useModal(<WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={lpSymbol} />)

//   const lpContract = getLpContract(lpAddress)

//   const { onApprove } = useApprove(lpContract)

//   const handleApprove = useCallback(async () => {
//     try {
//       setRequestedApproval(true)
//       await onApprove()
//       setRequestedApproval(false)
//     } catch (e) {
//       console.error(e)
//     }
//   }, [onApprove])

//   if (!account) {
//     return (
//       <ActionContainer>
//         <ActionTitles>
//           <Subtle>START FARMING</Subtle>
//         </ActionTitles>
//         <ActionContent>
//           <UnlockButton width="100%" />
//         </ActionContent>
//       </ActionContainer>
//     )
//   }

//   if (isApproved) {
//     if (stakedBalance.gt(0)) {
//       return (
//         <ActionContainer>
//           <ActionTitles>
//             <Title>{lpSymbol} </Title>
//             <Subtle>STAKED</Subtle>
//           </ActionTitles>
//           <ActionContent>
//             <div>
//               <Earned>{displayBalance()}</Earned>
//             </div>
//             <IconButtonWrapper>
//               <IconButton variant="secondary" onClick={onPresentWithdraw} mr="6px">
//                 <MinusIcon color="primary" width="14px" />
//               </IconButton>
//               <IconButton variant="secondary" onClick={onPresentDeposit}>
//                 <AddIcon color="primary" width="14px" />
//               </IconButton>
//             </IconButtonWrapper>
//           </ActionContent>
//         </ActionContainer>
//       )
//     }

//     return (
//       <ActionContainer>
//         <ActionTitles>
//           <Subtle>STAKE </Subtle>
//           <Title>{lpSymbol}</Title>
//         </ActionTitles>
//         <ActionContent>
//           <Button size="md" onClick={onPresentDeposit} variant="secondary">
//             Stake LP
//           </Button>
//         </ActionContent>
//       </ActionContainer>
//     )
//   }

//   return (
//     <ActionContainer>
//       <ActionTitles>
//         <Subtle>ENABLE FARM</Subtle>
//       </ActionTitles>
//       <ActionContent>
//         <Button size="md" disabled={requestedApproval} onClick={handleApprove} variant="secondary">
//           Enable
//         </Button>
//       </ActionContent>
//     </ActionContainer>
//   )
// }

// export default Staked
