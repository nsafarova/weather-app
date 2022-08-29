import React, { useState } from 'react'
import axios from 'axios';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=b9e8bba6b16420c2a4951b4cdffb7847`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  const dateBuilder = (d) => {
    let date = String(new window.Date())
    return date = date.slice(0,15)
  }


  return (
    <div className={(typeof data.main != "undefined") ? ((data.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
      <div className="search">
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Enter Location"
        type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}˚C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()}˚C</p> : null}
            <p>Feels like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
          {data.wind ? <p className="bold">{data.wind.speed} MPH</p> : null}
            <p>Wind speed</p>
          </div>
        </div>
}


      </div>
      </main>
    </div>
  );
}

export default App;
