// $flow
const configureMockStore = require('redux-mock-store').default
const eosjs = require('eosjs')
const blockActions = require('../../prep/redux/actions/blockActions')
const fetch = require('node-fetch')
const thunk = require('redux-thunk').default
const chai = require('chai')
const expect = chai.expect
chai.should()
// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const exclude = require('chai-exclude')
// const should = chai.should()

// const assert = chai.assert
// chai.use(chaiHttp)
// chai.use(exclude)

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
// const ENDPOINT = `https://api.eossweden.org`
// const rpc = new eosjs.JsonRpc(ENDPOINT, { fetch })
// const api = new Api({ rpc })

const mockChainInfoResponse = {
  server_version: '7c0b0d38',
  chain_id: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  head_block_num: 81986177,
  last_irreversible_block_num: 81985845,
  last_irreversible_block_id: '04e301353151d1f47d09f0b215fb73be838a2fcc78c00eb360336b80725df80f',
  head_block_id: '04e3028177b48e8b4c16d3cf09658ac074a93bfad405070f085f417cd6b0248c',
  head_block_time: '2019-09-29T22:52:16.000',
  head_block_producer: 'blockpooleos',
  virtual_block_cpu_limit: 200000000,
  virtual_block_net_limit: 1048576000,
  block_cpu_limit: 177695,
  block_net_limit: 1043024,
  server_version_string: 'v1.8.4',
  fork_db_head_block_num: 81986177,
  fork_db_head_block_id: '04e3028177b48e8b4c16d3cf09658ac074a93bfad405070f085f417cd6b0248c'
}

const mockBlockInfoResponse = {
  action_mroot: "0471ddd74606f6cae372d02babb5e0ad5556e86fbbf26838a4a2acf7c851c049",
  block_extensions: [],
  block_num: 81988866,
  confirmed: 0,
  header_extensions: [],
  id: "04e30d029ad5d18a908f3e79108008dee6f7531951f9a58c11e6de894fc40833",
  new_producers: null,
  previous: "04e30d01e6cabf0e5a91ecbecb073bd9c8b07e16a0b4d867d37e6757e3a2ca1a",
  producer: "starteosiobp",
  producer_signature: "SIG_K1_KANYnWJBapjmUkckFov2juiuvtBX1ZnaiYuRJbWj3RfusdUiHEs6yHF5uRKgLRaTzCbYaxF5fs2oH6kBvPVqVT7gYiJPdz",
  ref_block_prefix: 2034143120,
  schedule_version: 1379,
  timestamp: "2019-09-29T23:14:42.500",
  transaction_mroot: "96334016bf60da2dfe5a30aa8a3455e9298cfb144978f5d1fde473d3af298fb5",
  transactions: []
}

const mockServiceCreator = (body, succeeds = true) => () =>
  new Promise((resolve, reject) => {
    setTimeout(() => (succeeds ? resolve(body) : reject(body)), 10)
  })

  describe('fetch recent block info', () => {
    let store
    // set up a fake store for all our tests
    beforeEach(() => {
      store = mockStore({
        chainInfo: {
          chainInfo: {

          },
          recentBlocks: {

          }
        }
       })
    })

    describe('when the app requests the chain_info', () => {
      it('returns a valid chain_info response from block producer', () =>
        store
          .dispatch(blockActions.fetchChainInfo(mockServiceCreator(mockChainInfoResponse)))
          .then((res) => {
            // expect(store.getActions()[0]).to.deep.equal({ type: 'CHAIN_INFO', data: mockChainInfoResponse })
            res.block_cpu_limit.should.be.a('number')
            res.block_net_limit.should.be.a('number')
            res.chain_id.should.be.a('string')
            res.fork_db_head_block_id.should.be.a('string')
            res.fork_db_head_block_num.should.be.a('number')
            res.head_block_id.should.be.a('string')
            res.head_block_num.should.be.a('number')
            res.head_block_producer.should.be.a('string')
            res.head_block_time.should.be.a('string')
            res.last_irreversible_block_id.should.be.a('string')
            res.last_irreversible_block_num.should.be.a('number')
            res.server_version.should.be.a('string')
            res.server_version_string.should.be.a('string')
            res.virtual_block_cpu_limit.should.be.a('number')
            res.virtual_block_net_limit.should.be.a('number')
          })
        )
      })

      describe('when the app requests the block_info', () => {
        it('returns a valid block_info response from block producer', () =>
          store
            .dispatch(blockActions.fetchBlockInfo(81988866))
            .then((res) => {
              res.action_mroot.should.be.a('string')
              res.block_extensions.should.be.a('array')
              res.block_num.should.be.a('number')
              res.confirmed.should.be.a('number')
              res.header_extensions.should.be.a('array')
              res.id.should.be.a('string')
              res.previous.should.be.a('string')
              res.producer.should.be.a('string')
              res.producer_signature.should.be.a('string')
              res.ref_block_prefix.should.be.a('number')
              res.schedule_version.should.be.a('number')
              res.timestamp.should.be.a('string')
              res.transaction_mroot.should.be.a('string')
              res.transactions.should.be.a('array')
            })
          )
        })
    })
