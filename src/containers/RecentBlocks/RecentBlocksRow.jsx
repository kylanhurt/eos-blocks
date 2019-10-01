// @flow

import React, { Fragment } from 'react'
import { Button, Collapse } from 'reactstrap'
import { RicardianContractFactory, getContractTextFromAbi, getMetadataAndContent } from 'ricardian-template-toolkit'
import Parser from 'html-react-parser'

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
    const { block, accountAbis } = this.props
    const { isExpanded } = this.state
    const ricardianContractMarkup = []
    if (isExpanded) {
      const factory = new RicardianContractFactory()

      // const ricardianContracts = []
      for (const transaction of block.transactions) {
        if (transaction.trx.transaction) {
          transaction.trx.transaction.actions.forEach((txAction, index) => {
            // ricardianContracts.push({
            //   name: action.name,
            //   account: action.account
            // })
            const accountAbi = accountAbis[txAction.account]
            if (accountAbi) {
              const abiAction = accountAbi.actions.find(abiAction => {
                return txAction.name === abiAction.name
              })
              if (abiAction.ricardian_contract) {
                const config = {
                  abi: accountAbi,
                  transaction: transaction.trx.transaction,
                  actionIndex: index,
                  maxPasses: 3,
                  // necessary because it appears some contracts do not have
                  // proper metadata defined
                  allowUnusedVariables: true
                }
                const ricardianContract = factory.create(config)
                const metadata = ricardianContract.getMetadata()
                const html = ricardianContract.getHtml()
                ricardianContractMarkup.push({ html, metadata })
              }
            }
          })
        }
      }
    }

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
              {ricardianContractMarkup.map(contract => (
                Parser(contract.html)
              ))}
            </Collapse>
          </td>
        </tr>
      </Fragment>
    )
  }
}
