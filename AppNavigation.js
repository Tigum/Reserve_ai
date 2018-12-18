import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import NavigationService from './actions/NavigationServices';
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import { BOTTOM_NAV_BACKGROUND_COLOR, HEADER_BACKGROUND_COLOR } from './app_styles'
import { loadUser, authLoadingOnExport, authLoadingOffExport, registeringOn, registeringOff } from './actions'

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
import MainClientScreen from './screens/MainClientScreen';

import RegisterClientFormScreen from './screens/RegisterClientFormScreen'

import MainAdminScreen from './screens/MainAdminScreen'
import ServicesAdminScreen from './screens/ServicesAdminScreen'
import AddServicesScreen from './screens/AddServicesScreen'
import AddEmployeesScreen from './screens/AddEmployeesScreen'
import { Spinner } from './components/Spinner'
import RegisterAdminTypeScreen from './screens/RegisterAdminTypeScreen';


class AppNavigation extends Component {

  

    componentDidMount() {
        console.log('registering', this.props.registering)
        if (!this.props.registering) {
            // this.loadExistingUser()
        }
    }

    loadExistingUser() {
        this.props.authLoadingOnExport()
        firebase.auth().onAuthStateChanged(async user => {
            const userAuth = await user
            if (userAuth) {
                this.setState({ loading: true }, async () => {
                    const uid = await user.uid
                    firebase.database().ref(`/users/${uid}`).on('value', async snapshot => {
                        const userInfo = await snapshot.val()
                        this.props.loadUser(userInfo)
                        this.props.authLoadingOffExport()
                    })
                })
            } else {
                this.props.registeringOn()
                this.props.authLoadingOffExport()
            }
        })
    }

 
    render() {

        if (this.props.loading) {
            return <Spinner fontSize={11} text='CARREGANDO...' />
        }

        const authStack = createStackNavigator({
            auth: {

                screen: createStackNavigator({
                    // picForm: {
                    //     screen: RegisterAdminPicScreen,
                    //     navigationOptions: () => ({
                    //         headerStyle: {
                    //             display: 'none'
                    //         }
                    //     })
                    // },
                    auth: {
                        screen: LoginScreen,
                        navigationOptions: () => ({
                            headerStyle: {
                                display: 'none'
                            }
                        })
                    },
                    adminTypeForm: {
                        screen: RegisterAdminTypeScreen,
                        navigationOptions: () => ({
                            headerStyle: {
                                display: 'none'
                            }
                        })
                    },
                    adminForm: {
                        screen: RegisterAdminFormScreen,
                        navigationOptions: () => ({
                            headerStyle: {
                                display: 'none'
                            }
                        })
                    },
                    hoursForm: {
                        screen: RegisterAdminHoursScreen,
                        navigationOptions: () => ({
                            headerStyle: {
                                display: 'none'
                            }
                        })
                    },
                    addressForm: {
                        screen: RegisterAdminAddressScreen,
                        navigationOptions: () => ({
                            headerStyle: {
                                display: 'none'
                            }
                        })
                    },
                    stateAndCityForm: {
                        screen: RegisterAdminCityAndStateScreen,
                        navigationOptions: () => ({
                            headerStyle: {
                                display: 'none'
                            }
                        })
                    },
                    daysForm: {
                        screen: RegisterAdminDaysScreen,
                        navigationOptions: () => ({
                            headerStyle: {
                                display: 'none'
                            }
                        })
                    },
                    picForm: {
                        screen: RegisterAdminPicScreen,
                        navigationOptions: () => ({
                            headerStyle: {
                                display: 'none'
                            }
                        })
                    },
                    picFormClient: {
                        screen: RegisterClientPicScreen,
                        navigationOptions: () => ({
                            headerStyle: {
                                display: 'none'
                            }
                        })
                    },
                    saturdayForm: {
                        screen: RegisterSaturdayHoursScreen,
                        navigationOptions: () => ({
                            headerStyle: {
                                display: 'none'
                            }
                        })
                    },
                    sundayForm: {
                        screen: RegisterSundayHoursScreen,
                        navigationOptions: () => ({
                            headerStyle: {
                                display: 'none'
                            }
                        })
                    },
                    clientForm: {
                        screen: RegisterClientFormScreen,
                        navigationOptions: () => ({
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

        const MainNavigatorAdmin = createBottomTabNavigator({
            mainAdminScreen: {
                screen: createStackNavigator({
                    mainAdminScreen: {
                        screen: MainAdminScreen,
                        navigationOptions: () => ({
                            headerStyle: {
                                display: 'none'
                            }
                        })
                    },
                    servicesAdmin: {
                        screen: ServicesAdminScreen,
                        navigationOptions: () => ({
                            headerStyle: {
                                display: 'none'
                            }
                        })
                    },
                    selectEmployee: {
                        screen: SelectEmployeesScreen
                    }
                }),
                navigationOptions: () => ({
                    tabBarLabel: ({ tintColor }) => <AntDesign name="home" style={{ paddingBottom: 7 }} size={25} color={tintColor} />,
                })
            },

            settingsScreen: {
                screen: createStackNavigator({
                    settingsScreen: {
                        screen: SettingsScreen,
                        navigationOptions: () => ({
                            headerStyle: {
                                display: 'none'
                            }
                        })
                    }
                }),
                navigationOptions: () => ({
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


        const MainNavigatorClient = createBottomTabNavigator({
            mainClientScreen: {
                screen: createStackNavigator({
                    mainClientScreen: {
                        screen: MainClientScreen,
                        navigationOptions: () => ({
                            headerStyle: {
                                display: 'none'
                            }
                        })
                    },
                }),
                navigationOptions: () => ({
                    tabBarLabel: ({ tintColor }) => <AntDesign name="home" style={{ paddingBottom: 7 }} size={25} color={tintColor} />,
                })
            },

            settingsScreen: {
                screen: createStackNavigator({
                    settingsScreen: {
                        screen: SettingsScreen,
                        navigationOptions: () => ({
                            headerStyle: {
                                display: 'none'
                            }
                        })
                    }
                }),
                navigationOptions: () => ({
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
                    screen: this.props.user && this.props.user.role === 'admin' ? MainNavigatorAdmin : MainNavigatorClient
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
        console.log('propssss', this.props)
        return (
            <ActionSheetProvider>
                <View style={styles.container}>
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

const mapStateToProps = ({ auth }) => {
    const { token, userName, routeName, user, loading, registering} = auth
    return { token, userName, routeName, user, loading, registering }
}

export default connect(mapStateToProps, {loadUser, authLoadingOnExport, authLoadingOffExport, registeringOn, registeringOff })(AppNavigation);