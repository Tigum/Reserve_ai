import firebase from 'firebase';
import { AsyncStorage, Alert } from 'react-native'
import NavigationServices from './NavigationServices';
import { Facebook } from 'expo'
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    FACEBOOK_LOGIN_FAIL,
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGOUT_SUCCESS,
    AUTH_LOADING_ON,
    AUTH_LOADING_OFF,
    CLEAR_FORM,
    LOAD_LOGGEDIN_USER,
    EMAIL_PASSWORD_INPUT_FOCUS,
    USER_LOG_OUT_SUCCESS,
    CLEAR_MAIN_BUSINESS_LIST,
    RESET_APPLICATION_TO_INITIAL_STATE,
    ADD_AREA_TO_ADMIN,
    REMOVE_AREA_TO_ADMIN,
    REDIRECT_EXISTING_USER,
    REGISTERING_ON,
    REGISTERING_OFF,
    LOAD_REDIRECTED_USER,
} from './types';

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
        console.log('entrou login')
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

export const facebookLogout = () => async (dispatch) => {
    const token = await AsyncStorage.getItem('fb_token_reserve');
    if (token) {
        await firebase.auth().signOut()
        const routeName = 'auth'
        await AsyncStorage.setItem('fb_token_reserve', '');
        facebookLogoutSuccess(dispatch, routeName)
    }
};


export const doFacebookLogin = () => {
    return (dispatch) => {
        authLoadingOn(dispatch)
        Facebook.logInWithReadPermissionsAsync('361785537896831', {
            permissions: ['public_profile'],
            behavior: 'web'
        }).then((result) => {
            console.log('result', result)
            if (result.type === 'cancel') {
                return dispatch({ type: FACEBOOK_LOGIN_FAIL, payload: '' })
            }
            facebookLoginSuccess(dispatch, result.token)
        }).catch((err) => {
            authLoadingOff(dispatch)
            alert('Facebook authentication failed' + ' - ' + err)
        }
        );
    }
}   

const facebookLoginSuccess = async (dispatch, token) => {
    if (!token) {
        authLoadingOff(dispatch)
        return alert('Facebook authentication failed')
    }
    try {
        await AsyncStorage.setItem('fb_token_reserve', token);
        const provider = await new firebase.auth.FacebookAuthProvider.credential(token)
        await firebase.auth().signInAndRetrieveDataWithCredential(provider).then(function (result) {
            console.log('result', result)
            const user = result.user;
            const name = user.displayName
            firebase.database().ref(`/users/${user.uid}`).set({ name, facebookRegistration: true, role: 'client' })
        })
    } catch (err) {
        alert(err)
    }
    const { currentUser } = await firebase.auth()
    firebase.database().ref(`/users/${currentUser.uid}`).on('value', snapshot => {
        const user = snapshot.val()
        console.log('userrr', user)
        authLoadingOff(dispatch)
        dispatch({
            type: FACEBOOK_LOGIN_SUCCESS,
            payload: { token, user }
        })
    })
}

const facebookLogoutSuccess = (dispatch, routeName) => {
    dispatch({
        type: FACEBOOK_LOGOUT_SUCCESS,
        payload: routeName
    })
}

const userLogoutSuccess = (dispatch, routeName) => {
    dispatch({
        type: USER_LOG_OUT_SUCCESS,
        payload: routeName
    })
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

const clearForm = (dispatch) => {
    dispatch({
        type: CLEAR_FORM,
    })
}

export const userLogOut = () => async (dispatch) => {
    Alert.alert(
        'Log out',
        'Tem certeza que deseja sair de sua conta?',
        [
            {
                text: 'Sim', onPress: async () => {

                    try{
                        await firebase.auth().signOut()
                    } catch(err) {
                        return alert(err)
                    }

                    try{
                        await AsyncStorage.setItem('fb_token_reserve', '')
                    } catch(err) {
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

const resetApplicationToInitialState = (dispatch) => {
    dispatch({
        type: RESET_APPLICATION_TO_INITIAL_STATE,
    })
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

const loadedRedictedUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOAD_REDIRECTED_USER,
        payload: user
    })
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