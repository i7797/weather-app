import React from "react";
import wind from "./assets/wind.png";
import condition from "./assets/weather (1).png";
import location from "./assets/pin.png";
import { useState, useEffect } from "react";
const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!city) return;

    fetch(
      `http://api.weatherapi.com/v1/current.json?key=0cecfd29f7cb428bb88182306242308&q=${city}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setWeather(null);
          setError(null);
        } else {
          setWeather(data);
          setError(null);
        }
      })

      .catch((error) => {
        setWeather(null);
        setError("Error while fetching");
      });
  }, [city]);

  const handelSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className=" bg-gradient-to-t from-blue-200 to-pink-500 text-white min-h-screen  flex items-center justify-center">
        <div className="bg-gray-700 p-8 max-w-md w-full rounded-lg shadow-lg">
          <h1 className="text-3xl font-extralight text-center mb-9">
            Get ur weather
          </h1>

          <from className="flex mb-4" onSubmit={handelSubmit}>
            <input
              className="flex-grow text-gray-600 px-4  py-2 rounded-xl"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter City "
            />

            <button type="submit" className="w-20">
              Cheak
            </button>
          </from>

          {error && <p className="text-red-400 text-center">{error}</p>}

          {weather && weather.current && (
            <div className="text-center">
              <p className="text-4xl m-3">{weather.current.temp_c} °C</p>
              <div className="flex justify-center space-x-3">
                <img className="w-6 h-6 mt-1" src={location} />

                <h1 className="text-2xl font-extralight">
                  {weather.location.name}
                </h1>
              </div>

              <div className="flex justify-center  mr-10 space-x-3">
                <img className="w-6 h-6 mt-1 " src={condition} />

                <h1 className="text-lg mt-2 mr-20  ">
                  {weather.current.condition.text}
                </h1>
              </div>

              <div className="flex justify-center   mr-4 space-x-3">
                <img className="w-6 h-6  " src={wind} />

                <p className="text-lg "> {weather.current.wind_kph} km/h</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default App;
