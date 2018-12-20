import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    FACEBOOK_LOGIN_FAIL,
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGOUT_SUCCESS,
    AUTH_LOADING_ON,
    AUTH_LOADING_OFF,
    LOAD_LOGGEDIN_USER,
    EMAIL_PASSWORD_INPUT_FOCUS,
    USER_LOG_OUT_SUCCESS,
    RESET_APPLICATION_TO_INITIAL_STATE,
    REDIRECT_EXISTING_USER,
    REGISTERING_ON,
    REGISTERING_OFF,
    ADMIN_USER_REGISTERED_SUCCESS,
    LOAD_REDIRECTED_USER,
    USER_LOADED_TRUE,
    USER_LOADED_FALSE
} from '../actions/types'

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false,
    token: '',
    userName: '',
    routeName: '',
    emailAndPasswordFocus: false,
    registering: false,
    currentUser: null,
    userLoaded: false
};

export default (state = INITIAL_STATE, action) => {
    // console.log('teste', action)
    switch (action.type) {
        case EMAIL_CHANGED:
            // console.log('EMAIL_CHANGED')
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            // console.log('PASSWORD_CHANGED')
            return { ...state, password: action.payload };
        case LOGIN_USER:
            // console.log('LOGIN_USER')
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            // console.log('LOGIN_USER_SUCCESS')
            return { ...state, ...INITIAL_STATE, currentUser: action.payload };
        case LOGIN_USER_FAIL:
            // console.log('LOGIN_USER_FAIL')
            return { ...state, error: 'Login ou senha incorretos', loading: false };
        case USER_LOG_OUT_SUCCESS:
            // console.log('USER_LOG_OUT_SUCCESS')
            return { ...state, routeName: action.payload };
        case FACEBOOK_LOGIN_SUCCESS:
            // console.log('FACEBOOK_LOGIN_SUCCESS')
            return {
                ...state, loading: false, error: '',
                // token: action.payload.token,
                // userName: action.payload.userName,
                // routeName: action.payload.routeName,
                currentUser: action.payload.user
            };
        case FACEBOOK_LOGIN_FAIL:
            // console.log('FACEBOOK_LOGIN_FAIL')
            return { ...state, error: 'Não foi possível acessar o Facebook. Tente novamente', loading: false, token: action.payload };
        case FACEBOOK_LOGOUT_SUCCESS:
            // console.log('FACEBOOK_LOGOUT_SUCCESS')
            return { ...state, ...INITIAL_STATE, routeName: action.payload };
        case AUTH_LOADING_ON:
            // console.log('AUTH_LOADING_ON')
            return { ...state, loading: action.payload };
        case AUTH_LOADING_OFF:
            // console.log('AUTH_LOADING_OFF')
            return { ...state, loading: action.payload };
        case LOAD_LOGGEDIN_USER:
            // console.log('LOAD_LOGGEDIN_USER')
            return { ...state, currentUser: action.payload };
        case ADMIN_USER_REGISTERED_SUCCESS:
            // console.log('ADMIN_USER_REGISTERED_SUCCESS')
            return { ...state, currentUser: action.payload };
        case EMAIL_PASSWORD_INPUT_FOCUS:
            // console.log('EMAIL_PASSWORD_INPUT_FOCUS')
            return { ...state, emailAndPasswordFocus: action.payload };
        case REDIRECT_EXISTING_USER:
            // console.log('REDIRECT_EXISTING_USER')
            return { ...state, routeName: action.payload };
        case REGISTERING_ON:
            // console.log('REGISTERING_ON')
            return { ...state, registering: action.payload };
        case REGISTERING_OFF:
            // console.log('REGISTERING_OFF')
            return { ...state, registering: action.payload };
        case LOAD_REDIRECTED_USER:
            // console.log('LOAD_REDIRECTED_USER')
            return { ...state, currentUser: action.payload };
        case USER_LOADED_TRUE:
            // console.log('USER_LOADED_TRUE')
            return { ...state, userLoaded: action.payload };
        case USER_LOADED_FALSE:
            // console.log('USER_LOADED_FALSE')
            return { ...state, userLoaded: action.payload };
        case RESET_APPLICATION_TO_INITIAL_STATE:
            // console.log('RESET_APPLICATION_TO_INITIAL_STATE_AUTH')
            return { ...state, ...INITIAL_STATE }
        default:
            return state;
    }
}