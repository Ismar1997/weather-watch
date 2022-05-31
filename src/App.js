import React, { useState } from "react";

const api = {
  key: "9b1e4c4441539cf57f62a722e967790d",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  //////////////////////////// Search Function //////////////////////////
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  /////////////////////////////////////////////////////////////////////////

  //////////////// Converting Weather Desc.To Upper Case ///////////////
  function weatherDesc() {
    const wd = weather.weather[0].description;
    const arr = wd.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const wdf = arr.join(" ");
    return `${wdf}`;
  }
  ////////////////////////////////////////////////////////////////////

  ////////////////////////// Date Builder ////////////////////////////
  const dateBuilder = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return `${date}`;
  };
  //////////////////////////////////////////////////////////////////////

  /////////////////////////// Background Changing //////////////////////
  function weatherType() {
    let weatherNow = "";
    switch (weather.weather?.[0].main) {
      case "Thunderstorm":
        weatherNow = "thunderstorm";
        return `${weatherNow}`;
      case "Drizzle":
        weatherNow = "drizzle";
        return `${weatherNow}`;
      case "Rain":
        weatherNow = "rain";
        return `${weatherNow}`;
      case "Snow":
        weatherNow = "snowing";
        return `${weatherNow}`;
      case "Clear":
        weatherNow = "clear";
        return `${weatherNow}`;
      case "Clouds":
        weatherNow = "clouds";
        return `${weatherNow}`;
      default:
        weatherNow = "app";
        return `${weatherNow}`;
    }
  }
  //////////////////////////////////////////////////////////////////////
  return (
    <div className={weatherType()}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search here ... "
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {weather.cod === 200 ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}
                °C
              </div>
              <div className="weather">{weatherDesc()}</div>
            </div>
          </div>
        ) : weather.cod === "404" ? (
          <div className="error-handle">
            <h1>
              Sorry but the city you typed was not found. Please make sure you
              typed city that exist !!!
            </h1>
          </div>
        ) : (
          <div className="landing-page">
            <h1>
              Welcome to Weather Watch ! Enter the city or country you wish to
              see what weather is there.
            </h1>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
