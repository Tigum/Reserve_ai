import firebase from 'firebase';
import _ from 'lodash'
import {
    ADD_NEW_SERVICE,
    NEW_SERVICE_NAME_CHANGED,
    NEW_SERVICE_DESCRIPTION_CHANGED,
    NEW_SERVICE_PRICE_CHANGED,
    NEW_SERVICE_DURATION_TIME_CHANGED,
    SHOW_CURRENT_EMPLOYEES
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

export const showCurrentEmployees = () => async (dispatch) => {
    const { currentUser } = await firebase.auth()

    firebase.database().ref(`/users/${currentUser.uid}`)
        .on('value', async snapshot => {
            const hasEmployees = await snapshot.hasChild('employees')
            const user = await snapshot.val()
            if(hasEmployees){
                
                const employees = hasEmployees.val()
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

const sendCurrentEmployess = (dispatch, data) => {
    dispatch({
        type: SHOW_CURRENT_EMPLOYEES,
        payload: data
    })
}