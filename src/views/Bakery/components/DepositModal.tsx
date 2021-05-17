import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal, LinkExternal } from 'easybake-uikit'
import ModalActions from 'components/ModalActions'
import ModalInput from 'components/ModalInput'
import { getFullDisplayBalance } from 'utils/formatBalance'

interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  addLiquidityUrl?: string
}

const DepositModal: React.FC<DepositModalProps> = ({ max, onConfirm, onDismiss, tokenName = '', addLiquidityUrl }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const valNumber = new BigNumber(val)
  const fullBalanceNumber = new BigNumber(fullBalance)

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal title='Bake DOUGH LP Tokens' onDismiss={onDismiss}>
      <ModalInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
        addLiquidityUrl={addLiquidityUrl}
        inputTitle='Bake'
      />
      <ModalActions>
        <Button
          width="100%"
          disabled={pendingTx || !valNumber.isFinite() || valNumber.eq(0) || valNumber.gt(fullBalanceNumber)}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? 'Pending' : 'Confirm'}
        </Button>
        <Button variant="secondary" onClick={onDismiss} width="100%">
          Cancel
        </Button>
      </ModalActions>
      <LinkExternal href={addLiquidityUrl} style={{ alignSelf: 'center' }}>
        Get {tokenName} Tokens
      </LinkExternal>
    </Modal>
  )
}

export default DepositModal
