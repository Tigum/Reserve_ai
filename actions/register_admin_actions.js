import firebase from 'firebase';
import { RNS3 } from 'react-native-aws3';
import NavigationService from './NavigationServices';
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
    UNSELECT_SUNDAY,
    SET_SATURDAY_HOUR_START,
    SET_SATURDAY_HOUR_END,
    SET_SUNDAY_HOUR_START,
    SET_SUNDAY_HOUR_END,
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

export const registerAdminUser = (
    {
        name,
        email,
        companyName,
        phone,
        password,
        passwordConfirmation,
        startHour,
        endHour,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        saturdayHourStartSelected,
        saturdayHourEndSelected,
        sundayHourStartSelected,
        sundayHourEndSelected
    }
) => async (dispatch) => {
    console.log('entrou')
    let userInfo = {
        name,
        email,
        companyName,
        phone,
        password,
        passwordConfirmation,
        startHour,
        endHour,
        seenWelcomePage: false,
        role: 'admin',
        imageUrl: '',
    }

    const days = [
        {
            day: {
                selected: monday,
                day: 'monday',
                startHour,
                endHour
            }
        },
        {
            day: {
                selected: tuesday,
                day: 'tuesday',
                startHour,
                endHour
            }
        },
        {
            day: {
                selected: wednesday,
                day: 'wednesday',
                startHour,
                endHour
            }
        },
        {
            day: {
                selected: thursday,
                day: 'thursday',
                startHour,
                endHour
            }
        },
        {
            day: {
                selected: friday,
                day: 'friday',
                startHour,
                endHour
            }
        },
        {
            day: {
                selected: saturday,
                day: 'saturday',
                startHour: saturdayHourStartSelected,
                endHour: saturdayHourEndSelected
            }
        },
        {
            day: {
                selected: sunday,
                day: 'sunday',
                startHour: sundayHourStartSelected,
                endHour: sundayHourEndSelected
            }
        }
    ]

    await days.map((element) => {
        if (element.day.selected) {
            const dayName = element.day.day
            const dayInfo = {
                day: dayName,
                start: element.day.startHour,
                end: element.day.endHour
            }
            userInfo[dayName] = dayInfo
        }
    })

    console.log('userInfo', userInfo)
    try {
        registerAdminLoadingOn(dispatch)
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const { currentUser } = await firebase.auth()
        const user = currentUser
        await currentUser.updateProfile({ displayName: name })
        await firebase.database().ref(`/users/${currentUser.uid}`).set(userInfo)
        await firebase.auth().signInWithEmailAndPassword(email, password)
        await adminUserRegisteredSuccess(dispatch, user)
        // clearForm(dispatch)
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

export const saturdayHourStart = (hour) => {
    return {
        type: SET_SATURDAY_HOUR_START,
        payload: hour
    }
}

export const saturdayHourEnd = (hour) => {
    return {
        type: SET_SATURDAY_HOUR_END,
        payload: hour
    }
}

export const sundayHourStart = (hour) => {
    return {
        type: SET_SUNDAY_HOUR_START,
        payload: hour
    }
}

export const sundayHourEnd = (hour) => {
    return {
        type: SET_SUNDAY_HOUR_END,
        payload: hour
    }
}

export const uploadPhoto = ({ uri, S3Options, uid, successRouteName }) => async (dispatch) => {
    registerAdminLoadingOn(dispatch)
    let post = {}
    post["id"] = firebase.database.ServerValue.TIMESTAMP
    const options = S3Options
    const ext = uri.substr(uri.lastIndexOf('.') + 1);
    const name = Math.round(+new Date() / 1000);
    const file = {
        name: name + "." + ext,
        type: "image/" + ext,
        uri
    }

    RNS3.put(file, options).then(response => {
        if (response.status === 201) {
            post["photo"] = response.body.postResponse.location
            firebase.database().ref(`users/${uid}`).update({ imageUrl: post.photo })
                .then(() => {
                    NavigationService.navigate(successRouteName, {});
                    registerAdminLoadingOff(dispatch)
                })
                .catch((err) => {
                    console.log('imageError', err)
                    alert('Erro ao carregar a foto. Tente novamente.')
                    registerAdminLoadingOff(dispatch)
                })
        }
    }).catch((err) => {
        console.log('imageError', err)
        alert('Erro ao carregar a foto. Tente novamente.')
        registerAdminLoadingOff(dispatch)
    });
}

export const checkIfEmailExists = ({ email, errorMessage, errorRouteName, successRouteName }) => async (dispatch) => {
    registerAdminLoadingOn(dispatch)
    const result = await firebase.auth().fetchSignInMethodsForEmail(email)
    if (result.length > 0) {
        clearForm(dispatch)
        registerAdminLoadingOff(dispatch)
        alert(errorMessage)
        return NavigationService.navigate(errorRouteName, {})
    }
    NavigationService.navigate(successRouteName, {})
    registerAdminLoadingOff(dispatch)
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

