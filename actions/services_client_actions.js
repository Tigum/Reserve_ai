import firebase from 'firebase';
import { Alert } from 'react-native'
import _ from 'lodash';
import {
    LOAD_AVAILABLE_SERVICES
} from './types';
import NavigationServices from './NavigationServices';

export const loadAvailableServices = () => async (dispatch) => {
    const { currentUser } =  await firebase.auth()
    
}