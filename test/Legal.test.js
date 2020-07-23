const assert = require('chai').assert
import Legal from '../src/CashOut/UserTypes/Legal'

const props = {
  percents: 0.3,
  min: { amount: 0.5, currency: 'EUR' },
}
const legal = new Legal(props)

describe('Legal methods', () => {
  it('Check commission computation', () => {
    const amount = 200
    const rate = props.percents / 100

    const commission = legal.getCommission({ amount })

    assert.isNumber(commission)
    assert.equal(commission, amount * rate)
  })
})
