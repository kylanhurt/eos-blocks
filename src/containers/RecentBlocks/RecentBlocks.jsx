// @flow
import React, { Fragment } from 'react'
import { Col, Card, CardBody, Table, Button, Collapse } from 'reactstrap'

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

    for (const block in recentBlocks) {
      const currentBlock = recentBlocks[block]
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
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Hash</th>
                  <th>Actions</th>
                  <th>Date</th>
                  <th>Expand</th>
                </tr>
              </thead>
              <tbody>
                {blockList.map(block => (
                  <RecentBlocksRow block={block} />
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
        <tr key={block.block_num}>
          <td>{block.block_num}</td>
          <td>{block.id}</td>
          <td>{block.actionCount}</td>
          <td>{block.date}</td>
          <td><Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>{isExpanded ? 'Collapse' : 'Expand'}</Button></td>
        </tr>
        <tr style={{ display: isExpanded ? 'table-row' : 'none' }}>
          <td colspan='5'>
            <Collapse isOpen={isExpanded}>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </Collapse>
          </td>
        </tr>
      </Fragment>
    )
  }
}
