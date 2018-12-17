import {
    LOAD_AVAILABLE_SERVICES
} from '../actions/types'

const INITIAL_STATE = {
    city: '',
    services: []
}

export default (state = INITIAL_STATE, action) => {
    console.log(action)
    switch (action.type) {
        case LOAD_AVAILABLE_SERVICES:
            return { ...state, services: action.payload };
        default:
            return state;
    }
}