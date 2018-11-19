import {
    NEW_SERVICE_NAME_CHANGED,
    NEW_SERVICE_DESCRIPTION_CHANGED,
    NEW_SERVICE_PRICE_CHANGED,
    NEW_SERVICE_DURATION_TIME_CHANGED,
    SHOW_CURRENT_EMPLOYEES
} from '../actions/types'

const INITIAL_STATE = {
    serviceName: '',
    serviceDescription: '',
    servicePrice: '',
    serviceDuration: '',
    employees : []
}

export default (state = INITIAL_STATE, action) => {
    console.log(action)
    switch (action.type) {
        case NEW_SERVICE_NAME_CHANGED:
            return { ...state, serviceName: action.payload };
        case NEW_SERVICE_DESCRIPTION_CHANGED:
            return { ...state, serviceDescription: action.payload };
        case NEW_SERVICE_PRICE_CHANGED:
            return { ...state, servicePrice: action.payload };
        case NEW_SERVICE_DURATION_TIME_CHANGED:
            return { ...state, serviceDuration: action.payload };
        case SHOW_CURRENT_EMPLOYEES:
            return { ...state, employees: action.payload}
        default:
            return state;
    }
}