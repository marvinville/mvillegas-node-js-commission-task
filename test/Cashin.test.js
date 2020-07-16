const assert = require('chai').assert
import CashIn from '../src/CashIn'

describe('CashIn methods', () => {
  const cashIn = new CashIn()

  let percents = 0.03
  let rate = percents / 100

  let config = cashIn.setConfig({
    percents: percents,
    max: 5,
  })

  it('check configuration', () => {
    config.then((data) => {
      assert.isObject(data)
      assert.isNumber(data.percents)
      assert.isNumber(data.max)
    })
  })

  it('check computation', () => {
    let amount = 200

    config.then(() => {
      let commission = cashIn.getCommission({ amount })

      assert.isNumber(commission)
      assert.equal(commission, amount * rate)
    })
  })
})
