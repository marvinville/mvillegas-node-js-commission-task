import moment from 'moment'

moment.updateLocale('en', {
  week: {
    dow: 1, // Monday is the first day of the week.
  },
})

export default class CashOut {
  constructor() {
    this.operations = []
  }
  async setConfig(props) {
    return (this.props = props)
  }
  getCommission({ date, userId, userType, amount }) {
    let rate = this.getRate({ userType })

    if (userType === 'natural') {
      return this.natural({
        date,
        userId,
        amount,
        rate,
      })
    } else if (userType === 'juridical') {
      return this.juridical({ amount, rate })
    }
  }
  natural({ date, userId, amount, rate }) {
    let userAmountPerWeek = this.getUserAmountPerWeek({ date, userId })
    this.logOperations({ date, userId, amount })

    let newAmount = 0
    let limit = this.props.natural.limit

    if (amount <= limit && userAmountPerWeek === 0) {
      newAmount = 0
    } else if (userAmountPerWeek === 0) {
      newAmount = amount - limit
    } else if (userAmountPerWeek > limit) {
      newAmount = amount
    } else {
      let freeBalance = limit - userAmountPerWeek
      newAmount = amount - freeBalance
    }

    return newAmount * rate
  }
  juridical({ amount, rate }) {
    let min = this.props.legal.min
    let commission = amount * rate
    return commission > min ? commission : min
  }

  /**
   * @description
   * Creates a virtual database to check every userId's operation per week.
    It'll be used by 'natural' user_type.
   */
  logOperations({ date, userId, amount }) {
    let year = moment(date).year()
    let weekNo = moment(date).week()

    this.operations.push({
      year: year,
      weekNo: weekNo,
      userId: userId,
      amount: amount,
    })

    return this.operations
  }
  /**
   * @description
   * Shows the sum of 'natural' user_type operation within the given week.
    It'll be used to check if a user's operation exceed the 'weekly limit'
   */
  getUserAmountPerWeek({ date, userId }) {
    let yearData = moment(date).year()
    let weekData = moment(date).week()

    let logAmount = this.operations.map((element) => {
      if (
        element.year === yearData &&
        element.weekNo === weekData &&
        element.userId === userId
      ) {
        return element.amount
      }
    })

    return logAmount.reduce((acc, val) => acc + val, 0) || 0
  }
  getRate({ userType }) {
    if (userType === 'natural') return this.props.natural.percents / 100
    else if (userType === 'juridical') return this.props.legal.percents / 100
  }
}
