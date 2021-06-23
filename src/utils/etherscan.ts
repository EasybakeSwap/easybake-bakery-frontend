import { BASE_ETHERSCAN_URL } from 'config'

export const getEtherscanAddressUrl = (address: string) => {
  return `${BASE_ETHERSCAN_URL}/address/${address}`
}

export const getEtherscanTransactionUrl = (transactionHash: string) => {
  return `${BASE_ETHERSCAN_URL}/tx/${transactionHash}`
}

export const getEtherscanBlockNumberUrl = (block: string | number) => {
  return `${BASE_ETHERSCAN_URL}/block/${block}`
}

export const getEtherscanBlockCountdownUrl = (block: string | number) => {
  return `${BASE_ETHERSCAN_URL}/block/countdown/${block}`
}
