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
})
