// @flow
import React from 'react'

type TransactionRowProps = {
  tx: Object,
  blockNum: number,
  fetchTransactionInfo: (trx: string, blockNum: number) => void
}

type TransactionRowState = {

}
export class TransactionRowComponent extends React.Component<TransactionRowProps, TransactionRowState> {
  onTransactionRowClicked = () => {
    const { fetchTransactionInfo, blockNum, tx } = this.props
    fetchTransactionInfo(tx.trx, blockNum)
  }

  render () {
    const { tx } = this.props
    return (
      <div onClick={this.onTransactionRowClicked}>
        <span>{tx.trx.id}</span>
      </div>
    )
  }
}