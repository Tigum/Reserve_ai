import {
    NEW_SERVICE_NAME_CHANGED,
    NEW_SERVICE_DESCRIPTION_CHANGED,
    NEW_SERVICE_PRICE_CHANGED,
    NEW_SERVICE_DURATION_TIME_CHANGED,
    SHOW_CURRENT_EMPLOYEES,
    NEW_EMPLOYEE_NAME_CHANGED,
    NEW_EMPLOYEE_PHOTO_CHANGED,
    NEW_EMPLOYEE_LOADING_ON,
    NEW_EMPLOYEE_LOADING_OFF,
    NEW_EMPLOYEE_ADDED,
    CLEAR_EMPLOYEE_FORM
} from '../actions/types'

const INITIAL_STATE = {
    serviceName: '',
    serviceDescription: '',
    servicePrice: '',
    serviceDuration: '',
    employees: [],
    employeeName: '',
    employeePhoto: '',
    employeeId: '',
    loading: false
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
            return { ...state, employees: action.payload }
        case NEW_EMPLOYEE_NAME_CHANGED:
            return { ...state, employeeName: action.payload }
        case NEW_EMPLOYEE_PHOTO_CHANGED:
            return { ...state, employeePhoto: action.payload }
        case NEW_EMPLOYEE_LOADING_ON:
            return { ...state, loading: action.payload }
        case NEW_EMPLOYEE_LOADING_OFF:
            return { ...state, loading: action.payload }
        case NEW_EMPLOYEE_ADDED:
            return { ...state, employees: [ ...this, action.payload] }
        case CLEAR_EMPLOYEE_FORM:
            return { ...state, employeeName: '', employeePhoto: '', employeeId: ''}
        default:
            return state;
    }
}