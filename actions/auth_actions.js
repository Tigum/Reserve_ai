import firebase from 'firebase';
import { AsyncStorage, Alert } from 'react-native'
import NavigationServices from './NavigationServices';
import _ from 'lodash'
import { Facebook } from 'expo'
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    AUTH_LOADING_ON,
    AUTH_LOADING_OFF,
    LOAD_LOGGEDIN_USER,
    EMAIL_PASSWORD_INPUT_FOCUS,
    REGISTERING_ON,
    REGISTERING_OFF,
    USER_LOADED_TRUE,
    USER_LOADED_FALSE,
    LOAD_AVATAR,
    LOAD_AVATAR_NULL,
    LOAD_AVATAR_DEFAULT,
    SET_TOKEN,
    URI,
    AUTH_LOADING,
    REGISTER_CLIENT_LOADING_OFF
} from './types';
import axios from 'axios'

const defaultAvatar = 'https://tigum.s3.amazonaws.com/1545314260.png'
const uri = 'http://localhost:3090'

export const emailAndPasswordInputFocus = (input) => {
    return {
        type: EMAIL_PASSWORD_INPUT_FOCUS,
        payload: input
    }
}

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
}

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}

// export const loginUser = ({ email, password }) => {
//     return async (dispatch) => {
//         authLoadingOn(dispatch)
//         try {
//             await firebase.auth().signInWithEmailAndPassword(email, password)
//         } catch (err) {
//             loginUserFail(dispatch)
//             alert(err)
//             return
//         }

//         try {
//             const { currentUser } = await firebase.auth()
//             if (currentUser) {
//                 try {
//                     await firebase.database().ref(`/users/${currentUser.uid}`).on('value', snapshot => {
//                         const { role } = snapshot.val()
//                         loginUserSuccess(dispatch, snapshot.val())
//                         if (role === 'admin') {
//                             NavigationServices.navigate('mainAdminScreen', {});
//                         } else {
//                             NavigationServices.navigate('mainClientScreen', {});
//                         }
//                     })
//                 } catch (err) {
//                     alert(err)
//                     return
//                 }
//             }

//         } catch (err) {
//             loginUserFail(dispatch)
//             alert(err)
//             return
//         }
//     }
// }

// export const loginUser = ({email, password}) => async (dispatch) => {
//     const response = axios.post(`${uri}/signin`, {
//         email, password
//     })
//     console.log('response', response)
// }


// export const doFacebookLogin = () => {
//     return async (dispatch) => {
//         authLoadingOn(dispatch)
//         try {
//             const result = await Facebook.logInWithReadPermissionsAsync('361785537896831', {
//                 permissions: ['public_profile'],
//                 behavior: 'web'
//             })
//             if (!result) {
//                 authLoadingOff(dispatch)
//                 return alert('Facebook login failed')
//             }

//             const { type, token } = result

//             if (type !== 'success') {
//                 authLoadingOff(dispatch)
//                 return alert('Facebook login failed')
//             }

//             try {
//                 await AsyncStorage.setItem('fb_token_reserve', token);
//             } catch (err) {
//                 alert(err)
//                 return
//             }

//             try {
//                 const provider = await new firebase.auth.FacebookAuthProvider.credential(token)

//                 if (provider) {
//                     try {
//                         const output = await firebase.auth().signInAndRetrieveDataWithCredential(provider)

//                         if (output) {
//                             const { user } = output

//                             try {
//                                 await firebase.database().ref(`/users/${user.uid}`).set({
//                                     name: user.displayName,
//                                     facebookRegistration: true,
//                                     role: 'client'
//                                 })
//                             } catch (err) {
//                                 alert(err)
//                                 return
//                             }

//                             try {
//                                 await firebase.database().ref(`/users/${user.uid}`).on('value', snapshot => {
//                                     dispatch({
//                                         type: LOAD_LOGGEDIN_USER,
//                                         payload: snapshot.val()
//                                     })
//                                 })


//                             } catch (err) {
//                                 alert(err)
//                                 return
//                             }
//                             authLoadingOff(dispatch)
//                             NavigationServices.navigate('mainClientScreen')

//                         }
//                     } catch (err) {
//                         alert(err)
//                         return
//                     }
//                 }

//             } catch (err) {
//                 alert(err)
//                 return
//             }


//         } catch (err) {
//             authLoadingOff(dispatch)
//             alert('Facebook authentication failed' + ' - ' + err)
//             return
//         }
//     }
// }


const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL,
    })
}

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    })
}

const authLoadingOn = (dispatch) => {
    dispatch({
        type: AUTH_LOADING_ON,
        payload: true
    })
}

const authLoadingOff = (dispatch) => {
    dispatch({
        type: AUTH_LOADING_OFF,
        payload: false
    })
}

// export const userLogOut = () => async () => {
//     Alert.alert(
//         'Log out',
//         'Tem certeza que deseja sair de sua conta?',
//         [
//             {
//                 text: 'Sim', onPress: async () => {

//                     try {
//                         await firebase.auth().signOut()
//                         NavigationServices.navigate('auth')
//                     } catch (err) {
//                         return alert(err)
//                     }

//                     try {
//                         await AsyncStorage.setItem('fb_token_reserve', '')
//                     } catch (err) {
//                         return alert(err)
//                     }

//                 }
//             },
//             {
//                 text: 'Não', onPress: () => {
//                 }
//             },
//         ],
//         { cancelable: false }
//     )
// }


export const authLoadingOnExport = () => {
    return {
        type: AUTH_LOADING_ON,
        payload: true
    }
}

export const authLoadingOffExport = () => {
    return {
        type: AUTH_LOADING_ON,
        payload: false
    }
}

export const registeringOn = () => {
    return {
        type: REGISTERING_ON,
        payload: true
    }
}

export const registeringOff = () => {
    return {
        type: REGISTERING_OFF,
        payload: false
    }
}

export const userLoadedTrue = () => {
    return {
        type: USER_LOADED_TRUE,
        payload: true
    }
}

export const userLoadedFalse = () => {
    return {
        type: USER_LOADED_FALSE,
        payload: false
    }
}

export const loadLoggedInUser = () => async (dispatch) => {
    try {
        const { currentUser } = await firebase.auth()
        try {
            await firebase.database().ref(`/users/${currentUser.uid}`).on('value', snapshot => {
                const user = snapshot.val()
                dispatch({
                    type: LOAD_LOGGEDIN_USER,
                    payload: user
                })
            })
        } catch (err) {
            alert(err)
            return
        }
    } catch (err) {
        alert(err)
        return
    }
}

// export const handleExistingUser = (user) => async (dispatch) => {
//     const { uid } = user
//     try {
//         await firebase.database().ref(`/users/${uid}`).once('value', snapshot => {
//             const userData = snapshot.val()
//             dispatch({
//                 type: LOAD_LOGGEDIN_USER,
//                 payload: userData
//             })
//         })
//     } catch (err) {
//         alert(err)
//         return
//     }
// }

export const renderAvatar = () => async (dispatch) => {
    try {
        const { currentUser } = await firebase.auth()

        if (currentUser) {
            const { uid } = currentUser

            try {
                await firebase.database().ref(`/users/${uid}`).on('value', snapshot => {
                    const { imageUrl } = snapshot.val()

                    dispatch({
                        type: LOAD_AVATAR,
                        payload: imageUrl
                    })
                })
            } catch (err) {
                alert(err)
                return
            }
        }

    } catch (err) {
        alert(err)
        return NavigationServices.navigate('auth')
    }
}

export const renderAvatarNull = () => {
    return {
        type: LOAD_AVATAR_NULL,
        payload: null
    }
}


export const setAvatarDefault = () => async () => {
    try {
        const { currentUser } = await firebase.auth()

        if (currentUser) {
            const { uid } = currentUser

            try {
                await firebase.database().ref(`/users/${uid}`).update({ imageUrl: defaultAvatar })
            } catch (err) {
                alert(err)
                return
            }
        }

    } catch (err) {
        alert(err)
        return NavigationServices.navigate('auth')
    }
}


///MONGODB SET UP


export const setToken = (token) => {
    return {
        type: SET_TOKEN,
        payload: token
    }
}


export const handleExistingUser = (token) => async (dispatch) => {
    try {

        if (token) {
            const user = await axios.get(`${URI}/loadUser`, {
                params: {
                    token: token
                }
            })

            if (user.data && !user.data.error) {
                dispatch({
                    type: LOAD_LOGGEDIN_USER,
                    payload: user.data
                })

                if (user.data.role === 'client') {
                    NavigationServices.navigate('mainClientScreen')
                    dispatch({
                        type: AUTH_LOADING,
                        payload: false
                    })
                    return
                }

                if (user.data.role === 'admin') {
                    NavigationServices.navigate('mainAdminScreen')
                    dispatch({
                        type: AUTH_LOADING,
                        payload: false
                    })
                    return
                }

                dispatch({
                    type: AUTH_LOADING,
                    payload: false
                })
                return NavigationServices.navigate('auth')

            } else {
                dispatch({
                    type: AUTH_LOADING,
                    payload: false
                })
                NavigationServices.navigate('auth')
            }

        } else {
            dispatch({
                type: AUTH_LOADING,
                payload: false
            })
            NavigationServices.navigate('auth')
        }
    } catch (err) {
        alert(err)
        dispatch({
            type: AUTH_LOADING,
            payload: false
        })
        NavigationServices.navigate('auth')
        return
    }
}


export const userLogOut = () => async () => {
    Alert.alert(
        'Log out',
        'Tem certeza que deseja sair de sua conta?',
        [
            {
                text: 'Sim', onPress: async () => {

                    try {
                        await AsyncStorage.removeItem('reserve_ai_token')
                        NavigationServices.navigate('auth')
                    } catch (err) {
                        return alert(err)
                    }

                }
            },
            {
                text: 'Não', onPress: () => {
                }
            },
        ],
        { cancelable: false }
    )
}

export const loginUser = ({ email, password }) => {
    return async (dispatch) => {
        authLoadingOn(dispatch)
        try {
            const user = await axios.post(`${URI}/signin`, { email, password })
            console.log('user fromt', user)
            if (user.data) {

                try {
                    await AsyncStorage.setItem('reserve_ai_token', user.data.token)
                    dispatch({
                        type: LOGIN_USER_SUCCESS,
                        payload: user.data
                    })

                    if (user.data.role === 'client') {
                        authLoadingOff(dispatch)
                        return NavigationServices.navigate('mainClientScreen')
                    }

                    if (user.data.role === 'admin') {
                        authLoadingOff(dispatch)
                        return NavigationServices.navigate('mainAdminScreen')
                    }

                    authLoadingOff(dispatch)
                    // return NavigationServices.navigate('auth')

                } catch (err) {
                    alert('1' + err)
                    authLoadingOff(dispatch)
                    NavigationServices.navigate('auth')
                }


            }
        } catch (err) {
            loginUserFail(dispatch)
            authLoadingOff(dispatch)
            alert('2' + err)
            return
        }

    }
}


export const doFacebookLogin = () => {
    return async (dispatch) => {
        authLoadingOn(dispatch)
        try {
            const result = await Facebook.logInWithReadPermissionsAsync('361785537896831', {
                permissions: ['public_profile'],
                behavior: 'web'
            })
            if (!result) {
                authLoadingOff(dispatch)
                return alert('Facebook login failed')
            }

            const { type, token } = result

            if (type !== 'success') {
                authLoadingOff(dispatch)
                return alert('Facebook login failed')
            }

            try {
                const response = await axios.get(`https://graph.facebook.com/me?access_token=${token}`);
                const { id, name } = response.data

                const user = {
                    email: `${id}@${id}.com`,
                    password: id,
                    role: 'client',
                    imageUrl: 'N/A',
                    phone: 'N/A',
                    facebookRegistration: true,
                    name
                }

                try {
                    const facebookExistingUser = await axios.get(`${URI}/checkIfUserExistsByEmail`, {
                        params: {
                            email: user.email
                        }
                    })

                    if (facebookExistingUser.data) {

                        try {
                            const facebookExistingUserInfo = await axios.post(`${URI}/signin`, {
                                email: user.email,
                                password: user.password
                            })

                            dispatch({
                                type: LOAD_LOGGEDIN_USER,
                                payload: facebookExistingUserInfo.data
                            })
                            
                            try {
                                await AsyncStorage.setItem('reserve_ai_token', facebookExistingUserInfo.data.token)
                            } catch (err) {
                                alert(err)
                                return
                            }

                            return NavigationServices.navigate('mainClientScreen')
                        } catch (err) {
                            alert(err)
                            return
                        }

                    }
                } catch (err) {
                    alert(err)
                    return
                }


                if (user) {
                    try {
                        const facebookUser = await axios.post(`${URI}/signup`, user)
                        console.log('facebookUser', facebookUser)
                        try {
                            await AsyncStorage.setItem('reserve_ai_token', facebookUser.data.token)
                            dispatch({
                                type: LOGIN_USER_SUCCESS,
                                payload: { ...facebookUser.data.user, token: facebookUser.data.token }
                            })
                            NavigationServices.navigate('mainClientScreen')
                            registerClientLoadingOff(dispatch)
                        } catch (err) {
                            registerClientLoadingOff(dispatch)
                            alert(err)
                            return
                        }
                    } catch (err) {
                        registerClientLoadingOff(dispatch)
                        alert(err)
                        return
                    }
                }

            } catch (err) {
                alert(err)
                return
            }

        } catch (err) {
            authLoadingOff(dispatch)
            alert('Facebook authentication failed' + ' - ' + err)
            return
        }
    }
}


const registerClientLoadingOff = (dispatch) => {
    dispatch({
        type: REGISTER_CLIENT_LOADING_OFF,
        payload: false
    })
}