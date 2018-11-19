import {
    LOAD_ADMIN_USER_INFO
} from '../actions/types'

const INITIAL_STATE = {
    user: null,
    uid: ''
}

export default (state = INITIAL_STATE, action) => {
    // console.log(action)
    switch (action.type) {
        case LOAD_ADMIN_USER_INFO:
            return { ...state, user: action.payload};
        default:
            return state;
    }
}