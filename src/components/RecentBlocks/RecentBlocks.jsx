// @flow
import React from 'react'
import { Col, Card, CardBody, Table, Button } from 'reactstrap'
import { RecentBlocksRowConnector } from '../../redux/connectors/RecentBlocksRowConnector'
import { type BlockInfo } from '../../types/types'

export type RecentBlocksStateProps = {
  recentBlocks: {[string]: BlockInfo}
}

export type RecentBlocksDispatchProps = {
  fetchChainInfo: () => void
}

export type RecentBlocksProps = RecentBlocksStateProps & RecentBlocksDispatchProps
export class RecentBlocksComponent extends React.Component<RecentBlocksProps> {
  async componentDidMount () {
    const { fetchChainInfo } = this.props
    fetchChainInfo()
  }

  render () {
    const { recentBlocks, fetchChainInfo } = this.props
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
              <h3 className={'bold-text recentBlocksTitle'}>Recent Blocks</h3>
              <Button className={'reloadButton'} color="success" onClick={fetchChainInfo}>Refresh</Button>
            </div>
            <Table striped bordered hover responsive className={'recentBlocks'}>
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
                  <RecentBlocksRowConnector key={block.block_num} block={block} />
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    )
  }
}
