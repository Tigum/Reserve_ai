import firebase from 'firebase';
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
    REGISTER_ADMIN_LOADING_OFF,
    CLEAR_FORM,
    CONTINUE_ADMIN_REGISTRATION,
    COMPANY_HOURS_START,
    COMPANY_HOURS_END,
    SELECT_MONDAY,
    SELECT_TUESDAY,
    SELECT_WEDNESDAY,
    SELECT_THURSDAY,
    SELECT_FRIDAY,
    SELECT_SATURDAY,
    SELECT_SUNDAY,
    UNSELECT_MONDAY,
    UNSELECT_TUESDAY,
    UNSELECT_WEDNESDAY,
    UNSELECT_THURSDAY,
    UNSELECT_FRIDAY,
    UNSELECT_SATURDAY,
    UNSELECT_SUNDAY
} from './types';

export const mondaySelected = () => {
    return {
        type: SELECT_MONDAY,
    }
}

export const tuesdaySelected = () => {
    return {
        type: SELECT_TUESDAY,
    }
}

export const wednesdaySelected = () => {
    return {
        type: SELECT_WEDNESDAY,
    }
}

export const thursdaySelected = () => {
    return {
        type: SELECT_THURSDAY,
    }
}

export const fridaySelected = () => {
    return {
        type: SELECT_FRIDAY,
    }
}

export const saturdaySelected = () => {
    return {
        type: SELECT_SATURDAY,
    }
}

export const sundaySelected = () => {
    return {
        type: SELECT_SUNDAY,
    }
}

export const mondayUnselected = () => {
    return {
        type: UNSELECT_MONDAY,
    }
}

export const tuesdayUnselected = () => {
    return {
        type: UNSELECT_TUESDAY,
    }
}

export const wednesdayUnselected = () => {
    return {
        type: UNSELECT_WEDNESDAY,
    }
}

export const thursdayUnselected = () => {
    return {
        type: UNSELECT_THURSDAY,
    }
}

export const fridayUnselected = () => {
    return {
        type: UNSELECT_FRIDAY,
    }
}

export const saturdayUnselected = () => {
    return {
        type: UNSELECT_SATURDAY,
    }
}

export const sundayUnselected = () => {
    return {
        type: UNSELECT_SUNDAY,
    }
}

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
        await firebase.database().ref(`/users/${currentUser.uid}`).set({ name, email, companyName, phone, seenWelcomePage: false, role: 'admin' })
        const user = currentUser
        console.log('user', user)
        await adminUserRegisteredSuccess(dispatch, user)
        clearForm(dispatch)
        registerAdminLoadingOff(dispatch)

    } catch (err) {
        registerAdminLoadingOn(dispatch)
        console.log(err)
        await dispatch({ type: ADMIN_USER_REGISTERED_FAILED, payload: err })
        registerAdminLoadingOff(dispatch)
    }

};

export const continueRegisterAdmin = (userInfo) => {
    return {
        type: CONTINUE_ADMIN_REGISTRATION,
        payload: userInfo
    }
}

export const hoursCompanyStart = (hour) => {
    return {
        type: COMPANY_HOURS_START,
        payload: hour
    }
}

export const hoursCompanyEnd = (hour) => {
    return {
        type: COMPANY_HOURS_END,
        payload: hour
    }
}

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

const clearForm = (dispatch) => {
    dispatch({
        type: CLEAR_FORM,
    })
}