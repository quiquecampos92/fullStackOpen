import React, { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

export default function App() {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [scores, setScores] = useState(Array(anecdotes.length).fill(0))

  const handleNextClick = () => {
    setSelected(
      Math.floor(Math.random() * anecdotes.length)
    )
  }

  const handleScoreClick = () => {
    const newScores = [...scores];
    newScores[selected] += 1;
    setScores(newScores);
  }

  const masVotado = () => {
    const maxIndex = scores.reduce((maxIndex, currentValue, index) =>
      currentValue > scores[maxIndex] ? index : maxIndex,
      0);
    console.log(maxIndex)
    return `Anécdota más votada: ${anecdotes[maxIndex]} con ${scores[maxIndex]} votos.`;
  };

  return (
    <>
      <h1>ANÉCDOTAS</h1>
      <div>{anecdotes[selected]}</div>
      <h2>Puntuación: {scores[selected]}</h2>
      <Button onClick={handleScoreClick} text="Puntuar" />
      <Button onClick={handleNextClick} text="Next Anecdote" />
      <br /><br />
      <h1>ANÉCDOTA CON MÁS VOTOS</h1>
      <p>{masVotado()}</p>
    </>
  )
}

