import firebase from 'firebase';
import { Alert } from 'react-native'
import _ from 'lodash';
import {
    LOAD_AVAILABLE_SERVICES,
    LOADING_CLIENT_SERVICES_ON,
    LOADING_CLIENT_SERVICES_OFF,
    LOAD_AVAILABLE_BUSINESSES,
    ADD_BUSINESS_TO_MAIN_LIST
} from './types';
import NavigationServices from './NavigationServices';

export const loadAvailableBusinesses = () => async (dispatch) => {
    loadingOn(dispatch)
    const usersRef = await firebase.database().ref().child('users')
    await usersRef.orderByChild('role').equalTo('admin').on('child_added', async snapshot => {
        const business = await snapshot.val()
        business['uid'] = await snapshot.key
        addBusinessToMainList(dispatch, business)
    })
    loadingOff(dispatch)
}

export const loadAvailableServices = (input) => async (dispatch) => {
    const { currentUser } = await firebase.auth()
    loadingOn(dispatch)
    firebase.database().ref(`/services`)
        .on('value', async snapshot => {
            const servicesJson = await snapshot.val()
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