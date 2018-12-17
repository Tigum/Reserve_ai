import firebase from 'firebase';
import { Alert } from 'react-native'
import Geocoder from 'react-native-geocoding';
import _ from 'lodash';
import {
    LOAD_AVAILABLE_SERVICES,
    LOADING_CLIENT_SERVICES_ON,
    LOADING_CLIENT_SERVICES_OFF
} from './types';
import NavigationServices from './NavigationServices';

export const loadAvailableServices = (input) => async (dispatch) => {
    const { currentUser } =  await firebase.auth()
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

            console.log('info', services)
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