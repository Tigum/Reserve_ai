import {
    LOAD_ADMIN_USER_INFO, RESET_APPLICATION_TO_INITIAL_STATE
} from '../actions/types'

const INITIAL_STATE = {
    user: null,
    uid: ''
}

export default (state = INITIAL_STATE, action) => {
    // console.log(action)
    switch (action.type) {
        case LOAD_ADMIN_USER_INFO:
            return { ...state, user: action.payload };
        case RESET_APPLICATION_TO_INITIAL_STATE:
            return { ...state, ...INITIAL_STATE }
        default:
            return state;
    }
}