const chai = require('chai')
const EventStore = require('../src/event-store-db')
const EVENT_TYPES = require('../src/event-types')

chai.should()

const expect = chai.expect

describe.only('Event Store DB', function () {

  it('should store events and allow to read them', async function () {
    // given
    const store = new EventStore()
    store.push({ aggId: 'foo', aggType: 'cart', aggSeq: 1, type: EVENT_TYPES.JEWEL_ADDED })

    const readStore = new EventStore()

    // when
    const events = await readStore.get('foo', 'cart')

    // then
    events[0].data.should.deep.equal({ aggId: 'foo', aggType: 'cart', aggSeq: 1, type: EVENT_TYPES.JEWEL_ADDED })
  })

})
