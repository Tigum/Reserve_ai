import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux'
import firebase from 'firebase';
import store from './store';
import AppNavigation from './AppNavigation'
import { Spinner } from './components/Spinner'


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
    YellowBox.ignoreWarnings(['Remote debugger']);
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}

