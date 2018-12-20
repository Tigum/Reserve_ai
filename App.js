import React from 'react';
import { Provider } from 'react-redux'
import firebase from 'firebase';
import store from './store';
import AppNavigation from './AppNavigation'
import { Spinner } from './components/Spinner'


export default class App extends React.Component {

  componentWillMount() {
    const config = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: ""
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}

