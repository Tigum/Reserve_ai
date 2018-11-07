import firebase from 'firebase';
import { AsyncStorage } from 'react-native'
import { Facebook } from 'expo'
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    FACEBOOK_LOGIN_FAIL,
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGOUT_SUCCESS
} from './types';


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
    return (dispatch) => {
        dispatch({ type: LOGIN_USER })
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch((error) => {
                console.log(error)
                loginUserFail(dispatch)
                // firebase.auth().createUserWithEmailAndPassword( email, password )
                //     .then(user => loginUserSuccess(dispatch, user))
                //     .catch(() => loginUserFail(dispatch))
            })
    }
}

export const facebookLogin = () => async (dispatch) => {
    const token = await AsyncStorage.getItem('fb_token_reserve');

    if (token) {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const userName = (await response.json()).name
        const routeName = 'welcome'

        await facebookLoginSuccess(dispatch, token, userName, routeName)
    }
};

export const facebookLogout = () => async (dispatch) => {
    const token = await AsyncStorage.getItem('fb_token_reserve');
    if (token) {
    
        const routeName = 'auth'
        await AsyncStorage.setItem('fb_token_reserve', '');
        facebookLogoutSuccess(dispatch, routeName)
    }
};

export const doFacebookLogin = () => async (dispatch) => {

    let { type, token } = await Facebook.logInWithReadPermissionsAsync('361785537896831', {
        permissions: ['public_profile']
    });

    if (type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL, payload: { token, userName } })
    }
    
    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
    const userName = (await response.json()).name
    const routeName = 'welcome'

    await AsyncStorage.setItem('fb_token_reserve', token);

    await facebookLoginSuccess(dispatch, token, userName, routeName)

}

const facebookLoginSuccess = (dispatch, token, userName, routeName) => {
    dispatch({
        type: FACEBOOK_LOGIN_SUCCESS,
        payload: { token, userName, routeName }
    })
}

const facebookLogoutSuccess = (dispatch, routeName) => {
    dispatch({
        type: FACEBOOK_LOGOUT_SUCCESS,
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

    // Actions.main();
}