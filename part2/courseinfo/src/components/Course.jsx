const Header = (props) => {
  return (
  <>
  <h1>{props.course}</h1>
  </>
  )
}
const Part = (props) => {
  return (
  <>
  <p>{props.part} {props.exercise}</p>
  </>
  )
}
const Total = ({count}) => {
  return (
  <>
  <p>Number of exercises {count}</p>
  </>
  )
}

const Content = ({parts}) => {
  return (
  <>
  {parts.map(part => <Part key = {part.id} part={part.name} exercise={part.exercises}/>)}
  </>
  )
}

const Course = ({course}) => {

    return (
      <div>
        <Header course = {course.name}/>
        <Content parts = {course.parts}/>
        <Total count = {course.parts.reduce((total, part) => total + part.exercises, 0)}/>
      </div>
    )
  }

export default Course