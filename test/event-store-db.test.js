const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const _ = require('lodash')
const EventStore = require('../src/event-store-db')
const EVENT_TYPES = require('../src/event-types')

chai.use(chaiAsPromised)
chai.should()

const expect = chai.expect
const STREAM_ID = 'bar'

describe('Event Store DB', function () {

  it('should store events and allow to read them', async function () {
    // given
    const store = new EventStore()
    const existingEvents = await store.get(STREAM_ID)
    const lastSeq = (_.last(existingEvents) && _.last(existingEvents).aggSeq) || 0
    const event = {
      aggId: STREAM_ID,
      type: EVENT_TYPES.JEWEL_ADDED,
      aggSeq: lastSeq + 1
    }
    await store.push(event)

    const readStore = new EventStore()

    // when
    const events = await readStore.get(STREAM_ID)

    // then
    _.last(events).should.deep.equal(event)
  })

  it('should raise error when using sequence already stored', async function () {
    // given
    const store = new EventStore()
    const existingEvents = await store.get(STREAM_ID)
    const lastExistingSeq = (_.last(existingEvents) && _.last(existingEvents).aggSeq) || 0
    const event = {
      aggId: STREAM_ID,
      type: EVENT_TYPES.JEWEL_ADDED,
      aggSeq: lastExistingSeq
    }

    // when
    await store.push(event).should.be.rejectedWith('Wrong expected version.')
  })
})
