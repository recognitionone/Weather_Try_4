import React from 'react';
import { API_KEY } from '../utils/WeatherApiKey';
import { observable, action, decorate } from 'mobx';

export default class WeatherStore extends React.Component {
  weathers = [];

  constructor(props) {
    super(props);
    this.componentDidMount();
  }

  componentDidMount() {
    return fetch(
      `http://api.openweathermap.org/data/2.5/forecast?APPID=${API_KEY}&units=metric&q=London,us`
    )
      .then(response => {
        if (!response.ok) {
          throw Error('Network request failed');
        }
        return response;
      })
      .then(data => data.json())
      .then(jsonData1 =>
        jsonData1.list.slice(0, 5).map(item => {
          return {
            id: Math.random(),

            temp: item.main.temp,
            temp_min: item.main.temp_min,
            temp_max: item.main.temp_max,
            pressure: item.main.pressure,

            weatherDesc: item.weather[0].main,
            weatherIcon: item.weather[0].icon,
          };
        })
      )
      .then(items => {
        this.weathers = items.map(i => {
          this.weathers.push(i);
          return this.weathers;
        });
      });
  }
}

decorate(WeatherStore, {
  weathers: observable,
  componentDidMount: action,
});