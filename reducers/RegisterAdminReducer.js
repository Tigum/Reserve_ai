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
    CONTINUE_ADMIN_REGISTRATION,
    COMPANY_HOURS_START,
    COMPANY_HOURS_END,
    SELECT_MONDAY,
    SELECT_TUESDAY,
    SELECT_WEDNESDAY,
    SELECT_THURSDAY,
    SELECT_FRIDAY,
    SELECT_SATURDAY,
    SELECT_SUNDAY,
    UNSELECT_MONDAY,
    UNSELECT_TUESDAY,
    UNSELECT_WEDNESDAY,
    UNSELECT_THURSDAY,
    UNSELECT_FRIDAY,
    UNSELECT_SATURDAY,
    UNSELECT_SUNDAY
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
    loading: false,
    startHour: '',
    endHour: '',
    monday: false,
    tueday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
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
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                companyName: action.payload.companyName,
                phone: action.payload.phone,
                password: action.payload.password,
                passwordConfirmation: action.payload.passwordConfirmation
            }
        case COMPANY_HOURS_START:
            return { ...state, startHour: action.payload }
        case COMPANY_HOURS_END:
            return { ...state, endHour: action.payload }
        case SELECT_MONDAY:
            return { ...state, monday: true }
        case SELECT_TUESDAY:
            return { ...state, tuesday: true }
        case SELECT_WEDNESDAY:
            return { ...state, wednesday: true }
        case SELECT_THURSDAY:
            return { ...state, thursday: true }
        case SELECT_FRIDAY:
            return { ...state, friday: true }
        case SELECT_SATURDAY:
            return { ...state, saturday: true }
        case SELECT_SUNDAY:
            return { ...state, sunday: true }
        case UNSELECT_MONDAY:
            return { ...state, monday: false }
        case UNSELECT_TUESDAY:
            return { ...state, tuesday: false }
        case UNSELECT_WEDNESDAY:
            return { ...state, wednesday: false }
        case UNSELECT_THURSDAY:
            return { ...state, thursday: false }
        case UNSELECT_FRIDAY:
            return { ...state, friday: false }
        case UNSELECT_SATURDAY:
            return { ...state, saturday: false }
        case UNSELECT_SUNDAY:
            return { ...state, sunday: false }
        default:
            return state;
    }
}