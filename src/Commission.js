import CashIn from './CashIn'
import CashOut from './CashOut'

const cashIn = new CashIn()
const cashOut = new CashOut()

export default class Commission {
  constructor(props) {
    this.props = props
  }
  calculate({ date, userId, userType, type, amount }) {
    let commission = 0

    if (type === 'cash_in') {
      let rate = cashIn.getRate(this.props.cashIn.percents)
      let max = this.props.cashIn.maxAmount
      commission = cashIn.getCommission({ amount, max, rate })
    } else if (type === 'cash_out') {
      let rate = cashOut.getRate({
        userType: userType,
        percents: {
          natural: this.props.cashOut.natural.percents,
          legal: this.props.cashOut.legal.percents,
        },
      })

      commission = cashOut.getCommission({
        date,
        userId,
        userType,
        amount,
        min: this.props.cashOut.legal.minAmount,
        limit: this.props.cashOut.natural.weeklyLimit,
        rate: rate,
      })
    }
    return this.formatAmount(commission)
  }
  formatAmount(amount) {
    return this.countDecimals(amount) === 3
      ? Math.round(Math.ceil(amount * 100)) / 100
      : amount.toFixed(2)
  }
  countDecimals(value) {
    return value % 1 ? value.toString().split('.')[1].length : 0
  }
}
