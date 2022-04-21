import React, { Component } from 'react';
import './App.css';
import Weather from './Weather';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',  
      weatherData: null,  
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    // API key !
    const apikey='3a89a784f3afb2d09555f693cdecd4d6';
    // zip from the input
    const zip = this.state.inputValue;
    // API request URL with the apikey and zip
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apikey}&units=imperial`;
    // Get data from the API with fetch
    fetch(url).then(res => res.json() ).then((json) => {
      // If the request was successful assign the data to component state
      this.setState({ weatherData: json });
     
    }).catch((err) => {

      this.setState({ weatherData: null });  
      console.log('-- Error fetching --');
      console.log(err.message);

    });
  }

  renderWeather() {
      console.log(this.state.weatherData);

    if (this.state.weatherData === null) {
      // no data returned from the API
      return undefined;
    }

    if (this.state.weatherData.cod !== 200) {
      // if the ZIP code is invalid or other error
      const errMessage = `${this.state.weatherData.message} - try another ZIP code`;
      return errMessage;
    }
    // Take the weather data apart to populate the component
    const { description, icon } = this.state.weatherData.weather[0];
    const { temp, pressure, humidity, temp_min, temp_max } = this.state.weatherData.main;
    const city = this.state.weatherData.name;
   

    return (
      <Weather
        city={city}
        description={description}
        icon={icon}
        temp={temp}
        pressure={pressure}
        humidity={humidity}
        tempMin={temp_min}
        tempMax={temp_max}
      />
    );
  }

  render() {
    return (
      <div className="App">

        <h1>Weather App</h1>

        {/** This input uses the controlled component pattern */}
        <form onSubmit={e => this.handleSubmit(e)}>

          {/**
          This pattern is used for input and other form elements
          et the valSue of the input to a value held in component state
          Set the value held in component state when a change occurs at the input
          */}
          <input
            value={this.state.inputValue}
            onChange={e => this.setState({ inputValue: e.target.value })}
            type="text"
            pattern="(\d{5}([\-]\d{4})?)"
            placeholder="ZIP"
          />

          <button type="submit">Submit</button>

        </form>

        {/** Conditionally render this component */}
        <div id='results'>
          {this.renderWeather()}
        </div>

      </div>
    );
  }
}


export default App;