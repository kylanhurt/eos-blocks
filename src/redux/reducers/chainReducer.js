// @flow

import type { ChainInfo, BlockInfo, Abi, RecentBlocks } from '../../types/types'
import { combineReducers } from 'redux'

const chainInfo = (state: ChainInfo = {}, action: { type: string, data: ChainInfo }): ChainInfo => {
  switch (action.type) {
    case 'CHAIN_INFO':
      return action.data
    default:
      return state
  }
}

const recentBlocks = (state: RecentBlocks = {}, action: { type: string, data: BlockInfo }): RecentBlocks => {
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

export type AccountAbis = {[string]: Abi}
type SingleAccountAbiAction = { type: string, data: {account_name: string, abi: Abi}}
type MultipleAccountAbiAction = { type: string, data: {[string]: Abi }}

const accountAbis = (state: AccountAbis = {}, action): AccountAbis => {
  switch (action.type) {
    case 'ACCOUNT_ABI':
      const singleAction: SingleAccountAbiAction = action
      return {
        ...state,
        [singleAction.data.account_name]: singleAction.data.abi
      }
    case 'MULTIPLE_ACCOUNT_ABIS':
      const multipleAction: MultipleAccountAbiAction = action
      return {
        ...state,
        ...multipleAction.data
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
