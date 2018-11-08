import {
    NAME_ADMIN_REGISTER_CHANGED,
    EMAIL_ADMIN_REGISTER_CHANGED,
    COMPANY_NAME_ADMIN_REGISTER_CHANGED,
    PASSWORD_ADMIN_REGISTER_CHANGED,
    PASSWORD_CONFIRMATION_ADMIN_REGISTER_CHANGED,
    ADMIN_USER_REGISTERED_SUCCESS,
    ADMIN_USER_REGISTERED_FAILED
} from '../actions/types'

const INITIAL_STATE = {
    name: '',
    email: '',
    companyName: '',
    password: '',
    passwordConfirmation: '',
    user: null,
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    console.log(action)
    switch (action.type) {
        case NAME_ADMIN_REGISTER_CHANGED:
            return { ...state, name: action.payload };
        case EMAIL_ADMIN_REGISTER_CHANGED:
            return { ...state, email: action.payload };
        case COMPANY_NAME_ADMIN_REGISTER_CHANGED:
            return { ...state, companyName: action.payload };
        case PASSWORD_ADMIN_REGISTER_CHANGED:
            return { ...state, password: action.payload };
        case PASSWORD_CONFIRMATION_ADMIN_REGISTER_CHANGED:
            return { ...state, passwordConfirmation: action.payload };
        case ADMIN_USER_REGISTERED_SUCCESS:
            return { ...state, user: action.payload };
        case ADMIN_USER_REGISTERED_FAILED:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}