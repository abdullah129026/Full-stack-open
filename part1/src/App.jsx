// const Header = (props) => {
//   return <h1>{props.course}</h1>
// }

// const Content = (props) => {
//   return (
//     <div>
//       <Part part={props.part1} exercises={props.exercises1} />
//       <Part part={props.part2} exercises={props.exercises2} />
//       <Part part={props.part3} exercises={props.exercises3} />
//     </div>
//   )
// }

// const Part = (props) => {
//   return <p>{props.part} {props.exercises}</p>
// }

// const Total = (props) => {
//   return <p>Number of exercises {props.total}</p>
// }

// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }

//   return (
//     <div>
//       <Header course={course} />
//       <Content
//         part1={part1}
//         exercises1={exercises1}
//         part2={part2}
//         exercises2={exercises2}
//         part3={part3}
//         exercises3={exercises3}
//       />
//       <Total total={exercises1 + exercises2 + exercises3} />
//     </div>
//   )
// }

// export default App

// import { useState } from 'react'

// const Button = (props) => {
//   return <button onClick={props.onClick}>{props.text}</button>
// }

// const StatisticLine = (props) => {
//   return <p>{props.text} {props.value}</p>
// }

// const Statistics = (props) => {
//   const total = props.good + props.neutral + props.bad
//   const average = total === 0 ? 0 : (props.good * 1 + props.neutral * 0 + props.bad * -1) / total
//   const positive = total === 0 ? 0 : (props.good / total) * 100

//   if (total === 0) {
//     return <p>No feedback given</p>
//   }

//   return (
//     <div>
//       <h1>statistics</h1>
//       <StatisticLine text="good" value={props.good} />
//       <StatisticLine text="neutral" value={props.neutral} />
//       <StatisticLine text="bad" value={props.bad} />
//       <StatisticLine text="all" value={total} />
//       <StatisticLine text="average" value={average} />
//       <StatisticLine text="positive" value={positive + ' %'} />
//     </div>
//   )
// }

// const App = () => {
//   // save clicks of each button to its own state
//   const [good, setGood] = useState(0)
//   const [neutral, setNeutral] = useState(0)
//   const [bad, setBad] = useState(0)

//   return (
//     <div>
//       <h1>give feedback</h1>
//       <Button text="good" onClick={() => setGood(good + 1)} />
//       <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
//       <Button text="bad" onClick={() => setBad(bad + 1)} />

//       <Statistics good={good} neutral={neutral} bad={bad} />
//     </div>
//   )
// }

// export default App

import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const getRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const maxVotes = Math.max(...votes)
  const maxVotedIndex = votes.indexOf(maxVotes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={getRandomAnecdote}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxVotedIndex]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  )
}

export default App