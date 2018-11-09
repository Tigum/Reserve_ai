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
    FACEBOOK_LOGOUT_SUCCESS,
    AUTH_LOADING_ON,
    AUTH_LOADING_OFF,
    CLEAR_FORM
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
        authLoadingOn(dispatch)
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                const { currentUser } = firebase.auth()
                firebase.database().ref(`/users/${currentUser.uid}`)
                    .on('value', async snapshot => {
                        const user = await snapshot.val()
                        loginUserSuccess(dispatch, user).then(() => authLoadingOff(dispatch))
                    })
            })
            .catch((error) => {
                console.log(error)
                loginUserFail(dispatch)
            })
    }
}

export const facebookLogin = () => async (dispatch) => {
    const token = await AsyncStorage.getItem('fb_token_reserve');

    if (token) {
        authLoadingOn(dispatch)
        const provider = await new firebase.auth.FacebookAuthProvider.credential(token)
        firebase.auth().signInAndRetrieveDataWithCredential(provider).then(function (result) {
            const token = result.credential.accessToken;
            const user = result.user;
            const name = user.displayName
            const routeName = 'welcome'
            facebookLoginSuccess(dispatch, token, name, routeName, user).then(() => authLoadingOff(dispatch))
        }).catch((err) => {
            console.log(err)
        })
    }
};

export const facebookLogout = () => async (dispatch) => {
    const token = await AsyncStorage.getItem('fb_token_reserve');
    if (token) {
        await firebase.auth().signOut()
        const routeName = 'auth'
        await AsyncStorage.setItem('fb_token_reserve', '');
        facebookLogoutSuccess(dispatch, routeName)
    }
};

export const doFacebookLogin = () => async (dispatch) => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('361785537896831', {
        permissions: ['public_profile']
    });
    authLoadingOn(dispatch)
    if (type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL, payload: token })
    }

    await AsyncStorage.setItem('fb_token_reserve', token);

    const provider = await new firebase.auth.FacebookAuthProvider.credential(token)

    firebase.auth().signInAndRetrieveDataWithCredential(provider).then( async function (result) {
        const token = result.credential.accessToken;
        const user = result.user;
        const name = user.displayName
        const routeName = 'welcome'
        await firebase.database().ref(`/users/${user.uid}`).set({ name, facebookRegistration: true, role: 'client' })
        facebookLoginSuccess(dispatch, token, name, routeName, user).then(() => authLoadingOff(dispatch))
    }).catch((err) => {
        console.log(err)
    })

}

const facebookLoginSuccess = (dispatch, token, userName, routeName, user) => {
    dispatch({
        type: FACEBOOK_LOGIN_SUCCESS,
        payload: { token, userName, routeName, user }
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