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
      it('returns a valid response from block producer', () =>
        store
          .dispatch(blockActions.fetchChainInfo(mockServiceCreator(mockChainInfoResponse)))
          .then((res) => {
            console.log(store.getActions())
            // expect({ type: 'CHAIN_INFO', data: mockChainInfoResponse }).to.be.oneOf(store.getActions())
            console.log('res is ', res)
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
    })

      // describe('when login succeeds and OTP is required', () => {

      //   it('dispatches action to store phone numbers and updates the route', () => {
      //     const actions = store.getActions()
      //     const { phoneNumbers } = RESPONSE_BODY
      //     expect(actions).toContainEqual({
      //       type: ACTION_STORE_PHONE_NUMBERS,
      //       payload: { phoneNumbers },
      //     })
      //     expect(actions).toContainEqual(push('/select-otp-delivery'))
      //   })
      // })

// describe('poolRoutes return correct info', () => {
//   describe('/GET block data', () => {
//     it('/pool/block should return most recent pool block data', (done) => {
//       chai.request(server)
//         .get('/pool/block')
//         .end((err, res) => {
//             res.should.have.status(200)
//             res.body.should.be.a('object')
//             res.body.height.should.be.a('number')
//             res.body.height.should.be.above(0)
//             res.body.timestamp.should.be.a('number')
//             res.body.timestamp.should.be.above(1500000000)
//           done()
//         })
//     })
//   })