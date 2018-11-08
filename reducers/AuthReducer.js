import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    FACEBOOK_LOGIN_FAIL,
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGOUT_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false,
    token: '',
    userName: '',
    routeName: ''
};

export default (state = INITIAL_STATE, action) => {
    console.log(action)
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Login ou senha incorretos', loading: false };
        case FACEBOOK_LOGIN_SUCCESS:
            return {
                ...state, loading: false, error: '',
                token: action.payload.token,
                userName: action.payload.userName,
                routeName: action.payload.routeName,
                user: action.payload.user
            };
        case FACEBOOK_LOGIN_FAIL:
            return { ...state, error: 'Não foi possível acessar o Facebook. Tente novamente', loading: false, token: action.payload};
        case FACEBOOK_LOGOUT_SUCCESS:
            return { ...state, ...INITIAL_STATE, routeName: action.payload };
        default:
            return state;
    }
}