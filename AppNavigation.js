import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import NavigationService from './actions/NavigationServices';
import { AntDesign } from '@expo/vector-icons';
import { BOTTOM_NAV_BACKGROUND_COLOR, HEADER_BACKGROUND_COLOR } from './app_styles'

import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterAdminFormScreen from './screens/RegisterAdminFormScreen'
import RegisterAdminAddressScreen from './screens/RegisterAdminAddressScreen'
import RegisterAdminCityAndStateScreen from './screens/RegisterAdminCityAndStateScreen'
import RegisterAdminHoursScreen from './screens/RegisterAdminHoursScreen'
import RegisterAdminDaysScreen from './screens/RegisterAdminDaysScreen'
import RegisterAdminPicScreen from './screens/RegisterAdminPicScreen'
import RegisterClientPicScreen from './screens/RegisterClientPicScreen'
import RegisterSaturdayHoursScreen from './screens/RegisterSaturdayHoursScreen'
import RegisterSundayHoursScreen from './screens/RegisterSundayHoursScreen'
import SelectEmployeesScreen from './screens/SelectEmployeesScreen'
import SettingsScreen from './screens/SettingsScreen'

import RegisterClientFormScreen from './screens/RegisterClientFormScreen'

import MainAdminScreen from './screens/MainAdminScreen'
import ServicesAdminScreen from './screens/ServicesAdminScreen'
import AddServicesScreen from './screens/AddServicesScreen'
import AddEmployeesScreen from './screens/AddEmployeesScreen'

class AppNavigation extends Component {
  
  render() {

    const authStack = createStackNavigator({
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
          addressForm: {
            screen: RegisterAdminAddressScreen,
            navigationOptions: () => ({
              // title: 'Cadastre-se',
              headerStyle: {
                display: 'none'
              }
            })
          },
          stateAndCityForm: {
            screen: RegisterAdminCityAndStateScreen,
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
          picFormClient: {
            screen: RegisterClientPicScreen,
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
          clientForm: {
            screen: RegisterClientFormScreen,
            navigationOptions: () => ({
              // title: 'Cadastre-se',
              headerStyle: {
                display: 'none'
              }
            })
          },
          welcome: WelcomeScreen,

        }),
        navigationOptions: () => ({
          header: null
        })
      }
    });

    const MainNavigator = createBottomTabNavigator({
      mainAdminScreen: {
        screen: createStackNavigator({
          mainAdminScreen: {
            screen: MainAdminScreen,
          },
          servicesAdmin: {
            screen: ServicesAdminScreen
          },
          selectEmployee: {
            screen: SelectEmployeesScreen
          }
        }),
        navigationOptions: () => ({
          // title: '',
          tabBarLabel: ({ tintColor }) => <AntDesign name="home" style={{ paddingBottom: 7 }} size={25} color={tintColor} />,
        })
      },

      settingsScreen: {
        screen: createStackNavigator({
          settingsScreen: {
            screen: SettingsScreen,
          }
        }),
        navigationOptions: () => ({
          // title: 'Settings',
          tabBarLabel: ({ tintColor }) => <AntDesign name="menuunfold" style={{ paddingBottom: 7 }} size={25} color={tintColor} />
        })
      }
    },
      {

        tabBarOptions: {
          activeTintColor: HEADER_BACKGROUND_COLOR,
          inactiveTintColor: '#737373',
          labelStyle: {
            fontSize: 12,
          },
          style: {
            backgroundColor: BOTTOM_NAV_BACKGROUND_COLOR,
          },
        }
      });

    const RootStack = createStackNavigator(
      {
        auth: {
          screen: authStack
        },
        Main: {
          screen: MainNavigator
        },
        addService: {
          screen: AddServicesScreen
        },
        addEmployee: {
          screen: AddEmployeesScreen
        },
      },
      {
        mode: 'modal',
        headerMode: 'none',
      }
    );

    return (
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


export default AppNavigation;