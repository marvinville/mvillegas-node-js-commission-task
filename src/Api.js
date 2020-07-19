import fetch from 'node-fetch'

export default class Api {
  constructor() {
    this.url = {
      cashIn: 'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in',
      cashOut: {
        natural:
          'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural',
        legal:
          'http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical',
      },
    }
  }
  async getApi(){

        const cashIn = await fetch(this.url.cashIn)
        const cashInData = await cashIn.json()

        const cashOutNatural = await fetch(this.url.cashOut.natural)
        const cashOutNaturalData = await cashOutNatural.json()

        const cashOutLegal = await fetch(this.url.cashOut.legal)
        const cashOutLegalData = await cashOutLegal.json()

        return {
          cashInData,
          cashOutNaturalData,
          cashOutLegalData
        }


  }
}


const cashIn = async() => {

  const cashIn = await fetch('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in');
  const response = cashIn.json()
  return response


}

const getAll = async() => {

  const a = cashIn()

  return await Promise.all([a])

}  

getAll().then((log) => console.log(log))