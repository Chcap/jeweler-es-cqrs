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
    return new Promise(resolve => this.store.readStreamEventsForward(
      aggId, 0, 100, true, false, null, credentials,
      completed => {
        resolve(completed.events.map(event => event.data))
      }))
  }

  push (event) {
    const escEvent = {
      eventId: EventStoreClient.Connection.createGuid(),
      eventType: event.type,
      data: event
    }
    return new Promise((resolve, reject) => this.store.writeEvents(
      event.aggId,
      event.aggSeq,
      true,
      [escEvent],
      credentials, result => {
        if (result.result === 0) {
          return resolve()
        }
        reject(result.message)
      }))
  }
}

module.exports = EventStore
