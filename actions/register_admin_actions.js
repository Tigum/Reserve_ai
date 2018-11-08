import firebase from 'firebase';
import { AsyncStorage } from 'react-native'
import {
    NAME_ADMIN_REGISTER_CHANGED,
    EMAIL_ADMIN_REGISTER_CHANGED,
    COMPANY_NAME_ADMIN_REGISTER_CHANGED,
    PASSWORD_ADMIN_REGISTER_CHANGED,
    PASSWORD_CONFIRMATION_ADMIN_REGISTER_CHANGED,
    ADMIN_USER_REGISTERED_SUCCESS,
    ADMIN_USER_REGISTERED_FAILED
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

export const registerAdminUser = ({ name, email, companyName, password, passwordConfirmation }) => async (dispatch) => {
    if (!name) return dispatch({ type: ADMIN_USER_REGISTERED_FAILED, payload: 'Nome não informado' })
    if (!email) return dispatch({ type: ADMIN_USER_REGISTERED_FAILED, payload: 'E-mail não informado' })
    if (!companyName) return dispatch({ type: ADMIN_USER_REGISTERED_FAILED, payload: 'Nome do empreendimento não informado' })
    if (!password || !passwordConfirmation) return dispatch({ type: ADMIN_USER_REGISTERED_FAILED, payload: 'Senha ou confirmação de senha não informado' })
    if (password !== passwordConfirmation) return dispatch({ type: ADMIN_USER_REGISTERED_FAILED, payload: 'Confirmação de senha incorreta' })

    await firebase.auth().createUserWithEmailAndPassword(email, password)

    const { currentUser } = await firebase.auth()

    try {
        await firebase.database().ref(`/users/${currentUser.uid}`)
            .on('value', async snapshot => {

                if (snapshot.val()) {
                    await firebase.database().ref(`/users/${currentUser.uid}`).set({ name, email, companyName })
                    const user = snapshot.val()
                    adminUserRegisteredSuccess(dispatch, user)
                }

            })
    } catch{
        console.log('error')
    }

};

const adminUserRegisteredSuccess = ({ dispatch, user }) => {
    dispatch({
        type: ADMIN_USER_REGISTERED_SUCCESS,
        payload: user
    })
}

