// @flow
import type { ChainInfo, BlockInfo } from '../../types/types'
import { combineReducers } from 'redux'

const chainInfo = (state: ChainInfo = {}, action: { type: string, data: ChainInfo }): ChainInfo => {
  switch (action.type) {
    case 'CHAIN_INFO':
      return action.data
    default:
      return state
  }
}

const recentBlocks = (state: BlockInfo = {}, action: { type: string, data: BlockInfo }): BlockInfo => {
  switch (action.type) {
    case 'BLOCK_INFO':
      return {
        ...state,
        [action.data.block_num]: action.data
      }
    default:
      return state
  }
}

export default combineReducers({
  chainInfo,
  recentBlocks
})
