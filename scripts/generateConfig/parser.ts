import { PoolConfig, FarmConfig } from 'config/constants/types'
import { SettingsType } from './types'

export const getPools = (data) => {
  const pools: PoolConfig = data.map((pool) => {
    return {
      sousId: pool.sous_id,
      tokenName: pool?.token?.name,
      stakingTokenName: pool?.quote_token?.name,
      stakingLimit: pool?.staking_limit,
      stakingTokenAddress: pool?.quote_token?.mainnet_address,
      contractAddress: {
        1: pool.contract_address,
        4: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      },
      poolCategory: pool.category,
      projectLink: pool.project_url,
      harvest: pool.harvest,
      tokenPerSecond: pool.token_per_second,
      sortOrder: pool.ranking,
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
        1: farm.lp_mainnet_address,
        4: '0xE66790075ad839978fEBa15D4d8bB2b415556a1D',
      },
      tokenSymbol: farm?.token?.symbol,
      tokenAddresses: {
        1: farm?.token?.mainnet_address,
        4: '0xa35062141fa33bca92ce69fed37d0e8908868aae',
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
    POOL: () => getPools(data),
    FARM: () => getFarms(data),
  }

  const factory = () => {
    return handler[type]()
  }

  return factory()
}
