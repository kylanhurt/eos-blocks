// @flow
import React, { Fragment } from 'react'
import { Col, Card, CardBody, Table, Button, Collapse } from 'reactstrap'
import { TransactionRowConnector } from '../../redux/connectors/TransactionRowConnector'
export type RecentBlocksStateProps = {
  recentBlocks: Object
}

export type RecentBlocksDispatchProps = {
  fetchChainInfo: () => void
}

export type RecentBlocksProps = RecentBlocksStateProps & RecentBlocksDispatchProps
export class RecentBlocksComponent extends React.Component<RecentBlocksProps> {
  componentDidMount (){
    const { fetchChainInfo } = this.props
    fetchChainInfo()
  }

  render () {
    const { recentBlocks } = this.props
    const blockList = []
    const blockNumbers = Object.keys(recentBlocks)
    const maxBlockNumber = Math.max(...blockNumbers.map(blockNumString => parseInt(blockNumString)))
    for (const blockNumber in recentBlocks) {
      if (parseInt(blockNumber) < maxBlockNumber - 9) continue
      const currentBlock = recentBlocks[blockNumber]
      const date = new Date(currentBlock.timestamp)
      // time to count actions per block
      let actionCount = 0
      currentBlock.transactions.forEach(transaction => {
        if (transaction.trx.transaction) {
          actionCount += transaction.trx.transaction.actions.length
        }
      })
      blockList.push({
        ...currentBlock,
        date: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
        actionCount
      })
    }
    blockList.sort((a, b) => b.block_num - a.block_num)
    return (
      <Col md={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Recent Blocks</h5>
            </div>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Hash</th>
                  <th>Transactions</th>
                  <th>Actions</th>
                  <th>Date</th>
                  <th>Expand</th>
                </tr>
              </thead>
              <tbody>
                {blockList.map(block => (
                  <RecentBlocksRow key={block.block_num} block={block} />
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

type RecentBlocksRowProps = {
  block: Object
}

type RecentBlocksRowState = {
  isExpanded: boolean
}

export class RecentBlocksRow extends React.Component<RecentBlocksRowProps, RecentBlocksRowState> {
  constructor (props: RecentBlocksRowProps) {
    super(props)
    this.state = {
      isExpanded: false
    }
  }

  toggle = () => {
    const { isExpanded } = this.state
    this.setState({
      isExpanded: !isExpanded
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
          <td colSpan='6'>
            <Collapse isOpen={isExpanded}>
              {block.transactions.map(tx => (
                <TransactionRowConnector tx={tx} key={tx.trx.id || tx.trx} blockNum={block.block_num} />
              ))}
            </Collapse>
          </td>
        </tr>
      </Fragment>
    )
  }
}
