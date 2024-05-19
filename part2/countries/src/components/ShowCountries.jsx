/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import axios from "axios";

const Languages = ({language}) => {
  return(
    <li>
      {language}
    </li>
  )
}

const Countries = ({country, info}) => {
  const [showContent, setShowContent] = useState(false)

  const handleShow = (param) => {
    setShowContent(param)
  };

  if (showContent)
    return(
      <div>
        <li>
        {country}
        <button onClick={() => handleShow(false)}>hide </button>
        <Country country={country} info={info}/>
        </li>
      </div>
    ) 

  return (
    <li>
        {country}
        <button onClick={() => handleShow(true)}>show </button>
    </li>
)
}

const Country = ({country, info}) => {
  return (
    <div>
      <h1>{country}</h1>
      <p>{`capital ${info.capital[0]}`}</p>
      <p>{`area ${info.area}`}</p>
      <h3>languages</h3>
      <ul>
      {Object.entries(info.languages).map(([, value], index) => 
        <Languages key={index} language={value}/>
      )}
      </ul>
      <img src={info.flags.png} alt="flag" style={{ border: '1px solid black' }}/>
      <h3>Weather in {info.capital} </h3>
      <Weather capital={info.capital}/>

    </div>
  )
}

const Weather = ({capital}) => {
  const api_key = import.meta.env.VITE_SOME_KEY
  const [temperature, setTemperature] = useState(null)
  const [icon, setIcon] = useState(null);
  const [wind, setWind] = useState(null)

  useEffect(() => {
    console.log(`effect run in Weather`);

    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
    .then(response => {
      setTemperature(response.data.main.temp)
      setIcon(response.data.weather[0].icon)
      setWind(response.data.wind.speed)
    })
  })

  return (
    <div>
      <p>temperature {temperature} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon" />
      <p>wind {wind} m/s</p>
    </div>
  )
}

const ShowCountries = ({ info, value}) => {  
  if (value !== ''){
    if (info.length > 10) {
      return (
        <p>
          Too many matches, specify another filter
        </p>
      )
    }
    if (info.length > 1)
      return(
        <div>
          {info.map((info, index) => 
            <Countries key={index} country={info.name.common} info={info}/>
          )}
        </div>
      )
    if (info.length === 1)
      return(
        <div>
          <Country country={info[0].name.common} info={info[0]}/>
          
        </div>
      ) 
    }
}

export default ShowCountries