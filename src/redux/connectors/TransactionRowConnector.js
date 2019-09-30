// @flow
import { connect } from 'react-redux'
import { TransactionRowComponent } from '../../containers/TransactionRow/TransactionRow'
import { fetchTransactionInfo } from '../actions/blockActions'

const mapStateToProps = (state: any) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChainInfo: (trx: string, blockNumHint: number) => {
      dispatch(fetchTransactionInfo(trx, blockNumHint))
    }
  }
}

export const TransactionRowConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionRowComponent)