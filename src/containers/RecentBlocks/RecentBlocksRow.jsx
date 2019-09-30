// @flow
import React, { Fragment } from 'react'
import { Button, Collapse } from 'reactstrap'

type RecentBlocksRowProps = {
  block: Object,
  accountAbis: Object,
  fetchAccountAbi: (account: string) => void,
  fetchMultipleAccountAbis: (accounts: Array<string>) => void
}

type RecentBlocksRowState = {
  isExpanded: boolean
}

export class RecentBlocksRowComponent extends React.Component<RecentBlocksRowProps, RecentBlocksRowState> {
  constructor (props: RecentBlocksRowProps) {
    super(props)
    this.state = {
      isExpanded: false
    }
  }

  toggle = () => {
    const { isExpanded } = this.state
    const { block, accountAbis, fetchMultipleAccountAbis } = this.props
    this.setState({
      isExpanded: !isExpanded
    }, () => {
      const accounts = []
      for (const transaction of block.transactions) {
        if (transaction.trx.transaction) {
          for (const action of transaction.trx.transaction.actions) {
            if (!accountAbis[action.account]) accounts.push(action.account)
          }
        }
      }
      fetchMultipleAccountAbis(accounts)
    })

  }

  render () {
    const { block } = this.props
    const { isExpanded } = this.state
    return (
      <Fragment>
        <tr>
          <td>{block.block_num}</td>
          <td>{block.id}</td>
          <td>{block.transactions.length}</td>
          <td>{block.actionCount}</td>
          <td>{block.date}</td>
          <td style={{ textAlign: 'center' }}>
            <Button color="primary" onClick={this.toggle} style={{ width: 160, paddingRight: 0, paddingLeft: 0, marginBottom: '0px', float: 'none', marginLeft: 'auto', marginRight: 'auto' }}>
              <span style={{ width: '140px' }}>{isExpanded ? 'Hide' : 'Show'}</span>
            </Button>
          </td>
        </tr>
        <tr style={{ display: isExpanded ? 'table-row' : 'none' }}>
          <td colSpan='12'>
            <Collapse isOpen={isExpanded}>
              {JSON.stringify(block)}
            </Collapse>
          </td>
        </tr>
      </Fragment>
    )
  }
}
