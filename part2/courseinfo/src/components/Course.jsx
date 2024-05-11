/* eslint-disable react/prop-types */
const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const sum = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0);
  return <strong>
    <p>total of {sum} exercises</p>
  </strong>
}

const Part = ({ name, exercises }) => 
  <p>
    {name} {exercises}
  </p>

const Content = ({ parts }) => {
  const aux = parts.map(value => <Part key={value.id} name={value.name} exercises={value.exercises}/>)
  return <div>{aux}</div>
}

const Course = ({ courses }) => {
  const aux = courses.map(value => {
    return(
      <div key={value.id}>
        <Header course={value.name}/>
        <Content parts={value.parts}/>
        <Total parts={value.parts}/>
      </div>
    )
  })
  return aux
}

export default Course