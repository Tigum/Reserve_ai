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
    CLEAR_EMPLOYEE_FORM,
    NEW_EMPLOYEE_ID_CHANGED,
    EMPLOYEE_ADDED_TO_SELECTION,
    EMPLOYEE_REMOVED_FROM_SELECTION,
    SELECTED_EMPLOYEE_ID,
    SET_EMPLOYEEID_TO_NULL,
    NEW_SERVICE_ADDED_SUCCESS,
    LOAD_REGISTERED_SERVICES,
    FIND_EMPLOYEES_NAMES_BY_ID,
    CLEAR_SERVICE_FORM,
    START_EDIT_SERVICE,
    EDIT_SERVICE,
    SERVICE_LOADING,
    SET_SERVICE_MODE,
    RESET_APPLICATION_TO_INITIAL_STATE,
    START_ADD_SERVICE,
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
    loading: false,
    employeesSelected: [],
    registeredServices: [],
    employeesByJob: [],
    mode: ''
}

export default (state = INITIAL_STATE, action) => {
    // console.log(action)
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
        case SERVICE_LOADING:
            return { ...state, loading: action.payload }
        case NEW_EMPLOYEE_ADDED:
            return { ...state, employees: [...this, action.payload] }
        case CLEAR_EMPLOYEE_FORM:
            return { ...state, employeeName: '', employeePhoto: '', employeeId: '' }
        case NEW_EMPLOYEE_ID_CHANGED:
            return { ...state, employeeId: action.payload }
        case EMPLOYEE_ADDED_TO_SELECTION:
            return { ...state, employeesSelected: [...state.employeesSelected, action.payload] }
        case EMPLOYEE_REMOVED_FROM_SELECTION:
            let employees = state.employeesSelected
            let newArray = []
            employees.map((item) => {
                if (item !== action.payload) {
                    newArray.push(item)
                }
            })
            return { ...state, employeesSelected: newArray }
        case SELECTED_EMPLOYEE_ID:
            return { ...state, employeeId: action.payload }
        case SET_EMPLOYEEID_TO_NULL:
            return { ...state, employeeId: action.payload }
        case NEW_SERVICE_ADDED_SUCCESS:
            return { ...state }
        case LOAD_REGISTERED_SERVICES:
            return { ...state, registeredServices: action.payload }
        case FIND_EMPLOYEES_NAMES_BY_ID:
            return { ...state, employeesByJob: action.payload }
        case CLEAR_SERVICE_FORM:
            return {
                ...state,
                serviceName: '',
                serviceDescription: '',
                servicePrice: '',
                serviceDuration: '',
                employees: [],
                employeesSelected: []
            }
        case START_EDIT_SERVICE:
            return {
                ...state,
                employeesSelected: action.payload.employeesSelected,
                serviceDescription: action.payload.serviceDescription,
                serviceDuration: action.payload.serviceDuration,
                serviceId: action.payload.serviceId,
                serviceName: action.payload.serviceName,
                servicePrice: action.payload.servicePrice,
                mode: 'edit'
            }
        case START_ADD_SERVICE:
            return {
                ...state,
                employeesSelected: '',
                serviceDescription: '',
                serviceDuration: '',
                serviceId: '',
                serviceName: '',
                servicePrice: '',
                mode: 'add'
            }
        case SET_SERVICE_MODE:
            return { ...state, mode: action.payload }
        case RESET_APPLICATION_TO_INITIAL_STATE:
            return { ...state, ...INITIAL_STATE }
        default:
            return state;
    }
}