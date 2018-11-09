import firebase from 'firebase';
import { AsyncStorage } from 'react-native'
import {
    NAME_ADMIN_REGISTER_CHANGED,
    EMAIL_ADMIN_REGISTER_CHANGED,
    COMPANY_NAME_ADMIN_REGISTER_CHANGED,
    PASSWORD_ADMIN_REGISTER_CHANGED,
    PASSWORD_CONFIRMATION_ADMIN_REGISTER_CHANGED,
    ADMIN_USER_REGISTERED_SUCCESS,
    ADMIN_USER_REGISTERED_FAILED,
    PHONE_ADMIN_REGISTER_CHANGED,
    REGISTER_ADMIN_LOADING_ON,
    REGISTER_ADMIN_LOADING_OFF
} from './types';


export const nameAdminChanged = (text) => {
    return {
        type: NAME_ADMIN_REGISTER_CHANGED,
        payload: text
    }
}

export const emailAdminChanged = (text) => {
    return {
        type: EMAIL_ADMIN_REGISTER_CHANGED,
        payload: text
    }
}

export const companyNameAdminChanged = (text) => {
    return {
        type: COMPANY_NAME_ADMIN_REGISTER_CHANGED,
        payload: text
    }
}

export const passwordAdminChanged = (text) => {
    return {
        type: PASSWORD_ADMIN_REGISTER_CHANGED,
        payload: text
    }
}

export const passwordConfirmationAdminChanged = (text) => {
    return {
        type: PASSWORD_CONFIRMATION_ADMIN_REGISTER_CHANGED,
        payload: text
    }
}

export const phoneAdminChanged = (text) => {
    return {
        type: PHONE_ADMIN_REGISTER_CHANGED,
        payload: text
    }
}

export const registerAdminUser = ({ name, email, companyName, phone, password, passwordConfirmation }) => async (dispatch) => {
    if (!name) return dispatch({ type: ADMIN_USER_REGISTERED_FAILED, payload: 'Nome não informado' })
    if (!email) return dispatch({ type: ADMIN_USER_REGISTERED_FAILED, payload: 'E-mail não informado' })
    if (!companyName) return dispatch({ type: ADMIN_USER_REGISTERED_FAILED, payload: 'Nome do empreendimento não informado' })
    if (!phone) return dispatch({ type: ADMIN_USER_REGISTERED_FAILED, payload: 'Telefone não informado' })
    if (!password || !passwordConfirmation) return dispatch({ type: ADMIN_USER_REGISTERED_FAILED, payload: 'Senha ou confirmação de senha não informado' })
    if (password !== passwordConfirmation) return dispatch({ type: ADMIN_USER_REGISTERED_FAILED, payload: 'Confirmação de senha incorreta' })

    try {
        registerAdminLoadingOn(dispatch)
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const { currentUser } = await firebase.auth()
        await currentUser.updateProfile({ displayName: name })
        await firebase.database().ref(`/users/${currentUser.uid}`).set({ name, email, companyName, phone })
        const user = currentUser
        console.log('user', user)
        await adminUserRegisteredSuccess(dispatch, user)
        registerAdminLoadingOff(dispatch)

    } catch (err) {
        registerAdminLoadingOn(dispatch)
        console.log(err)
        await dispatch({ type: ADMIN_USER_REGISTERED_FAILED, payload: err })
        registerAdminLoadingOff(dispatch)
    }

};

const adminUserRegisteredSuccess = (dispatch, user) => {
    dispatch({
        type: ADMIN_USER_REGISTERED_SUCCESS,
        payload: user
    })
}

const registerAdminLoadingOn = (dispatch) => {
    dispatch({
        type: REGISTER_ADMIN_LOADING_ON,
        payload: true
    })
}

const registerAdminLoadingOff = (dispatch) => {
    dispatch({
        type: REGISTER_ADMIN_LOADING_OFF,
        payload: false
    })
}


