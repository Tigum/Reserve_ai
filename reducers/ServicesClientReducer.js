import {
    LOAD_AVAILABLE_SERVICES,
    LOADING_CLIENT_SERVICES_ON,
    LOADING_CLIENT_SERVICES_OFF,
    LOAD_AVAILABLE_BUSINESSES,
    ADD_BUSINESS_TO_MAIN_LIST,
    CLEAR_MAIN_BUSINESS_LIST,
    RESET_APPLICATION_TO_INITIAL_STATE,
    LOAD_AVAILABLE_USER,
    AUTO_FOCUS_SEARCH,
    SEARCH_TEXT,
    CLEAR_SEARCH_TEXT,
    SEARCH_RESULT_CITIES,
    SEARCH_RESULT_NAMES
} from '../actions/types'

const INITIAL_STATE = {
    city: '',
    services: [],
    loading: false,
    businesses: [],
    currentUser: {},
    autoFocusSearch: false,
    searchText: '',
    searchResultCities: [],
    searchResultNames: []
}

export default (state = INITIAL_STATE, action) => {
    // console.log('TESTE2', action)
    switch (action.type) {
        case LOADING_CLIENT_SERVICES_ON:
            // console.log('LOADING_CLIENT_SERVICES_ON')
            return { ...state, loading: action.payload };
        case LOADING_CLIENT_SERVICES_OFF:
            // console.log('LOADING_CLIENT_SERVICES_OFF')
            return { ...state, loading: action.payload };
        case LOAD_AVAILABLE_SERVICES:
            // console.log('LOAD_AVAILABLE_SERVICES')
            return { ...state, services: action.payload };
        case LOAD_AVAILABLE_BUSINESSES:
            // console.log('LOAD_AVAILABLE_BUSINESSES')
            return { ...state, businesses: action.payload };
        case ADD_BUSINESS_TO_MAIN_LIST:
            // console.log('ADD_BUSINESS_TO_MAIN_LIST')
            return { ...state, businesses: action.payload }
        case LOAD_AVAILABLE_USER:
            // console.log('LOAD_AVAILABLE_USER')
            return { ...state, currentUser: action.payload }
        case AUTO_FOCUS_SEARCH:
            // console.log('AUTO_FOCUS_SEARCH')
            return { ...state, autoFocusSearch: action.payload }
        case SEARCH_TEXT:
            // console.log('SEARCH_TEXT')
            return { ...state, searchText: action.payload }
        case CLEAR_SEARCH_TEXT:
            // console.log('SEARCH_TEXT')
            return { ...state, searchText: action.payload }
        case SEARCH_RESULT_CITIES:
            // console.log('SEARCH_RESULT')
            return { ...state, searchResultCities: action.payload }
        case SEARCH_RESULT_NAMES:
            // console.log('SEARCH_RESULT_NAMES')
            return { ...state, searchResultNames: action.payload }
        case RESET_APPLICATION_TO_INITIAL_STATE:
            // console.log('RESET_APPLICATION_TO_INITIAL_STATE_SERVICE_CLIENT')
            return { ...state, ...INITIAL_STATE, businesses: [] }
        default:
            return state;
    }
}