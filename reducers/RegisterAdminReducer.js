import {
    NAME_ADMIN_REGISTER_CHANGED,
    EMAIL_ADMIN_REGISTER_CHANGED,
    COMPANY_NAME_ADMIN_REGISTER_CHANGED,
    PASSWORD_ADMIN_REGISTER_CHANGED,
    PASSWORD_CONFIRMATION_ADMIN_REGISTER_CHANGED,
    ADMIN_USER_REGISTERED_SUCCESS,
    ADMIN_USER_REGISTERED_FAILED,
    PHONE_ADMIN_REGISTER_CHANGED,
    REGISTER_ADMIN_LOADING_ON,
    REGISTER_ADMIN_LOADING_OFF,
    CLEAR_FORM,
    CONTINUE_ADMIN_REGISTRATION
} from '../actions/types'

const INITIAL_STATE = {
    name: '',
    email: '',
    companyName: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
    user: null,
    error: '',
    loading: false
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
        case PHONE_ADMIN_REGISTER_CHANGED:
            return { ...state, phone: action.payload };
        case PASSWORD_ADMIN_REGISTER_CHANGED:
            return { ...state, password: action.payload };
        case PASSWORD_CONFIRMATION_ADMIN_REGISTER_CHANGED:
            return { ...state, passwordConfirmation: action.payload };
        case ADMIN_USER_REGISTERED_SUCCESS:
            return { ...state, user: action.payload };
        case ADMIN_USER_REGISTERED_FAILED:
            return { ...state, error: action.payload };
        case REGISTER_ADMIN_LOADING_ON:
            return { ...state, loading: action.payload };
        case REGISTER_ADMIN_LOADING_OFF:
            return { ...state, loading: action.payload };
        case CLEAR_FORM:
            return { ...state, ...INITIAL_STATE };
        case CONTINUE_ADMIN_REGISTRATION:
            return { ...state, 
                    name: action.payload.name, 
                    email: action.payload.email,
                    companyName: action.payload.companyName,
                    phone: action.payload.phone,
                    password: action.payload.password,
                    passwordConfirmation: action.payload.passwordConfirmation
                }
        default:
            return state;
    }
}