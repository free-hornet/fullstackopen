/* eslint-disable react/prop-types */
const Person = ({ person }) => {
    return (
      <li>{person.name} {person.number}</li>
    )
  }
  

const Persons = ({ persons, filter, handleDelete }) => {
    const filteredData = persons.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
    );
    
    return (
        <div>
        {filteredData.map(person => 
            <Person key={person.id} person={person} handleDelete={handleDelete} />
        )}
        </div>
    )
    }

export default Persons