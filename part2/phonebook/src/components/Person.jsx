/* eslint-disable react/prop-types */
const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

export default Person