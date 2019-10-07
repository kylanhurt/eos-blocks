// $flow
const configureMockStore = require('redux-mock-store').default
const blockActions = require('../../../prep/redux/actions/blockActions')
const utils = require('../../utils/utils')
const thunk = require('redux-thunk').default
const chai = require('chai')
const expect = chai.expect
chai.should()

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

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

    // integration tests
    describe('when the app requests the chain_info', () => {
      it('returns a valid chain_info response from block producer', () =>
        store
          .dispatch(blockActions.fetchChainInfo())
          .then((res) => {
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

      // unit test
      describe('utility functions should work correctly', () => {
        it('ellipsizeString returns correct output', () => {
          const input = 'ABCDEFGHIJKLM1234567890'
          const expectedOutput = 'ABCD ... 7890'
          const actualOutput = utils.ellipsizeString(input, 8)
          expect(actualOutput).to.equal(expectedOutput)
        })
      })
    })
