import {
    LOAD_AVAILABLE_SERVICES,
    LOADING_CLIENT_SERVICES_ON,
    LOADING_CLIENT_SERVICES_OFF,
    LOAD_AVAILABLE_BUSINESSES,
    ADD_BUSINESS_TO_MAIN_LIST,
    CLEAR_MAIN_BUSINESS_LIST,
    RESET_APPLICATION_TO_INITIAL_STATE,
    LOAD_AVAILABLE_USER
} from '../actions/types'

const INITIAL_STATE = {
    city: '',
    services: [],
    loading: false,
    businesses: [],
    currentUser: {}
}

export default (state = INITIAL_STATE, action) => {
    console.log('TESTE2', action)
    switch (action.type) {
        case LOADING_CLIENT_SERVICES_ON:
            return { ...state, loading: action.payload };
        case LOADING_CLIENT_SERVICES_OFF:
            return { ...state, loading: action.payload };
        case LOAD_AVAILABLE_SERVICES:
            return { ...state, services: action.payload };
        case LOAD_AVAILABLE_BUSINESSES:
            return { ...state, businesses: action.payload };
        case ADD_BUSINESS_TO_MAIN_LIST:
            return { ...state, businesses: [...state.businesses, action.payload] }
        case LOAD_AVAILABLE_USER:
            return { ...state, currentUser: action.payload }
        case RESET_APPLICATION_TO_INITIAL_STATE:
            return { ...state, ...INITIAL_STATE, businesses: [] }
        default:
            return state;
    }
}