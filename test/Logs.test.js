const assert = require('chai').assert
import Logs from '../src/Logs'

const logs = new Logs()

describe('Logs methods', () => {
  it('Check operation logs format', () => {
    let test = logs.logOperations({
      date: '2016-01-06',
      userId: '1',
      amount: 200,
    })

    assert.isArray(test)

    test.forEach((element) => {
      assert.isNotNull(element.date)
      assert.isNotNull(element.userId)
      assert.isNumber(element.amount)
    })
  })
  it('Check amount per user per week', () => {
    let test = logs.getUserAmountPerWeek({
      date: '2016-01-06',
      userId: '1',
    })

    assert.isNumber(test)
  })
})
