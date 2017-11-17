const EventStoreClient = require('event-store-client')

const credentials = {
  username: 'admin',
  password: 'changeit'
}

class EventStore {
  constructor() {
    this.store = new EventStoreClient.Connection({})
  }

  get (aggId) {
    return new Promise (resolve => this.store.readStreamEventsBackward(
      aggId, 0, 1, true, true, null, credentials,
      completed => resolve(completed.events)))
  }

  push (event) {
    const escEvent = {
      eventId: EventStoreClient.Connection.createGuid(),
      eventType: event.type,
      data: event
    }
    this.store.writeEvents(
      event.aggId,
      EventStoreClient.ExpectedVersion.Any,
      true,
      [escEvent],
      credentials, () => { })
  }
}

module.exports = EventStore
