const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props) => {
  const parts = props.course.parts;

  return (
    <>
      {parts.map((e) => (
        <Part key={e.name} part={e} />
      ))}
    </>
  );
};

const Part = (props) => {
  const { name, exercises } = props.part;
  return (
    <p>
      {name} {exercises}
    </p>
  )
};


const Total = (props) => {
  const { parts } = props.course;
  return (
    <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App