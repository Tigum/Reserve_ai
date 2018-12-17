import {
    LOAD_AVAILABLE_SERVICES,
    LOADING_CLIENT_SERVICES_ON,
    LOADING_CLIENT_SERVICES_OFF
} from '../actions/types'

const INITIAL_STATE = {
    city: '',
    services: [],
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    console.log(action)
    switch (action.type) {
        case LOADING_CLIENT_SERVICES_ON:
            return { ...state, loading: action.payload };
        case LOADING_CLIENT_SERVICES_OFF:
            return { ...state, loading: action.payload };
        case LOAD_AVAILABLE_SERVICES:
            return { ...state, services: action.payload };
        default:
            return state;
    }
}