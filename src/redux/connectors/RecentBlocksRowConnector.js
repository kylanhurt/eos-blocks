// @flow
import { connect } from 'react-redux'
import { RecentBlocksRowComponent } from '../../components/RecentBlocks/RecentBlocksRow'
import { fetchAccountAbi, fetchMultipleAccountAbis } from '../actions/blockActions'

const mapStateToProps = (state: any) => {
  return {
    accountAbis: state.chainInfo.accountAbis
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAccountAbi: (account: string) => {
      dispatch(fetchAccountAbi(account))
    },
    fetchMultipleAccountAbis: (accounts: Array<string>) => {
      dispatch(fetchMultipleAccountAbis(accounts))
    }
  }
}

export const RecentBlocksRowConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentBlocksRowComponent)