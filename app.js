'use strict'

import { readJson } from './helper/File'
import Api from './src/Api'
import CashIn from './src/CashIn'
import CashOut from './src/CashOut'
import Currency from './src/Currency'

const filePath = process.argv[2]

if (filePath) {
  let json = readJson(filePath)

  if (json.length > 0) {
    const api = new Api()
    const cashIn = new CashIn()
    const cashOut = new CashOut()
    const currency = new Currency()

    api.cashIn().then((cashInData) => {
      api.cashOutNatural().then((cashOutNaturalData) => {
        api.cashOutLegal().then((cashOutLegalData) => {
          cashIn
            .setConfig({
              percents: cashInData.percents,
              max: cashInData.max.amount,
            })
            .then(
              cashOut.setConfig({
                legal: {
                  percents: cashOutLegalData.percents,
                  min: cashOutLegalData.min.amount,
                },
                natural: {
                  percents: cashOutNaturalData.percents,
                  limit: cashOutNaturalData.week_limit.amount,
                },
              })
            )
            .then(() => {
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
        })
      })
    })
  }
}
