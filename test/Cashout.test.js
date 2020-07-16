const assert = require('chai').assert
import CashOut from '../src/CashOut'

describe('CashOut methods', () => {
  const cashOut = new CashOut()
  let config = cashOut.setConfig({
    legal: {
      percents: 0.3,
      min: 0.5,
    },
    natural: {
      percents: 0.3,
      limit: 1000,
    },
  })

  it('check configuration', () => {
    config.then((data) => {
      assert.isObject(data)
      assert.isNumber(data.legal.percents)
      assert.isNumber(data.legal.min)
      assert.isNumber(data.natural.percents)
      assert.isNumber(data.natural.limit)
    })
  })

  it('check commission computation for legal', () => {
    let amount = 200
    let rate = 0.3 / 100

    let data = {
      date: '2016-01-06',
      userId: '1',
      amount: 200,
      userType: 'juridical',
    }
    config.then(() => {
      let commission = cashOut.getCommission(data)

      assert.isNumber(commission)
      assert.equal(commission, amount * rate)
    })
  })
  it('check commission computation for natural', () => {
    let amount = 200
    let rate = 0.3 / 100

    let data = {
      amount: amount,
      userType: 'natural',
      date: '2016-01-06',
      userId: '1',
    }
    config.then(() => {
      let commission = cashOut.getCommission(data)

      assert.isNumber(commission)
      assert.equal(commission, 0)
    })
  })
  it('check operation logs format', () => {
    let test = cashOut.logOperations({
      date: '2016-01-06',
      userId: '1',
      amount: 200,
    })

    assert.isArray(test)

    test.forEach((element) => {
      assert.isNotNull(element.year)
      assert.isNumber(element.weekNo)
      assert.isNotNull(element.userId)
      assert.isNumber(element.amount)
    })
  })
  it('check amount per user per week', () => {
    let test = cashOut.getUserAmountPerWeek({
      date: '2016-01-06',
      userId: '1',
    })

    assert.isNumber(test)
  })
  it('check rate for natural and legal', () => {
    config.then(() => {
      let naturalRate = cashOut.getRate({ userType: 'natural' })
      let legalRate = cashOut.getRate({ userType: 'juridical' })

      assert.isNumber(naturalRate)
      assert.isNumber(legalRate)
    })
  })
})
