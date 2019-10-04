// @flow

import { Dispatch as ReduxDispatch, ThunkDispatch } from 'redux'
export type Action = { type: string, data?: any }

export interface State {

  theme: any,
  sidebar: {
    show: boolean,
    collapse: boolean
  }
}

export type Dispatch = ReduxDispatch<Action> & ThunkDispatch<Action>

export type GetState = () => State

export type FunctionType = (...args: any[]) => any

export type ChainInfo = {
  "server_version": string,
  "chain_id": string,
  "head_block_num": number,
  "last_irreversible_block_num": number,
  "last_irreversible_block_id":"04d8928a87b18145459d36f5ab1988ffda29754e3657b4cd8c833902798546a1",
  "head_block_id": string,
  "head_block_time": string,
  "head_block_producer": string,
  "virtual_block_cpu_limit": number,
  "virtual_block_net_limit": number,
  "block_cpu_limit": number,
  "block_net_limit": number,
  "server_version_string": string,
  "fork_db_head_block_num": number,
  "fork_db_head_block_id": string
}

export type TransactionActions = {
  "account": string,
  "name": string,
  "authorization": [
      {
          "actor": string,
          "permission": string
      }
  ],
  "data": {
      "account": string,
      "content": string
  },
  "hex_data": string
}

export type TRX = {
  id: string,
  signatures: Array<string>,
  compression: string,
  "compression": "none",
  "packed_context_free_data": "",
  "context_free_data": [],
  "packed_trx": "a02e8c5d69f3fb453a100000000001e08f390d9b362fad00000000a44b91ba01308610818431ee3c00000000a8ed32326b308610818431ee3c62317c68624d3243414d63645a39784c6d726a4c6d4c6c4f46446c674b6f7a43564c364c464d50645a776f4c6c7a6a4c70396c6470596d67464c364c464d45667155734232616f4f636a615063443550636e6150474c325057447a5157546c69543d3d00",
  "transaction": {
      "expiration": "2019-09-26T03:21:04",
      "ref_block_num": 62313,
      "ref_block_prefix": 272254459,
      "max_net_usage_words": 0,
      "max_cpu_usage_ms": 0,
      "delay_sec": 0,
      "context_free_actions": [],
      "actions": Array<TransactionActions>,
      "transaction_extensions": Array<mixed>
  }
}

export type Transaction = {
  status: string,
  cpu_usage_us: number,
  net_usage_words: number,
  trx: string | TRX
}

export type BlockInfo = {
    "timestamp": string,
    "producer": string,
    "confirmed": number,
    "previous": string,
    "transaction_mroot": string,
    "action_mroot": string,
    "schedule_version": number,
    "new_producers": null,
    "header_extensions": [],
    "producer_signature": string,
    "transactions": Array<Transaction>,
    "block_extensions": [],
    "id": string,
    "block_num": number,
    "ref_block_prefix": number
}