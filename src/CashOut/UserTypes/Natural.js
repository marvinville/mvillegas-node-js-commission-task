import Logs from '../../Logs'

const logs = new Logs()

export default class Natural {
  constructor(props) {
    this.props = props
  }
  getCommission({ date, userId, amount }) {
    const rate = this.props.percents / 100
    const limit = this.props.week_limit.amount || 0
    const userAmountPerWeek = logs.getUserAmountPerWeek({ date, userId })
    logs.logOperations({ date, userId, amount })

    if (amount <= limit && userAmountPerWeek === 0) return 0
    else if (userAmountPerWeek === 0) return (amount - limit) * rate
    else if (userAmountPerWeek > limit) return amount * rate
    else return (amount - limit - userAmountPerWeek) * rate
  }
}
