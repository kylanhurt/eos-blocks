// @flow
import { connect } from 'react-redux'
import {
  RecentBlocksRowComponent,
  type RecentBlocksRowStateProps,
  type RecentBlocksRowDispatchProps }
  from '../../components/RecentBlocks/RecentBlocksRow'
import { fetchAccountAbi, fetchMultipleAccountAbis } from '../actions/blockActions'
import { type Dispatch } from '../../types/types'

const mapStateToProps = (state: any): RecentBlocksRowStateProps => {
  return {
    accountAbis: state.chainInfo.accountAbis
  }
}

const mapDispatchToProps = (dispatch: Dispatch): RecentBlocksRowDispatchProps => {
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
