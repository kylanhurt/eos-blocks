// @flow
import { connect } from 'react-redux'
import { RecentBlocksComponent } from '../../containers/RecentBlocks/RecentBlocks'
import { fetchChainInfo } from '../actions/blockActions'

const mapStateToProps = () => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchChainInfo: () => {
      dispatch(fetchChainInfo())
    }
  }
}

export const RecentBlocksConnector = connect(mapStateToProps, mapDispatchToProps)(RecentBlocksComponent)