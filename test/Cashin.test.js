const assert = require('chai').assert
import CashIn from '../src/CashIn'

const props = {
  percents: 0.03,
  max: {
    amount: 5,
    currency: 'EUR',
  },
}
const cashIn = new CashIn(props)

describe('CashIn methods', () => {
  it('Check computation', () => {
    const amount = 200
    const rate = props.percents / 100

    const commission = cashIn.getCommission({ amount })

    assert.isNumber(commission)
    assert.equal(commission, amount * rate)
  })
})
