import * as React from 'react';
import { Constants } from 'expo';
import WeatherStore from './components/WeatherStore';
import WeatherDisplay from './components/WeatherDisplay';
import { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


const weatherStore = new WeatherStore();

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>        
        <Text>Hello fellow fuman</Text>
        <WeatherDisplay weathers={weatherStore.weathers} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
