/* eslint-disable react/prop-types */
const Person = ({ person, handleDelete}) => {


    return (
        <li>
            {person.name} {person.number} 
            <button onClick={handleDelete} >delete</button>
        </li>
    )
  }
  

const Persons = ({ persons, filter, handleDelete}) => {
    const filteredData = persons.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
    );

    const onDelete = (personId) => {
        handleDelete(personId);
      };
    
    return (
        <div>
        {filteredData.map(person => 
            <Person key={person.id} person={person} handleDelete={() => onDelete(person.id)}/>
        )}
        </div>
    )
    }

export default Persons