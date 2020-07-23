import Natural from './UserTypes/Natural'
import Legal from './UserTypes/Legal'

export default class CashOut {
  constructor(props) {
    this.props = props
  }
  getCommission({ date, userId, userType, amount }) {
    const natural = new Natural(this.props.natural)
    const legal = new Legal(this.props.legal)

    switch (userType) {
      case 'natural':
        return natural.getCommission({
          date,
          userId,
          amount,
        })

      case 'juridical':
        return legal.getCommission({ amount })

      default:
        return 0
    }
  }
}
