import React, { useEffect, useState } from "react";
import "./weather.css";
import Search from "../search/Search";

const Weather = () => {
  const [search, setSearch] = useState("lucknow");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [errMsg,setErrMsg] = useState("");
  const [temp,setTemp] = useState(null);
  const [desc,setDesc] = useState("");


  const searchWeather = async (params) => {
    

    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${params}&appid=e06069302a9a7cbcb69b9333bc028392`
      );

      const data = await res.json();
      console.log(data); 
      setWeatherData(data);

      const {main} = data;
      setTemp(Math.floor(main.temp - 273.15));

      const {weather} = data;
      setDesc(weather[0]?.main);
      
      setLoading(false);
      
      // console.log(weatherData);
    } catch (err) {
    // console.log(err);
    setErrMsg(err.message);
    setLoading(false);

    }
  };

  function getCurrentdate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  // const getCurrentTemp = () => {
  //   const {main} = weatherData || 0;
  //   let tempInKelvin = main?.temp;

  //   let tempInCelcius = Math.floor(tempInKelvin - 273.15);

  //   return tempInCelcius
  // }

  const checkForRain = () => {
    if(desc === "Rain"){
     let screen = document.querySelector(".weather-screen");
     
     screen.classList.add("rain");
    }else if(desc !== "Rain"){
      let screen = document.querySelector(".weather-screen");
      screen.classList.remove("rain");
    }
  }


  useEffect(() => {
   searchWeather("lucknow")
  },[])

  useEffect(() => {
  checkForRain();
  if(desc === "Rain"){

  }
  },[desc])




  if(weatherData?.cod === '404' || weatherData?.cod === '400'){
    return(
      <div className={"weather-screen"}>
      {/* Search Component */}
      <Search search={search} setSearch={setSearch} searchWeather={searchWeather}/>

      <div style={{fontSize:"40px",fontWeight:"bold"}}>No Data Found</div>
    </div>
    )
  }

  

  return (
    <div className={`weather-screen ${temp >= 15 && temp <= 40? "medium" : temp > 40? "extreme-hot" : temp <= 0? "freezing" : "moderate"}`}>
      {/* Search Component */}
      <Search search={search} setSearch={setSearch} searchWeather={searchWeather}/>
      
      {/* Weather Component */}
      {weatherData && loading === false? (
        <div className="weather-info">

        {/* city and country */}
          <div className="city">
            <h1>{weatherData?.name}</h1>
            <p>{weatherData?.sys?.country}</p>
          </div>

          {/* current date */}
          <div className="currentDate">{getCurrentdate()}</div>

          {/* current temp */}
          <div className="currentTemp">{temp} °C</div>

          {/* description */}
          <div className="description">
            {weatherData?.weather[0]?.description}
          </div>

          {/* wind speed */}
          <div className="speed-humid">
            <span><p>{weatherData?.wind?.speed}</p> <p>Wind speed</p></span>
            <span><p>{weatherData?.main?.humidity}%</p> <p>Humidity</p></span>
          </div>


        </div>
      ):(<div className='loading-data' style={{fontSize:"40px",fontWeight:"bold"}}>Loading...please wait</div>) }
    </div>
  );
};

export default Weather;
