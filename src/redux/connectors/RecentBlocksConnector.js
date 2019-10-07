// @flow
import { connect } from 'react-redux'
import { RecentBlocksComponent,
  type RecentBlocksStateProps,
  type RecentBlocksDispatchProps
} from '../../components/RecentBlocks/RecentBlocks'
import { type Dispatch } from '../../types/types'
import { fetchChainInfo } from '../actions/blockActions'

const mapStateToProps = (state: any): RecentBlocksStateProps => {
  return {
    recentBlocks: state.chainInfo.recentBlocks
  }
}

const mapDispatchToProps = (dispatch: Dispatch): RecentBlocksDispatchProps => {
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
