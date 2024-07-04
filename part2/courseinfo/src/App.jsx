const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props) => {
  const parts = props.parts;

  return (
    <>
      {parts.map((e) => (
        <Part key={e.id} part={e} />
      ))}
    </>
  );
};

const Part = (props) => {
  const part = props.part;

  // const { name, exercises } = props.part;
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
};


const Total = (props) => {
  const parts = props.parts;
  const totals = () => {
    return parts.reduce((total, part) => {
      const ejercicios = part.exercises
      return total + ejercicios
    }, 0)
  }
  return (
    <>
      <p>Number of exercises {totals()}</p>
      {/* <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p> */}
    </>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App