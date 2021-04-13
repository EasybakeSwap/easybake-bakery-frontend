import { PoolConfig, FarmConfig } from '../../src/config/constants/types'
import { SettingsType } from './types'


export const getPools = (data) => {
  const pools: PoolConfig = data.map((pool) => {
    return {
      sousId: pool._id,
      tokenName: pool?.token?.name,
      stakingTokenName: pool?.quote_token?.name,
      stakingLimit: pool?.quote_token?.decimals,
      stakingTokenAddress: pool?.quote_token?.mainnet_address,
      contractAddress: {
        4: pool.contract_address,
        1: '', // sousChef
      },
      poolCategory: pool.category,
      projectLink: pool.project_url,
      tokenPerBlock: pool.token_per_block,
      sortOrder: pool.ranking,
      harvest: pool.harvest,
      isFinished: pool.is_finished,
      tokenDecimals: pool?.token?.decimals,
    }
  })
  return pools
}

export const getFarms = (data) => {
  const farms: FarmConfig = data.map((farm) => {
    return {
      pid: farm.pid,
      lpSymbol: farm.lp_symbol,
      lpAddresses: {
        4: farm.lp_mainnet_address,
        1: '',
      },
      tokenSymbol: farm?.token?.symbol,
      tokenAddresses: {
        4: farm?.token?.mainnet_address,
        1: '',
      },
      quoteTokenSymbol: farm?.quote_token?.symbol,
      quoteTokenAdresses: farm?.quote_token?.mainnet_address,
      isCommunity: farm?.is_community,
    }
  })
  return farms
}

export const getFormattedData = (type: SettingsType, data) => {
  const handler = {
    FARM: () => getFarms(data),
  }

  const factory = () => {
    return handler[type]()
  }

  return factory()
}
