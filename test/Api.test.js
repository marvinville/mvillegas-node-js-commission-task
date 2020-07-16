const assert = require('chai').assert
import Api from '../src/Api'

const api = new Api()

describe('API methods', () => {
  it('Check URLs', () => {
    assert.isObject(api.url)

    assert.isNotEmpty(api.url.cashIn)
    assert.isNotEmpty(api.url.cashOut.natural)
    assert.isNotEmpty(api.url.cashOut.legal)
  })

  it('Cashin: check endpoint and parameters', (done) => {
    api.handleApi(api.url.cashIn).then((data) => {
      assert.isObject(data)
      assert.isNumber(data.percents)
      assert.isNumber(data.max.amount)
      assert.isString(data.max.currency)

      done()
    })
  }).timeout(0)

  it('Cashout Natural: check endpoint and parameters', (done) => {
    api.handleApi(api.url.cashOut.natural).then((data) => {
      assert.isObject(data)
      assert.isNumber(data.percents)
      assert.isNumber(data.week_limit.amount)
      assert.isString(data.week_limit.currency)

      done()
    })
  }).timeout(0)

  it('Cashout Legal: check endpoint and parameters', (done) => {
    api.handleApi(api.url.cashOut.legal).then((data) => {
      assert.isObject(data)
      assert.isNumber(data.percents)
      assert.isNumber(data.min.amount)
      assert.isString(data.min.currency)

      done()
    })
  }).timeout(0)
})
