import { useState } from "react";

const api = {
  key: "d07e421279d1322030a227c72a5055ca",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt =>{
    if (evt.key ==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          setWeather(result);
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) =>{
    let months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    let time = d.getHours() + ":" + d.getMinutes();

    const datetime = {
      date: `${day} ${date} ${month} ${year}`,
      time: `${time}`
    }
  
    return datetime;
  }

  return (
    <div className='App'>
      <main>
        <div className="search-box">
          <input 
            type="text" 
            className="search-bar"     
            placeholder="Search"    
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="time">{dateBuilder(new Date()).time}</div>
            <div className="location-box">
          <div className="location">{weather.name},{weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date()).date}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}°c
          </div>
          <div className="weather">
            {weather.weather[0].main}           
          </div>
        </div>
          </div>
        ): ('')}
      </main>
     
    </div>
  );
}

export default App;
