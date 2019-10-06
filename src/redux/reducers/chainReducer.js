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

const accountAbis = (state = {}, action: { type: string, data: { account: string, abi: Object }}) => {
  switch (action.type) {
    case 'ACCOUNT_ABI':
      return {
        ...state,
        [action.data.account_name]: action.data.abi
      }
    case 'MULTIPLE_ACCOUNT_ABIS':
      return {
        ...state,
        ...action.data
      }
    default:
      return state
  }
}

export const chainReducer = combineReducers({
  chainInfo,
  recentBlocks,
  accountAbis
})
