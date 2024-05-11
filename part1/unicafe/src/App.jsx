/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  if (text === 'positive') return <tr><td>{text}</td><td>{value} %</td></tr>
  return (<tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.total === 0) return <p>No feedback given</p>

  return(
    <div>
      <tbody>
        <StatisticLine text='good' value={props.good}/>
        <StatisticLine text='neutral' value={props.neutral}/>
        <StatisticLine text='bad' value={props.bad}/>
        <StatisticLine text='all' value={props.total}/>
        <StatisticLine text='average' value={(props.good - props.bad) / props.total}/>
        <StatisticLine text='positive' value={(props.good / props.total) * 100}/>
      </tbody>
    </div>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const goodClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }

  const neutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const badClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodClick} text='good'/>
      <Button onClick={neutralClick} text='neutral'/>
      <Button onClick={badClick} text='bad'/>
      <h1>Statistics</h1>
      <table>
        <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
      </table>

    </div>
  )
}

export default App