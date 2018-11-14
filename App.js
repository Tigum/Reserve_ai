import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux'
import firebase from 'firebase';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import NavigationService from './actions/NavigationServices';

import store from './store';
import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterAdminFormScreen from './screens/RegisterAdminFormScreen'
import RegisterAdminHoursScreen from './screens/RegisterAdminHoursScreen'
import RegisterAdminDaysScreen from './screens/RegisterAdminDaysScreen'
import RegisterAdminPicScreen from './screens/RegisterAdminPicScreen'
import RegisterSaturdayHoursScreen from './screens/RegisterSaturdayHoursScreen'
import RegisterSundayHoursScreen from './screens/RegisterSundayHoursScreen'
import MainAdminScreen from './screens/MainAdminScreen'
import ServicesAdminScreen from './screens/ServicesAdminScreen'
import AddServicesScreen from './screens/AddServicesScreen'

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

      auth: {

        screen: createStackNavigator({
          auth: {
            screen: LoginScreen,
            navigationOptions: () => ({
              headerStyle: {
                display: 'none'
              }
            })
          },
          adminForm: {
            screen: RegisterAdminFormScreen,
            navigationOptions: () => ({
              // title: 'Cadastre-se',
              headerStyle: {
                display: 'none'
              }
            })
          },
          hoursForm: {
            screen: RegisterAdminHoursScreen,
            navigationOptions: () => ({
              // title: 'Cadastre-se',
              headerStyle: {
                display: 'none'
              }
            })
          },
          daysForm: {
            screen: RegisterAdminDaysScreen,
            navigationOptions: () => ({
              // title: 'Cadastre-se',
              headerStyle: {
                display: 'none'
              }
            })
          },
          picForm: {
            screen: RegisterAdminPicScreen,
            navigationOptions: () => ({
              // title: 'Cadastre-se',
              headerStyle: {
                display: 'none'
              }
            })
          },
          saturdayForm: {
            screen: RegisterSaturdayHoursScreen,
            navigationOptions: () => ({
              // title: 'Cadastre-se',
              headerStyle: {
                display: 'none'
              }
            })
          },
          sundayForm: {
            screen: RegisterSundayHoursScreen,
            navigationOptions: () => ({
              // title: 'Cadastre-se',
              headerStyle: {
                display: 'none'
              }
            })
          },
          welcome: WelcomeScreen,

        }),
        navigationOptions: {
          tabBarVisible: false
        }
      },
      mainAdminScreen: {
        screen: createStackNavigator({
          mainAdminScreen: {
            screen: MainAdminScreen
          },
          servicesAdmin: {
            screen: ServicesAdminScreen
          },
          // addService: {
          //   screen: AddServicesScreen,
          // },
        }),
        navigationOptions: () => ({
          title: 'Hoje'
        })
      }
    });

    const RootStack = createStackNavigator(
      {
        Main: {
          screen: MainNavigator,
        },
        addService: {
          screen: AddServicesScreen,
        },
      },
      {
        mode: 'modal',
        headerMode: 'none',
      }
    );

    return (
      <Provider store={store}>
        <ActionSheetProvider>
          <View style={styles.container}>
            {/* <MainNavigator /> */}
            <RootStack 
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </View>
        </ActionSheetProvider>
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
