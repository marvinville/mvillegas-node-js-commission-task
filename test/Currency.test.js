const assert = require('chai').assert
import Currency from '../src/Currency'

describe('Currency methods', () => {
  const currency = new Currency()
  it('Checks format, do ceil on rounding up', () => {
    let test = currency.formatAmount(0.023)

    assert.equal(test, 0.03)
  })

  it('Check count decimal places of number', () => {

    let test = currency.countDecimals(0.023)

    assert.equal(test, 3)

  })
})
