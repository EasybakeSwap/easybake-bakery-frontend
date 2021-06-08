import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal } from 'easybake-uikit'
import { IcingButtonLG } from 'components/IcingButton/sizes/LG'
import ModalActions from 'components/ModalActions'
import ModalInput from 'components/ModalInput'
import { getFullDisplayBalance } from 'utils/formatBalance'

interface WithdrawModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ onConfirm, onDismiss, max, tokenName = '' }) => {
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
    <Modal title='Take Out DOUGH LP Tokens' onDismiss={onDismiss}>
      <ModalInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={fullBalance}
        symbol={tokenName}
        inputTitle='Stop Baking DOUGH'
      />
      <ModalActions>
      <IcingButtonLG
          btnName='Confirm'
          isLoading={pendingTx}
          isDisabled={!valNumber.isFinite() || valNumber.eq(0) || valNumber.gt(fullBalanceNumber)}
          onClick={async () => {
            setPendingTx(true)
            try {
              await onConfirm(val)
            } catch (error) {
              // TODO: find a way to handle when the user rejects transaction or it fails
            } finally {
              setPendingTx(false)
              onDismiss()
            }
          }}
        />
        <Button variant="secondary" onClick={onDismiss} width="100%">
          Cancel
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default WithdrawModal
