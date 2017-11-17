const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const EventStore = require('../src/event-store-db')
const EVENT_TYPES = require('../src/event-types')

chai.use(chaiAsPromised)
chai.should()

const expect = chai.expect

describe.only('Event Store DB', function () {

  it('should store events and allow to read them', async function () {
    // given
    const store = new EventStore()
    const existingEvents = await store.get('foo')
    const lastSeq = existingEvents[existingEvents.length - 1].data.aggSeq
    const event = {
      aggId: 'foo',
      type: EVENT_TYPES.JEWEL_ADDED,
      aggSeq: lastSeq + 1
    }
    await store.push(event)

    const readStore = new EventStore()

    // when
    const events = await readStore.get('foo')

    // then
    events[events.length - 1].data.should.deep.equal(event)
  })

  it('should raise error when using sequence already stored', async function () {
    // given
    const store = new EventStore()
    const existingEvents = await store.get('foo')
    const lastSeq = existingEvents[existingEvents.length - 1].data.aggSeq
    const event = {
      aggId: 'foo',
      type: EVENT_TYPES.JEWEL_ADDED,
      aggSeq: lastSeq
    }

    // when
    await store.push(event).should.be.rejectedWith('Wrong expected version.')
  })
})
