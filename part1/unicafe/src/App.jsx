import React from 'react'
import { useState } from 'react'
//Button Component
const Button = (props) => {
  const { text, onClick } = props
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}
//Counter Component
const Counter = (props) => {
  const { text, count } = props;
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th style={{ width: '90px' }}>{text}</th>
            <td>{count}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};


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
      {
        total === 0 ? (
          <h3>No hay comentarios</h3>
        ) : (
          <>
            <Counter text="GOOD" count={good} />
            <Counter text="NEUTRAL" count={neutral} />
            <Counter text="BAD" count={bad} />
            <Counter text="TOTAL: " count={total} />
            <Counter text="AVERAGE: " count={average} />
            <Counter text="POSITIVE: " count={positive} />
          </>
        )
      }
    </>
  )
}

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
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

