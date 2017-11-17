const chai = require('chai')
const fs = require('fs')
const EventStore = require('../src/event-store-fs')
const EVENT_TYPES = require('../src/event-types')

chai.should()

const expect = chai.expect
const FILE_NAME = 'store.json'

describe.skip('Event Store', function () {
  beforeEach(function () {
    if (fs.existsSync(FILE_NAME)) {
      fs.unlinkSync(FILE_NAME)
    }
  })

  it('should store events and allow to read them', function () {
    // given
    const writeStore = new EventStore(FILE_NAME)
    writeStore.push({ aggId: 'foo', aggType: 'cart', aggSeq: 1, type: EVENT_TYPES.JEWEL_ADDED })
    writeStore.push({ aggId: 'foo', aggType: 'cart', aggSeq: 2, type: EVENT_TYPES.CART_SUBMITTED })
    writeStore.push({ aggId: 'bar', aggType: 'cart', aggSeq: 1, type: EVENT_TYPES.CART_SUBMITTED })
    writeStore.push({ aggId: 'foo', aggType: 'other', aggSeq: 3, type: EVENT_TYPES.CART_SUBMITTED })

    const readStore = new EventStore(FILE_NAME)

    // when
    const events = readStore.get('foo', 'cart')

    // then
    events.should.deep.equal([
      { aggId: 'foo', aggType: 'cart', aggSeq: 1, type: EVENT_TYPES.JEWEL_ADDED },
      { aggId: 'foo', aggType: 'cart', aggSeq: 2, type: EVENT_TYPES.CART_SUBMITTED }
    ])
  })

  it('should throw error when store event with existing sequence', function () {
    // given
    const writeStore = new EventStore('store.json')
    writeStore.push({ aggId: 'foo', aggType: 'cart', aggSeq: 1, type: EVENT_TYPES.JEWEL_ADDED })
    writeStore.push({ aggId: 'foo', aggType: 'cart', aggSeq: 2, type: EVENT_TYPES.CART_SUBMITTED })

    // when
    expect(() => writeStore.push({ aggId: 'foo', aggType: 'cart', aggSeq: 1, type: EVENT_TYPES.JEWEL_ADDED }))
      .to.throw('Existing event with aggId=foo, aggType=cart, aggSeq=1')
  })

  it('should throw error when store event with existing sequence written by another store', function () {
    // given
    const writeStore = new EventStore('store.json')
    writeStore.push({ aggId: 'foo', aggType: 'cart', aggSeq: 1, type: EVENT_TYPES.JEWEL_ADDED })
    writeStore.push({ aggId: 'foo', aggType: 'cart', aggSeq: 2, type: EVENT_TYPES.CART_SUBMITTED })

    const anotherWriteStore = new EventStore('store.json')
    // when
    expect(() => anotherWriteStore.push({ aggId: 'foo', aggType: 'cart', aggSeq: 1, type: EVENT_TYPES.JEWEL_ADDED }))
      .to.throw('Existing event with aggId=foo, aggType=cart, aggSeq=1')
  })
})
