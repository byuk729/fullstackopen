import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



const Button = ({ onClick, text }) => (<button onClick={onClick}>{text}</button>)

const Header = ({ text }) => (<h1>{text}</h1>)

const StatisticLine = ({text, value}) => (<p>{text} {value}</p>)

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <tr><td><StatisticLine text={"good"} value={props.good}/></td></tr>
        <tr><td><StatisticLine text={"neutral"} value={props.neutral}/></td></tr>
        <tr><td><StatisticLine text={"bad"} value={props.bad}/></td></tr>
        <tr><td><StatisticLine text={"all"} value={props.total}/></td></tr>
        <tr><td><StatisticLine text={"average"} value={props.average}/></td></tr>
        <tr><td><StatisticLine text={"positive"} value={props.positive}/></td></tr>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onClick = (rating) => () => {
    if (rating === "good") {
      setGood(good + 1)
    }
    else if (rating === "neutral") {
      setNeutral(neutral + 1)
    }
    else if (rating === "bad") {
      setBad(bad + 1)
    }
  }
  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positive = total === 0 ? "0 %" : ((good / total) * 100) + " %"

  return (
    <div>
      <Header text="give feedback"/>
      <Button onClick={onClick("good")} text={"good"}/>
      <Button onClick={onClick("neutral")} text={"neutral"}/>
      <Button onClick={onClick("bad")} text={"bad"}/>
      <Header text="statistics"/>
      {total === 0 ? <p>No feedback given</p> : 
        <>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
      </>}
    </div>

  )
}

export default App
