import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./Weather";
const apinumber = "";
const userweather = ({ onWeather }) => {
  return (
    <form onSubmit={e => onWeather(e)}>
      <input type="text" name="city" placeholder="The City for the Weather" />
      <input type="text" name="country" placeholder="The Country for the weather" />
      <button className="form-button">Weather for the place</button>
    </form>
  );
};
const headername = () => {
  return (
    <div>
      <h1 className="title-container__title">Weather Finder</h1>
      <h3 className="title-container__subtitle">
        Weather Website
      </h3>
    </div>
  );
};



class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };
  getWeather = async e => {
    e.preventDefault();
    const city = e.currentTarget.elements.city.value;
    const country = e.currentTarget.elements.country.value;
    if (city && country) {
      try {
        const info = await fetch(
          `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apinumber}&units=metric`
        );
        const { main, sys, name, weather } = await info.json();
        this.setState({
          temperature: main.temp,
          city: name,
          country: sys.country,
          humidity: main.humidity,
          description: weather[0].description,
          error: ""
        });
      } catch (weather) {
        console.log(weather);
      }
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "no place with that name"
      });
    }
  };
  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container" style={{ width: "100%" }}>
            <div className="row">
              <div className="col-xs-5 title-container">
                <headername />
              </div>
              <div className="col-xs-7 form-container">
                <userweather onWeather={this.getWeather} />
                <Weather
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
