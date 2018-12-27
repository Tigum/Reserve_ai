import firebase from 'firebase';
import _ from 'lodash';
import {
    LOAD_AVAILABLE_SERVICES,
    LOADING_CLIENT_SERVICES_ON,
    LOADING_CLIENT_SERVICES_OFF,
    LOAD_AVAILABLE_BUSINESSES,
    ADD_BUSINESS_TO_MAIN_LIST,
    AUTO_FOCUS_SEARCH,
    SEARCH_TEXT,
    CLEAR_SEARCH_TEXT,
    SEARCH_RESULT_CITIES,
    SEARCH_RESULT_NAMES
} from './types';

export const loadAvailableBusinesses = () => async (dispatch) => {

    try {
        loadingOn(dispatch)
        const usersRef = await firebase.database().ref().child('users')

        if (usersRef) {
            try {
                await usersRef.orderByChild('role').equalTo('admin').on('value', snapshot => {
                    addBusinessToMainList(dispatch, _.values(snapshot.val()))
                    loadingOff(dispatch)
                })
            } catch (err) {
                alert(err)
                return
            }
        }
    } catch (err) {
        alert(err)
        return
    }

}

export const loadAvailableServices = (input) => async (dispatch) => {

    try {
        loadingOn(dispatch)
        await firebase.database().ref(`/services`).on('value', snapshot => {
            const servicesJson = snapshot.val()
            const list = _.values(servicesJson)
            const services = []
            list.map((item) => {
                const service = _.values(item)
                service.map((element) => {
                    services.push(element)
                })
            })
            loadServices(dispatch, services)
            loadingOff(dispatch)
        })
    } catch (err) {
        alert(err)
        return
    }
}

const loadingOn = (dispatch) => {
    dispatch({
        type: LOADING_CLIENT_SERVICES_ON,
        payload: true
    })
}

const loadingOff = (dispatch) => {
    dispatch({
        type: LOADING_CLIENT_SERVICES_OFF,
        payload: false
    })
}

const loadServices = (dispatch, services) => {
    dispatch({
        type: LOAD_AVAILABLE_SERVICES,
        payload: services
    })
}

const loadBusinesses = (dispatch, businesses) => {
    dispatch({
        type: LOAD_AVAILABLE_BUSINESSES,
        payload: services
    })
}

const addBusinessToMainList = (dispatch, business) => {
    dispatch({
        type: ADD_BUSINESS_TO_MAIN_LIST,
        payload: business
    })
}

export const autoFocus = (input) => {
    return ({
        type: AUTO_FOCUS_SEARCH,
        payload: input
    })
}

export const searchTextOutput = (text) => {
    return ({
        type: SEARCH_TEXT,
        payload: text
    })
}

export const searchTextOutputClear = () => {
    return ({
        type: CLEAR_SEARCH_TEXT,
        payload: ''
    })
}

export const loadSearchResults = (text) => async (dispatch) => {
    let textUpperCase = text.toString().toUpperCase()
    let textLowerCase = text.toString().toLowerCase()

    console.log('textUpperCase', textUpperCase)
    console.log('textLowerCase', textLowerCase)

    if(text.length < 1) {
        dispatch({
            type: SEARCH_RESULT_CITIES,
            payload: []
        })
        dispatch({
            type: SEARCH_RESULT_NAMES,
            payload: []
        })
        return
    }

    try {
        await firebase.database().ref(`/users`).orderByChild('city').startAt(textUpperCase).endAt(textLowerCase +"\uf8ff").on('value', async snapshot => {
            dispatch({
                type: SEARCH_RESULT_CITIES,
                payload: _.values(snapshot.val())
            })
        })
    } catch (err) {
        alert(err)
        return
    }



    // try{
    //     await firebase.database().ref(`/users`).orderByChild('companyName').startAt(textUpperCase).endAt(textLowerCase+"\uf8ff").on('value', snapshot => {
    //         dispatch({
    //             type: SEARCH_RESULT_NAMES,
    //             payload: _.values(snapshot.val())
    //         })
    //     })
    // }catch(err){
    //     alert(err)
    //     return
    // }
}