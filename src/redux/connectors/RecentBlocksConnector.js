// @flow
import { connect } from 'react-redux'
import { RecentBlocksComponent, type RecentBlocksStateProps } from '../../containers/RecentBlocks/RecentBlocks'
import { fetchChainInfo } from '../actions/blockActions'

const mapStateToProps = (state: any): RecentBlocksStateProps => {
  return {
    recentBlocks: state.chainInfo.recentBlocks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChainInfo: () => {
      dispatch(fetchChainInfo())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentBlocksComponent)