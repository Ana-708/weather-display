import { WeatherIcon } from "./components/WeatherIcon";
import { FeaturedData } from "./components/FeaturedData";
import { MainData } from "./components/MainData";

import "./App.css";
import { TimeData } from "./components/TimeData";
import { fetchData } from "./utilities/fetchData";

import { useState, useEffect } from "react";
import { Forecast } from "./components/Forecast";
import { destructureDate } from "./utilities/time_data";

function App() {
  const [data, setData] = useState();

  function updateDate(date) {
    setData((previousData) => ({ ...previousData, time: date }));
  }

  useEffect(() => {
    let timerID = setInterval(() => {
      const date = destructureDate(new Date());

      updateDate(date);

      if (date.minute % 30 === 0 && parseInt(date.second, 10) === 0) {
        fetchData()
          .then((res) => {
            setData(res);
          })
          .catch((error) => console.error(error));
      }
    });
    fetchData()
      .then((res) => {
        setData({ ...res, time: destructureDate(new Date()) });
      })
      .catch((error) => console.error(error));

    return () => clearInterval(timerID);
  }, []);

  if (!data) return;
  // console.log(data.hourlyData);
  // return;

  return (
    <div className="app">
      <div className="featured-data">
        <FeaturedData city="Sinaia" />
      </div>

      <div className="temperature-display">
        <WeatherIcon temperature="16"/>
      </div>
      <div className="main-data">
        <MainData temp={data.temperature} tempa={data.apparentTemperature}/>
      </div>
      <div className="time-data">
        <TimeData data={`${data.time.day} - ${data.time.month} - ${data.time.year}`}
                  time={`${data.time.hour}:${data.time.minute}:${data.time.second}`}/>

      </div>
      <div className="forecast">
        <Forecast data={data.hourlyData} />
      </div>
    </div>
  );
}

export default App;
