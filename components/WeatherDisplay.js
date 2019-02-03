import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { observable, action, decorate } from 'mobx';
import { observer } from 'mobx-react';

const today = new Date().getDay();
const week = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const oldWeek = [
  'Sunnandæg',
  'Mōnandæg',
  'Tīwesdæg',
  'Wōdnesdæg',
  'Þunresdæg',
  'Frīgedæg',
  'Sæternesdæg',
];

const weekDays = week;

const Board = observer(
  class Board extends React.Component {
    weather = this.props.weathers;
    weatherForThatDay = null;

    handleClick(i) {
      this.weatherForThatDay = this.weather.slice(i, i + 1);
    }

    renderWeekButton(i) {
      return (
        <View>
          <Button
            onPress={() => this.handleClick(i)}
            title={weekDays[(today + i) % 7]}
          />
        </View>
      );
    }

    render() {
      return (
        <View>
          <Text>Today might be {weekDays[today % 7]} in London</Text>
          <View>
            {this.renderWeekButton(0)}
            {this.renderWeekButton(1)}
            {this.renderWeekButton(2)}
            {this.renderWeekButton(3)}
            {this.renderWeekButton(4)}
          </View>

          <View>
            {!this.weatherForThatDay ? (
              <Text>'Click any day to see the weather'</Text>
            ) : (
              this.weatherForThatDay.map(item => (
                <View key={item.id}>
                  <Text>Temperature: {item.temp} </Text>
                  <Text>Temperature min: {item.temp_min} </Text>
                  <Text>Temperature max: {item.temp_max} </Text>
                  <Text>Pressure: {item.pressure} </Text>
                  <Text>Description: {item.weatherDesc}</Text>
                </View>
              ))
            )}
            
          </View>
        </View>
      );
    }
  }
);

decorate(Board, {
  weather: observable,
  weatherForThatDay: observable,
  handleClick: action,
  renderWeekButton: action,
});

export default class WeatherDisplay extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Board weathers={this.props.weathers} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
});
