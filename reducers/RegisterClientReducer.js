import {
    NAME_CLIENT_REGISTER_CHANGED,
    EMAIL_CLIENT_REGISTER_CHANGED,
    PHONE_CLIENT_REGISTER_CHANGED,
    PASSWORD_CLIENT_REGISTER_CHANGED,
    PASSWORD_CONFIRMATION_CLIENT_REGISTER_CHANGED,
    CLIENT_USER_REGISTERED_SUCCESS,
    CLEAR_FORM,
    REGISTER_CLIENT_LOADING_ON,
    REGISTER_ADMIN_LOADING_OFF
} from '../actions/types'

const INITIAL_STATE = {
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
    user: null,
    loading: false,
    imageUrl: ''
}

export default (state = INITIAL_STATE, action) => {
    console.log(action)
    switch (action.type) {
        case NAME_CLIENT_REGISTER_CHANGED:
            return { ...state, name: action.payload };
        case EMAIL_CLIENT_REGISTER_CHANGED:
            return { ...state, email: action.payload };
        case PHONE_CLIENT_REGISTER_CHANGED:
            return { ...state, phone: action.payload };
        case PASSWORD_CLIENT_REGISTER_CHANGED:
            return { ...state, password: action.payload };
        case PASSWORD_CONFIRMATION_CLIENT_REGISTER_CHANGED:
            return { ...state, passwordConfirmation: action.payload };
        case CLIENT_USER_REGISTERED_SUCCESS:
            return { ...state, user: action.payload };
        case REGISTER_CLIENT_LOADING_ON:
            return { ...state, loading: action.payload };
        case REGISTER_ADMIN_LOADING_OFF:
            return { ...state, loading: action.payload };
        case CLEAR_FORM:
            return { ...state, ...INITIAL_STATE };
        default:
            return state;
    }
}