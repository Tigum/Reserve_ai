import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux'

import store from './store';
import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/LoginScreen'

export default class App extends React.Component {
  render() {
    const MainNavigator = createBottomTabNavigator({
      // welcome: WelcomeScreen,
      auth: LoginScreen,
      // main: {
      //   screen: createBottomTabNavigator({
      //     map: MapScreen,
      //     deck: DeckScreen,
      //     review: {
      //       screen: createStackNavigator({
      //         review: ReviewScreen,
      //         settings: SettingsScreen
      //       })
      //     }
      //   })
      // }
    });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
