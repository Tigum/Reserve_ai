import firebase from 'firebase';
import {
    ADD_NEW_SERVICE,
    NEW_SERVICE_NAME_CHANGED
} from './types';

export const serviceNameChanged = (text) => {
    return {
        type: NEW_SERVICE_NAME_CHANGED,
        payload: text
    }
}