import { useState, useEffect } from 'react'
import axios from 'axios'
import ShowCountries from './components/ShowCountries'


const App = () => {
  const [value, setValue] = useState('')
  const  [info, setInfo] = useState([])

  useEffect(() => {
    console.log(`effect run`);

    if (value != ''){
      console.log('fetching countries...');
      axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        const filteredData = response.data.filter(
            item => (item.name.common.toLowerCase().includes(value.toLowerCase()))
          )

        setInfo(filteredData)
      })
    }
  }, [value])

  const handleChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleChange}>
        find countries:
        <input
        value={value}
        onChange={handleChange}
        />
      </form>
      <ShowCountries info={info} value={value}/>
    </div>
  )  
}

export default App