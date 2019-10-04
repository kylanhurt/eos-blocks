// @flow
import type { Dispatch, GetState } from '../../types.js'
import { JsonRpc } from 'eosjs'
// import type { ChainInfo, BlockInfo } from '../../types/types'
import fetch from 'node-fetch'

// theoretically could use an array of BP's and locally use algorithm
// to rate them based on speed and reliability... wouldn't want to
// only rely upon one block producer
const ENDPOINT = `https://api.eossweden.org` // https://api.eosnewyork.io
const rpc = new JsonRpc(ENDPOINT, { fetch })

export const fetchRecentBlocks = () => async (dispatch: Dispatch, getState: GetState) => {
  try {
    const chainInfoResponse = await fetchChainInfo()
    const latestBlockNumber = chainInfoResponse.head_block_num
    const recentBlockPromises = {}
    for (let iterator = 0; iterator <= 10; iterator++) {
      const blockNum = latestBlockNumber - iterator
      recentBlockPromises[blockNum] = await dispatch(fetchBlockInfo(blockNum))
    }
    await Promise.all(Object.values(recentBlockPromises))
  } catch (e) {

  }
}

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
    return chainInfoResponse
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
    return blockInfoResponse
  } catch (e) {

  }
}

export const fetchTransactionInfo = (trx: string, blockNumHint: number) => async (dispatch: Dispatch, getState: GetState) => {
  try {
    const transactionInfoResponse = await rpc.get_transaction(trx, )
    dispatch({
      type: 'BLOCK_INFO',
      data: transactionInfoResponse
    })
    return transactionInfoResponse
  } catch (e) {

  }
}

export const fetchAccountAbi = (account: string) => async (dispatch: Dispatch, getState: GetState) => {
  try {
    const accountAbiResponse = await rpc.get_abi(account)
    dispatch({
      type: 'ACCOUNT_ABI',
      data: accountAbiResponse
    })
    return accountAbiResponse
  } catch (e) {

  }
}

export const fetchMultipleAccountAbis = (accounts: Array<string>) => async (dispatch: Dispatch, getState: GetState) => {
  try {
    const fetchMultipleAccountAbisPromises = {}
    const accountAbis = {}
    accounts.forEach(account => {
      fetchMultipleAccountAbisPromises[account] = rpc.get_abi(account)
    })
    const accountAbiResponses = await Promise.all(Object.values(fetchMultipleAccountAbisPromises))
    accountAbiResponses.forEach(res => {
      res.abi.actions.forEach(action => {
        if (action.ricardian_contract) {
          // console.log('ricardian contract present, abi: ', res.abi)
          console.log('ricardian contract present: ', action.ricardian_contract)
        }
      })
      accountAbis[res.account_name] = res.abi
    })
    dispatch({
      type: 'MULTIPLE_ACCOUNT_ABIS',
      data: accountAbis
    })
    return accountAbis
  } catch (e) {

  }
}