'use strict'
import moment from 'moment'

moment.updateLocale('en', {
  week: {
    dow: 1, // Monday is the first day of the week.
  },
})

import { readJson } from './helper/File'
import Api from './src/Api'
import CashIn from './src/CashIn'
import CashOut from './src/CashOut'
import Currency from './src/Currency'

try {
  const filePath = process.argv[2] || ''
  const json = readJson(filePath)
  if (json.length > 0) {
    const api = new Api()

    api.getApi().then((config) => {
      const cashIn = new CashIn(config.cashIn)
      const cashOut = new CashOut(config.cashOut)
      const currency = new Currency()

      json.forEach((element) => {
        let result = 0

        if (element.type === 'cash_in') {
          result = cashIn.getCommission({
            amount: element.operation.amount,
          })
        } else if (element.type === 'cash_out') {
          result = cashOut.getCommission({
            date: element.date,
            userId: element.user_id,
            userType: element.user_type,
            type: element.type,
            amount: element.operation.amount,
          })
        }
        console.log(currency.formatAmount(result))
      })
    })
  }
} catch (error) {
  console.error(`Invalid JSON file '${error.path}'`)
}
