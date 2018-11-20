import firebase from 'firebase';
import _ from 'lodash';
import { RNS3 } from 'react-native-aws3';
import NavigationService from './NavigationServices';
import {
    ADD_NEW_SERVICE,
    NEW_SERVICE_NAME_CHANGED,
    NEW_SERVICE_DESCRIPTION_CHANGED,
    NEW_SERVICE_PRICE_CHANGED,
    NEW_SERVICE_DURATION_TIME_CHANGED,
    SHOW_CURRENT_EMPLOYEES,
    NEW_EMPLOYEE_NAME_CHANGED,
    NEW_EMPLOYEE_PHOTO_CHANGED,
    NEW_EMPLOYEE_LOADING_ON,
    NEW_EMPLOYEE_LOADING_OFF,
    NEW_EMPLOYEE_ADDED
} from './types';

export const serviceNameChanged = (text) => {
    return {
        type: NEW_SERVICE_NAME_CHANGED,
        payload: text
    }
}

export const serviceDescriptionChanged = (text) => {
    return {
        type: NEW_SERVICE_DESCRIPTION_CHANGED,
        payload: text
    }
}

export const servicePriceChanged = (text) => {
    return {
        type: NEW_SERVICE_PRICE_CHANGED,
        payload: text
    }
}

export const serviceDurationChanged = (text) => {
    return {
        type: NEW_SERVICE_DURATION_TIME_CHANGED,
        payload: text
    }
}

export const employeeNameChanged = (text) => {
    return {
        type: NEW_EMPLOYEE_NAME_CHANGED,
        payload: text
    }
}

const employeePhotoChanged = (dispatch, text) => {
    dispatch({
        type: NEW_EMPLOYEE_PHOTO_CHANGED,
        payload: text
    })
}

export const showCurrentEmployees = () => async (dispatch) => {
    const { currentUser } = await firebase.auth()

    firebase.database().ref(`/users/${currentUser.uid}`)
        .on('value', async snapshot => {
            const hasEmployees = await snapshot.hasChild('employees')
            const user = await snapshot.val()
            if(hasEmployees){
                
                const employees = user.employees
                console.log('employees', employees)

                let data = _.values(employees)
                

                const myself = {
                    key: currentUser.uid,
                    imageUrl: user.imageUrl,
                    name: user.name,
                    role: 'Você (Proprietário)'
                }
                data.unshift(myself)

                console.log('data', data)

                sendCurrentEmployess(dispatch, data)
            } else {
                let data = []
                
                const myself = {
                    key: currentUser.uid,
                    imageUrl: user.imageUrl,
                    name: user.name,
                    role: 'Você (Proprietário)'
                }
                data.unshift(myself)

                console.log('data', data)

                sendCurrentEmployess(dispatch, data)
            }


        })
}


export const uploadEmployeePhotoToS3 = ({ uri, S3Options, uid }) => async (dispatch) => {
    addEmployeeLoadingOn(dispatch)
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
            const text = post.photo
            employeePhotoChanged(dispatch, text)
            addEmployeeLoadingOff(dispatch)
        }
    }).catch((err) => {
        console.log('imageError', err)
        alert('Erro ao carregar a foto. Tente novamente.')
        addEmployeeLoadingOff(dispatch)
    });
}

export const addNewEmployee = ({ uid, employee }) => async (dispatch) => {
    console.log('uid', uid)
    console.log('employee', employee)
    try {
        await firebase.database().ref(`/users/${uid}/employees`).push(employee)
        employeeAdded(dispatch, employee)
    } catch(err) {
        console.log(err)
    }
}

const employeeAdded = (dispatch, employee) => {
    dispatch({
        type: NEW_EMPLOYEE_ADDED,
        payload: employee
    })
}

const sendCurrentEmployess = (dispatch, data) => {
    dispatch({
        type: SHOW_CURRENT_EMPLOYEES,
        payload: data
    })
}

const addEmployeeLoadingOn = (dispatch) => {
    dispatch({
        type: NEW_EMPLOYEE_LOADING_ON,
        payload: true
    })
}

const addEmployeeLoadingOff = (dispatch) => {
    dispatch({
        type: NEW_EMPLOYEE_LOADING_OFF,
        payload: false
    })
}