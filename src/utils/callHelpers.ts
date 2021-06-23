import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import { ethers } from 'ethers'
import { Pair, TokenAmount, Token } from 'easybakeswap-sdk'
import { getLpContract, getMasterchefContract } from 'utils/contractHelpers'
import farms from 'config/constants/farms'
import { getAddress, getOvenAddress } from 'utils/addressHelpers'
import tokens from 'config/constants/tokens'
import pools from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import { multicallv2 } from './multicall'
import { web3WithArchivedNodeProvider } from './web3'
import { getBalanceAmount } from './formatBalance'
import { BIG_TEN, BIG_ZERO } from './bigNumber'

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const stake = async (masterChefContract, pid, amount, account) => {
  if (pid === 0) {
    return masterChefContract.methods
      .enterStaking(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
      .send({ from: account, gas: DEFAULT_GAS_LIMIT })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }

  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStake = async (sousChefContract, amount, decimals = 18, account) => {
  return sousChefContract.methods
    .deposit(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStakeEth = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit()
    .send({
      from: account,
      gas: DEFAULT_GAS_LIMIT,
      value: new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(),
    })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  if (pid === 0) {
    return masterChefContract.methods
      .leaveStaking(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
      .send({ from: account, gas: DEFAULT_GAS_LIMIT })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }

  return masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousUnstake = async (sousChefContract, amount, decimals, account) => {
  return sousChefContract.methods
    .withdraw(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousEmergencyUnstake = async (sousChefContract, account) => {
  return sousChefContract.methods
    .emergencyWithdraw()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvest = async (masterChefContract, pid, account) => {
  if (pid === 0) {
    return masterChefContract.methods
      .leaveStaking('0')
      .send({ from: account, gas: DEFAULT_GAS_LIMIT })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }

  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvest = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit('0')
    .send({ from: account, gas: DEFAULT_GAS_LIMIT })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvestEth = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, gas: DEFAULT_GAS_LIMIT, value: BIG_ZERO })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
const ovenEthPid = 1
const ovenEthFarm = farms.find((farm) => farm.pid === ovenEthPid)

const OVEN_TOKEN = new Token(chainId, getOvenAddress(), 18)
const WETH_TOKEN = new Token(chainId, tokens.weth.address[chainId], 18)
const OVEN_ETH_TOKEN = new Token(chainId, getAddress(ovenEthFarm.lpAddresses), 18)

/**
 * Returns the total OVEN staked in the OVEN-HT LP
 */
export const getUserStakeInOvenEthLp = async (account: string, block?: number) => {
  try {
    const masterContract = getMasterchefContract(web3WithArchivedNodeProvider)
    const ovenEthContract = getLpContract(getAddress(ovenEthFarm.lpAddresses), web3WithArchivedNodeProvider)
    const totalSupplyLP = await ovenEthContract.methods.totalSupply().call(undefined, block)
    const reservesLP = await ovenEthContract.methods.getReserves().call(undefined, block)
    const ovenEthBalance = await masterContract.methods.userInfo(ovenEthPid, account).call(undefined, block)

    const pair: Pair = new Pair(
      new TokenAmount(OVEN_TOKEN, reservesLP._reserve0.toString()),
      new TokenAmount(WETH_TOKEN, reservesLP._reserve1.toString()),
    )
    const ovenLPBalance = pair.getLiquidityValue(
      pair.token0,
      new TokenAmount(OVEN_ETH_TOKEN, totalSupplyLP.toString()),
      new TokenAmount(OVEN_ETH_TOKEN, ovenEthBalance.amount.toString()),
      false,
    )

    return new BigNumber(ovenLPBalance.toSignificant(18))
  } catch (error) {
    console.error(`OVEN-HT LP error: ${error}`)
    return BIG_ZERO
  }
}

/**
 * Gets the oven staked in the main pool
 */
export const getUserStakeInOvenPool = async (account: string, block?: number) => {
  try {
    const masterContract = getMasterchefContract(web3WithArchivedNodeProvider)
    const response = await masterContract.methods.userInfo(0, account).call(undefined, block)

    return getBalanceAmount(new BigNumber(response.amount))
  } catch (error) {
    console.error('Error getting stake in OVEN pool', error)
    return BIG_ZERO
  }
}

/**
 * Returns total staked value of active pools
 */
export const getUserStakeInPools = async (account: string, block?: number) => {
  try {
    const multicallOptions = {
      web3: web3WithArchivedNodeProvider,
      blockNumber: block,
      requireSuccess: false,
    }
    const eligiblePools = pools
      .filter((pool) => pool.sousId !== 0)
      .filter((pool) => pool.isFinished === false || pool.isFinished === undefined)

    // Get the ending block is eligible pools
    const endBlockCalls = eligiblePools.map((eligiblePool) => ({
      address: getAddress(eligiblePool.contractAddress),
      name: 'bonusEndBlock',
    }))
    const startBlockCalls = eligiblePools.map((eligiblePool) => ({
      address: getAddress(eligiblePool.contractAddress),
      name: 'startBlock',
    }))
    const endBlocks = await multicallv2(sousChefABI, endBlockCalls, multicallOptions)
    const startBlocks = await multicallv2(sousChefABI, startBlockCalls, multicallOptions)

    // Filter out pools that have ended
    const activePools = eligiblePools.filter((eligiblePool, index) => {
      const endBlock = new BigNumber(endBlocks[index])
      const startBlock = new BigNumber(startBlocks[index])

      return startBlock.lte(block) && endBlock.gte(block)
    })

    // Get the user info of each pool
    const userInfoCalls = activePools.map((activePool) => ({
      address: getAddress(activePool.contractAddress),
      name: 'userInfo',
      params: [account],
    }))
    const userInfos = await multicallv2(sousChefABI, userInfoCalls, multicallOptions)

    return userInfos.reduce((accum: BigNumber, userInfo) => {
      return accum.plus(new BigNumber(userInfo.amount._hex))
    }, new BigNumber(0))
  } catch (error) {
    console.error('Error fetching staked values:', error)
    return BIG_ZERO
  }
}
