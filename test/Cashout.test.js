const assert = require('chai').assert
import CashOut from '../src/CashOut'

const props = {
  natural: {
    percents: 0.3,
    week_limit: { amount: 1000, currency: 'EUR' },
  },
  legal: { percents: 0.3, min: { amount: 0.5, currency: 'EUR' } },
}
const cashOut = new CashOut(props)

describe('CashOut methods', () => {
  it(`Check if user_type not in ['natural', 'juridical']`, () => {
    const test = cashOut.getCommission({
      date: '2020-01-01',
      userId: 1,
      userType: 'normal',
      amount: 300.0,
    })

    assert.isNumber(test)
    assert.equal(test, 0)
  })
})
