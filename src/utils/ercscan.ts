import { BASE_ETHERSCAN_URL } from 'config'

export const getErcScanAddressUrl = (address: string) => {
  return `${BASE_ETHERSCAN_URL}/address/${address}`
}

export const getErcScanTransactionUrl = (transactionHash: string) => {
  return `${BASE_ETHERSCAN_URL}/tx/${transactionHash}`
}

export const getErcScanBlockNumberUrl = (block: string | number) => {
  return `${BASE_ETHERSCAN_URL}/block/${block}`
}

export const getErcScanBlockCountdownUrl = (block: string | number) => {
  return `${BASE_ETHERSCAN_URL}/block/countdown/${block}`
}
