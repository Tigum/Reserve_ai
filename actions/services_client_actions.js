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
    SEARCH_RESULT_NAMES,
    SELECT_STORE,
    LOADING_STORE,
    LOAD_STORE_SERVICES
} from './types';
import NavigationServices from './NavigationServices';

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
    const Services = firebase.database().ref(`/services`)
    try {
        loadingOn(dispatch)
        await Services.on('value', snapshot => {
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
    const Users = firebase.database().ref(`/users`)
    let textLowerCase = text.toString().toLowerCase()

    if (text.length < 1) {
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
        await Users.orderByChild('citySearch').startAt(textLowerCase).endAt(textLowerCase + "\uf8ff").on('value', snapshot => {
            dispatch({
                type: SEARCH_RESULT_CITIES,
                payload: _.values(snapshot.val())
            })
        })
    } catch (err) {
        alert(err)
        return
    }

    try {
        await Users.orderByChild('nameSearch').startAt(textLowerCase).endAt(textLowerCase + "\uf8ff").on('value', snapshot => {
            dispatch({
                type: SEARCH_RESULT_NAMES,
                payload: _.values(snapshot.val())
            })
        })
    } catch (err) {
        alert(err)
        return
    }
}

export const goToStoreScreen = (email) => async (dispatch) => {
    dispatch({
        type: LOADING_STORE,
        payload: true
    })
    const Users = firebase.database().ref('/users')
    try {
        await Users.orderByChild('email').equalTo(email).on('value', snapshot => {
            const info = _.values(snapshot.val())
            let infoObject = info[0]
            infoObject['storeId'] = Object.keys(snapshot.val())[0]
            dispatch({
                type: SELECT_STORE,
                payload: infoObject
            })
            NavigationServices.navigate('storeServicesScreen')
        })
    } catch (err) {
        dispatch({
            type: LOADING_STORE,
            payload: false
        })
        alert(err)
        return
    }
    dispatch({
        type: LOADING_STORE,
        payload: false
    })
}

export const loadSelecetedStoreServices = (storeId) => async (dispatch) => {
    const Services = firebase.database().ref('/services')
    try {
        await Services.orderByKey().equalTo(storeId).on('value', snapshot => {
            const info = _.values(snapshot.val())
            dispatch({
                type: LOAD_STORE_SERVICES,
                payload: _.values(info[0])
            })
        })
    } catch (err) {
        alert(err)
        return
    }
}