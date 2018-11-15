import firebase from 'firebase';
import { RNS3 } from 'react-native-aws3';
import NavigationService from './NavigationServices';
import {
    NAME_CLIENT_REGISTER_CHANGED,
    EMAIL_CLIENT_REGISTER_CHANGED,
    PHONE_CLIENT_REGISTER_CHANGED,
    PASSWORD_CLIENT_REGISTER_CHANGED,
    PASSWORD_CONFIRMATION_CLIENT_REGISTER_CHANGED,
    REGISTER_CLIENT_LOADING_ON,
    REGISTER_CLIENT_LOADING_OFF,
    CLEAR_FORM,
    CLIENT_USER_REGISTERED_SUCCESS
} from './types';

export const nameClientChanged = (text) => {
    return {
        type: NAME_CLIENT_REGISTER_CHANGED,
        payload: text
    }
}

export const emailClientChanged = (text) => {
    return {
        type: EMAIL_CLIENT_REGISTER_CHANGED,
        payload: text
    }
}

export const phoneClientChanged = (text) => {
    return {
        type: PHONE_CLIENT_REGISTER_CHANGED,
        payload: text
    }
}

export const passwordClientChanged = (text) => {
    return {
        type: PASSWORD_CLIENT_REGISTER_CHANGED,
        payload: text
    }
}

export const passwordConfirmationClientChanged = (text) => {
    return {
        type: PASSWORD_CONFIRMATION_CLIENT_REGISTER_CHANGED,
        payload: text
    }
}

export const checkIfClientEmailExistsAndRegister = ({ email, errorMessage, errorRouteName, successRouteName, userInfo }) => async (dispatch) => {
    registerClientLoadingOn(dispatch)
    const result = await firebase.auth().fetchSignInMethodsForEmail(email)
    if (result.length > 0) {
        console.log('result', result)
        clearForm(dispatch)
        registerClientLoadingOff(dispatch)
        alert(errorMessage)
        return NavigationService.navigate(errorRouteName, {})
    }

    const { name, password } = userInfo

    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const { currentUser } = await firebase.auth()
        const user = currentUser
        await currentUser.updateProfile({ displayName: name })
        await firebase.database().ref(`/users/${currentUser.uid}`).set(userInfo)
        await firebase.auth().signInWithEmailAndPassword(email, password)
        await clientUserRegisteredSuccess(dispatch, user)
        NavigationService.navigate(successRouteName, {})
        registerClientLoadingOff(dispatch)

    } catch (err) {
        console.log(err)
        await dispatch({ type: ADMIN_USER_REGISTERED_FAILED, payload: err })
        registerClientLoadingOff(dispatch)
    }
}


const registerClientLoadingOn = (dispatch) => {
    dispatch({
        type: REGISTER_CLIENT_LOADING_ON,
        payload: true
    })
}

const registerClientLoadingOff = (dispatch) => {
    dispatch({
        type: REGISTER_CLIENT_LOADING_OFF,
        payload: false
    })
}

const clientUserRegisteredSuccess = (dispatch, user) => {
    dispatch({
        type: CLIENT_USER_REGISTERED_SUCCESS,
        payload: user
    })
}

const clearForm = (dispatch) => {
    dispatch({
        type: CLEAR_FORM,
    })
}