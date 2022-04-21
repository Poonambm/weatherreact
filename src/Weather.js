import React from 'react';
import Temperature from './Temperature';

const Weather = ({ city, description, icon, temp, pressure, humidity, tempMin, tempMax }) => (

  <div>
    <h2>{new Date().toLocaleString() + ""}</h2>
    <h2>{city}</h2>
    <div id="forecast-header">
      <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather icon" />
      <div className="main-forecast flex-row">
           <Temperature temp={temp} />
      </div>
    </div>
    <div className="forecast-desc flex-row">
      <legend className="legend">Description:</legend>
      <p className="no-margin">{description}</p>
    </div>
    <div className="flex-row">
      <legend className="legend">Low:</legend>
      <Temperature temp={tempMin} />
    </div>
    <div className="flex-row">
      <legend className="legend">High:</legend>
      <Temperature temp={tempMax} />
    </div>
    <div className="flex-row">
      <legend className="legend">Humidity:</legend>
      <p className="no-margin">{humidity}%</p>
    </div>
  </div>
);

export default Weather;