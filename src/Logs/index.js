import moment from 'moment'

export default class Logs {
  constructor() {
    this.operations = []
  }
  /**
   * @description
   * Creates a virtual database to check every userId's operation per week.
   */
  logOperations({ date, userId, amount }) {
    this.operations.push({
      date: date,
      userId: userId,
      amount: amount,
    })

    return this.operations
  }
  /**
   * @description
   * Shows the sum operation within the given week.
    It'll be used to check if a user's operation exceed the 'weekly limit'
   */
  getUserAmountPerWeek({ date, userId }) {
    let logAmount = this.operations.map((element) =>
      element.userId === userId &&
      moment(element.date, 'YYYYMMDD').isSame(date, 'week')
        ? element.amount
        : 0
    )
    return logAmount.reduce((acc, val) => acc + val, 0) || 0
  }
}
