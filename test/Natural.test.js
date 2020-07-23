const assert = require('chai').assert
import Natural from '../src/CashOut/UserTypes/Natural'

const props = {
  percents: 0.3,
  week_limit: { amount: 1000, currency: 'EUR' },
}
const natural = new Natural(props)

describe('Natural methods', () => {
  it('Check commission computation', () => {
    const commission = natural.getCommission({
      amount: 200,
      date: '2016-01-06',
      userId: '1',
    })

    assert.isNumber(commission)
    assert.equal(commission, 0)
  })
})
