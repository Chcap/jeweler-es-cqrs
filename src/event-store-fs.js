const fs = require('fs')

function read (filePath) {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath).toString())
  }
  return { events: [] }
}

function write (filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data))
}

function isEqual (event1, event2) {
  return event1.aggId === event2.aggId &&
    event1.aggType === event2.aggType &&
    event1.aggSeq === event2.aggSeq
}

class EventStore {
  constructor(filePath) {
    this.filePath = filePath
    this.store = read(this.filePath)
  }

  get (aggId, aggType) {
    return this.store.events
      .filter(event => event.aggId === aggId && event.aggType === aggType)
  }

  push (event) {
    if (this.store.events.some(storedEvent => isEqual(event, storedEvent))) {
      throw new Error(`Existing event with aggId=${event.aggId}, aggType=${event.aggType}, aggSeq=${event.aggSeq}`)
    }
    this.store.events.push(event)
    write(this.filePath, this.store)
  }
}

module.exports = EventStore
