import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import pinkclouds from "./assets/pinkclouds.svg";
const apiW = {
  key: "9b1e4c4441539cf57f62a722e967790d",
  base: "https://api.openweathermap.org/data/2.5/",
};
// *                                 Api for Current Weather
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const [forecast, setForecast] = useState("");
  const [animation, setAnimation] = useState("");
  const [detailsanime, setDetailsAnime] = useState("");
  const search = (evt) => {
    if (evt.key === "Enter") {
      async function getData() {
        const url1 = `${apiW.base}weather?q=${query}&units=metric&APPID=${apiW.key}`;
        const url2 = `${apiW.base}forecast?q=${query}&cnt=9&units=metric&APPID=${apiW.key}`;
        const responses = await Promise.all([fetch(url1), fetch(url2)]);
        const data1 = await responses[0].json();
        const data2 = await responses[1].json();
        setWeather(data1);
        setForecast(data2);
        setQuery("");
        setAnimation("animated bounceInLeft");
        setDetailsAnime("animated bounceInUp");
      }
      getData();
      setAnimation("");
      setDetailsAnime("");
    }
  };
  // * /////////////////////////////////////////////////////////////////////////////////////

  // * ////////////// Converting Weather Desc.To Upper Case ///////////////
  function weatherDesc() {
    const wd = weather.weather[0].description;
    const arr = wd.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const wdf = arr.join(" ");
    return `${wdf}`;
  }
  // * //////////////////////////////////////////////////////////////////

  // * //////////////////////// Date Builder ////////////////////////////
  const dateBuilder = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return `${date}`;
  };
  // * ////////////////////////////////////////////////////////////////////

  // * //////////////////////// Kilometer Converter ////////////////////////////
  let km = weather.visibility / 1000;
  let vis = km.toFixed(1) + " km";
  // * //////////////////////// Kilometer Converter ////////////////////////////

  const hw = forecast.list;

  // * ///////////////////////// Background Changing //////////////////////
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
      case "Mist":
        weatherNow = "mist";
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
      case "Fog":
        weatherNow = "fog";
        return `${weatherNow}`;
      default:
        weatherNow = "app";
        return `${weatherNow}`;
    }
  }

  // * ////////////////////////////////////////////////////////////////////
  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="search"
            className="search-bar animated bounceInDown "
            placeholder="Search 🔍"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {weather.cod === 200 ? (
          <div className="container">
            <div className={`first-bx ${animation}`}>
              <div className={`date ${animation}`}>
                <h3>{dateBuilder(new Date())}</h3>
              </div>
              <div className={`weather ${animation}`}>
                <h3>{weatherDesc()}</h3>
              </div>
              <div className={`weather-box ${animation}`}>
                <div className={`temp ${animation}`}>
                  {Math.round(weather.main.temp)}°
                </div>
              </div>
              <img className={weatherType()}></img>
            </div>

            <div className={`second-bx ${animation}`}>
              <div className="details-bx">
                <img
                  className="wind-img"
                  src={require("./assets/air.png")}
                  alt="wind"
                ></img>
                <h3>{Math.round(weather.wind.speed)}km/h</h3>
                <p>Wind</p>
              </div>
              <div className="details-bx">
                <img
                  className="hum-img"
                  src={require("./assets/humidity.png")}
                  alt="wind"
                ></img>
                <h3>{Math.round(weather.main.humidity)}%</h3>
                <p>Humidity</p>
              </div>
              <div className="details-bx">
                <img
                  className="vis-img"
                  src={require("./assets/vision.png")}
                  alt="wind"
                ></img>
                <h3>{vis}</h3>
                <p>Visibilitiy</p>
              </div>
            </div>

            <div className="third-bx">
              <div className="frst-dv">
                <div className="weather-headings">
                  <h1>Hourly Forecast</h1>
                  <img
                    className="arr-img"
                    alt="arr"
                    src={require("./assets/24hours.png")}
                  />
                </div>
              </div>
              <div className="scnd-dv">
                <div className="weather-next-days">
                  {Object.values(hw).map((element) => {
                    const wthrdesc = element.weather?.[0].main;
                    const wthrtyp = wthrdesc.toLowerCase();
                    return (
                      <div className="wthr-nxtday">
                        <h2>{Math.round(element.main.temp)}°C</h2>
                        <img
                          className="wind-img"
                          src={require(`./assets/${wthrtyp}.png`)}
                          alt="wind"
                        />
                        <h3>{element.dt_txt.slice(10, 16)}</h3>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : weather.cod === "404" ? (
          <div className="error-page">
            <div>
              <h1 className="err-p upper animated bounceInDown">
                City or state you searched for was not found !!!
                <br />{" "}
                <h1 className="err-p bot animated bounceInDown">
                  Please try again with different name !
                </h1>
              </h1>
              <img className="clds-img" src={pinkclouds} alt="clouds" />
            </div>
          </div>
        ) : (
          <div className="landing-page">
            <div>
              <h1 className="lndg-p animated bounceInDown">
                Welcome to Weather Watch.
                <br />{" "}
                <h1 className="lndg-p animated bounceInDown">
                  Search a weather for your favourite city !
                </h1>
              </h1>
              <img className="clds-img" src={pinkclouds} alt="clouds" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
