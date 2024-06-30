import React from 'react'
import { useState } from 'react'

const Button = (props) => {
  const { text, onClick } = props
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const Counter = (props) => {
  const { text, count } = props
  return (
    <>
      <p>{text} {count}</p>
    </>
  )
}

const Statics = ({ good, neutral, bad }) => {

  const total = good + neutral + bad
  let average = (good + neutral + bad) / 3;
  let positive = 0;

  if (total > 0) {
    positive = (good * 100) / total;
  }

  return (
    <>
      <h1><strong>Statistics</strong></h1>

      <Counter text="GOOD" count={good} />
      <Counter text="NEUTRAL" count={neutral} />
      <Counter text="BAD" count={bad} />
      <h3>Total: {total}</h3>
      <h3>Average: {average}</h3>
      <h3>Positive: {positive}</h3>
    </>
  )
}

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1)
    console.log(good)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    console.log(neutral)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    console.log(bad)
  }



  return (
    <>
      <h1><strong>Give Feedback</strong></h1>
      <Button onClick={handleGoodClick} text="GOOD" />
      <Button onClick={handleNeutralClick} text="NEUTRAL" />
      <Button onClick={handleBadClick} text="BAD" />
      <br /><br />
      <Statics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

