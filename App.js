import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux'
import firebase from 'firebase';

import store from './store';
import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/LoginScreen'

export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyCM6rHiPMhMrh-Yog_edEmmb88suR_6nGE",
      authDomain: "reserveai-d423e.firebaseapp.com",
      databaseURL: "https://reserveai-d423e.firebaseio.com",
      projectId: "reserveai-d423e",
      storageBucket: "reserveai-d423e.appspot.com",
      messagingSenderId: "157063787516"
    };
    firebase.initializeApp(config);
  }

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
