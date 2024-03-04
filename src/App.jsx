import "./App.css"
import CurrencyInput from "./CurrencyInput"
import { useState, useEffect } from "react"
import axios from "axios"

function App() {

  const [amountOne, setAmountOne] = useState(1)
  const [amountTwo, setAmountTwo] = useState(1)
  const [currencyOne, setCurrencyOne] = useState('NGN')
  const [currencyTwo, setCurrencyTwo] = useState('USD')
  const [rates, setRates] = useState([])

  useEffect(() => {
    axios.get("http://data.fixer.io/api/latest?access_key=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
      .then(response => {
        setRates(response.data.rates)
      })
  }, [])

  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmountOneChange(1)
      }
      init()
    }
  }, [rates])

  function format(number) {
    return number.toFixed(5);
  }

  function handleAmountOneChange(amountOne) {
    setAmountTwo(format(amountOne * (rates[currencyTwo] / rates[currencyOne])))
    setAmountOne(amountOne)
  }

  function handleCurrencyOneChange(currencyOne) {
    setAmountTwo(format(amountOne * (rates[currencyTwo] / rates[currencyOne])))
    setCurrencyOne(currencyOne)
  }

  function handleAmountTwoChange(amountTwo) {
    setAmountOne(format(amountTwo * (rates[currencyOne] / rates[currencyTwo])))
    setAmountTwo(amountTwo)
  }

  function handleCurrencyTwoChange(currencyTwo) {
    setAmountOne(format(amountTwo * (rates[currencyOne] / rates[currencyTwo])))
    setCurrencyTwo(currencyTwo)
  }

  return (
    <div>
      <h1>Currency Converter</h1>
      <CurrencyInput
        onAmountChange={handleAmountOneChange}
        onCurrencyChange={handleCurrencyOneChange}
        currencies={Object.keys(rates)}
        amount={amountOne}
        currency={currencyOne} />

      <CurrencyInput
        onAmountChange={handleAmountTwoChange}
        onCurrencyChange={handleCurrencyTwoChange}
        currencies={Object.keys(rates)}
        amount={amountTwo}
        currency={currencyTwo} />

    </div>
  )
}

export default App