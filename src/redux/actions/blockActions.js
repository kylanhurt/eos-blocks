// @flow
import type { Dispatch, GetState } from '../../types.js'
import { Api, JsonRpc, RpcError } from 'eosjs'
import type { ChainInfo, BlockInfo } from '../../types/types'
import fetch from 'node-fetch'

const ENDPOINT = `https://api.eosnewyork.io` // https://api.eossweden.org
const rpc = new JsonRpc(ENDPOINT, { fetch })
// const api = new Api({ rpc })

export const fetchChainInfo = () => async (dispatch: Dispatch, getState: GetState) => {
  try {
    const chainInfoResponse = await rpc.get_info()
    const latestBlockNumber = chainInfoResponse.head_block_num
    for (let iterator = 0; iterator <= 10; iterator++) {
      const blockNum = latestBlockNumber - iterator
      dispatch(fetchBlockInfo(blockNum))
    }
    dispatch({
      type: 'CHAIN_INFO',
      data: chainInfoResponse
    })
  } catch (e) {

  }
}


export const fetchBlockInfo = (blockNum: number) => async (dispatch: Dispatch, getState: GetState) => {
  try {
    const blockInfoResponse = await rpc.get_block(blockNum)
    dispatch({
      type: 'BLOCK_INFO',
      data: blockInfoResponse
    })
  } catch (e) {

  }
}