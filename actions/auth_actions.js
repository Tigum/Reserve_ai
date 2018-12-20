import firebase from 'firebase';
import { AsyncStorage, Alert } from 'react-native'
import NavigationServices from './NavigationServices';
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
} from './types';

const defaultAvatar = 'https://tigum.s3.amazonaws.com/1545314260.png'

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

export const loginUser = ({ email, password }) => {
    return async (dispatch) => {
        authLoadingOn(dispatch)
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (err) {
            loginUserFail(dispatch)
            alert(err)
            return
        }

        try {
            const { currentUser } = await firebase.auth()
            if (currentUser) {
                try {
                    await firebase.database().ref(`/users/${currentUser.uid}`).on('value', snapshot => {
                        const { role } = snapshot.val()
                        loginUserSuccess(dispatch, snapshot.val())
                        if (role === 'admin') {
                            NavigationServices.navigate('mainAdminScreen', {});
                        } else {
                            NavigationServices.navigate('mainClientScreen', {});
                        }
                    })
                } catch (err) {
                    alert(err)
                    return
                }
            }

        } catch (err) {
            loginUserFail(dispatch)
            alert(err)
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
                await AsyncStorage.setItem('fb_token_reserve', token);
            } catch (err) {
                alert(err)
                return
            }

            try {
                const provider = await new firebase.auth.FacebookAuthProvider.credential(token)

                if (provider) {
                    try {
                        const output = await firebase.auth().signInAndRetrieveDataWithCredential(provider)

                        if (output) {
                            const { user } = output

                            try {
                                await firebase.database().ref(`/users/${user.uid}`).set({
                                    name: user.displayName,
                                    facebookRegistration: true,
                                    role: 'client'
                                })
                            } catch (err) {
                                alert(err)
                                return
                            }

                            try {
                                await firebase.database().ref(`/users/${user.uid}`).on('value', snapshot => {
                                    dispatch({
                                        type: LOAD_LOGGEDIN_USER,
                                        payload: snapshot.val()
                                    })
                                })


                            } catch (err) {
                                alert(err)
                                return
                            }
                            authLoadingOff(dispatch)
                            NavigationServices.navigate('mainClientScreen')

                        }
                    } catch (err) {
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

export const userLogOut = () => async () => {
    Alert.alert(
        'Log out',
        'Tem certeza que deseja sair de sua conta?',
        [
            {
                text: 'Sim', onPress: async () => {

                    try {
                        await firebase.auth().signOut()
                    } catch (err) {
                        return alert(err)
                    }

                    try {
                        await AsyncStorage.setItem('fb_token_reserve', '')
                    } catch (err) {
                        return alert(err)
                    }

                    return NavigationServices.navigate('auth')
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

export const handleExistingUser = (user) => async (dispatch) => {
    const { uid } = user
    try {
        await firebase.database().ref(`/users/${uid}`).once('value', snapshot => {
            const userData = snapshot.val()
            dispatch({
                type: LOAD_LOGGEDIN_USER,
                payload: userData
            })
        })
    } catch (err) {
        alert(err)
        return
    }
}

export const renderAvatar = () => async(dispatch) => {
    try{
        const { currentUser } = await firebase.auth()

        if(currentUser) {
            const { uid } = currentUser

            try{
                await firebase.database().ref(`/users/${uid}`).on('value', snapshot =>{
                    const { imageUrl } = snapshot.val()
                    console.log('snap', snapshot.val())

                    dispatch({
                        type: LOAD_AVATAR,
                        payload: imageUrl
                    })
                })
            }catch(err){
                alert(err)
                return
            }
        }

    }catch(err){
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


export const setAvatarDefault = () => async() => {
    try{
        const { currentUser } = await firebase.auth()

        if(currentUser) {
            const { uid } = currentUser

            try{
                await firebase.database().ref(`/users/${uid}`).update({ imageUrl: defaultAvatar})
            }catch(err){
                alert(err)
                return
            }
        }

    }catch(err){
        alert(err)
        return NavigationServices.navigate('auth')
    }
}