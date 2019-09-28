// @flow

import { Dispatch as ReduxDispatch } from 'redux'
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

export type Transaction = {
  status: string,
  cpu_usage_us: number,
  net_usage_words: number,
  trx: string
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