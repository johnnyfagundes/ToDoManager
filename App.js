import React, {Component} from 'react';
import {Platform, StyleSheet, SafeAreaView, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    console.log('as');
    return (

      <SafeAreaView ref='main' style={styles.container}>
        
        <View ref='first'  style={styles.first}>
          <View style={styles.area}/>
          <View style={styles.area}/>
          <View style={styles.area}/>
        </View>

        <View  ref='second' style={styles.second}>
          <View style={styles.area}/>
          <View style={styles.area}/>
          <View style={styles.area}/>
        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  first: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  second: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center'
  },
  area: {
    width: 50,
    height: 50,
    backgroundColor: 'blue'
  }
});
