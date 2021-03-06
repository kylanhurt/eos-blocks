// @flow

import React, { Fragment } from 'react'
import { Button, Collapse } from 'reactstrap'
import { RicardianContractFactory } from 'ricardian-template-toolkit'
import Parser from 'html-react-parser'
import { type RicardianContractConfig, type RicardianContract } from '../../types/types'
import { ellipsizeString } from '../../utils/utils'
import { strings as s } from '../../locales/string'

export type RecentBlocksRowDispatchProps = {
  fetchAccountAbi: (account: string) => void,
  fetchMultipleAccountAbis: (accounts: Array<string>) => void,
}

export type RecentBlocksRowOwnProps = {
  key: string,
  block: Object // needs elaboration
}

export type RecentBlocksRowStateProps = {
  accountAbis: Object,
}

export type RecentBlocksRowProps = RecentBlocksRowDispatchProps & RecentBlocksRowStateProps & RecentBlocksRowOwnProps

export type RecentBlocksRowState = {
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

  _downloadOutputFile = () => {
    const { block } = this.props
    const element = document.createElement('a')
    const file = new Blob([JSON.stringify(block)], { type: 'application/json' })
    element.href = URL.createObjectURL(file)
    element.download = `blockOutput-${block.block_num}-${block.id.substring(0, 10)}.json`
    element.click()
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
            const accountAbi = accountAbis[txAction.account]
            if (accountAbi) {
              const abiAction = accountAbi.actions.find(abiAction => {
                return txAction.name === abiAction.name
              })
              if (abiAction.ricardian_contract) {
                const config: RicardianContractConfig = {
                  abi: accountAbi,
                  transaction: transaction.trx.transaction,
                  actionIndex: index,
                  maxPasses: 3,
                  // necessary because it appears some contracts do not have
                  // proper metadata defined
                  allowUnusedVariables: true
                }
                const ricardianContract: RicardianContract = factory.create(config)
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
          <td className={'blockId'}>{block.id}</td>
          <td>{block.transactions.length}</td>
          <td>{block.actionCount}</td>
          <td>{block.date}</td>
          <td className={'hideShowButtonArea'}>
            <Button color="primary" onClick={this.toggle} className={'toggleButton'}>
              <span className={'hideShowButtonText'}>{isExpanded ? s.recent_blocks_hide : s.recent_blocks_show}</span>
            </Button>
          </td>
        </tr>
        <tr style={{ display: isExpanded ? 'table-row' : 'none' }}>
          <td colSpan='12'>
            <Collapse isOpen={isExpanded}>
              <div className={'blocksOutputArea'}>
                <div><strong>{s.recent_blocks_block_output}</strong>: {ellipsizeString(JSON.stringify(block), 140)}   (<strong onClick={this._downloadOutputFile} className={'downloadBlockOutputButton'}>{s.recent_blocks_download_output}</strong>)</div>
              </div>
              <div className={'ricardianContractTitleArea'}>
                <div>
                  <h3>{s.recent_blocks_ricardian_contracts}:</h3>
                  {ricardianContractMarkup.map(contract => (
                    Parser(contract.html)
                  ))}
                </div>
              </div>
            </Collapse>
          </td>
        </tr>
      </Fragment>
    )
  }
}
