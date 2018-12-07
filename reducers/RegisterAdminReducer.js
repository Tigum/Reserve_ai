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
    UNSELECT_SUNDAY,
    SET_SATURDAY_HOUR_START,
    SET_SATURDAY_HOUR_END,
    SET_SUNDAY_HOUR_START,
    SET_SUNDAY_HOUR_END,
    LOAD_STATES,
    LOAD_CITIES,
    STATE_ADMIN_REGISTER_CHANGED,
    CITY_ADMIN_REGISTER_CHANGED,
    CLEAR_CITY,
    STREET_NAME_ADMIN_REGISTER_CHANGED,
    NUMBER_ADMIN_REGISTER_CHANGED,
    CEP_ADMIN_REGISTER_CHANGED,
    SERVICE_AT_HOME_ADMIN_REGISTER_CHANGED,
    ADDITIONAL_INFO_ADMIN_REGISTER_CHANGED
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
    sunday: false,
    image: '',
    saturdayHourStartSelected: '',
    saturdayHourEndSelected: '',
    sundayHourStartSelected: '',
    sundayHourEndSelected: '',
    role: 'admin',
    serviceAtHome: false,
    streetName: '',
    number: '',
    state: '',
    cep: '',
    city: '',
    states: [],
    cities: [],
    additionalInfo: ''
};

export default (state = INITIAL_STATE, action) => {
    // console.log(action)
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
        case SET_SATURDAY_HOUR_START:
            return { ...state, saturdayHourStartSelected: action.payload }
        case SET_SATURDAY_HOUR_END:
            return { ...state, saturdayHourEndSelected: action.payload }
        case SET_SUNDAY_HOUR_START:
            return { ...state, sundayHourStartSelected: action.payload }
        case SET_SUNDAY_HOUR_END:
            return { ...state, sundayHourEndSelected: action.payload }
        case LOAD_STATES:
            return { ...state, states: action.payload }
        case STATE_ADMIN_REGISTER_CHANGED:
            return { ...state, state: action.payload }
        case LOAD_CITIES:
            return { ...state, cities: action.payload }
        case CITY_ADMIN_REGISTER_CHANGED:
            return { ...state, city: action.payload }
        case CLEAR_CITY:
            return { ...state, city: '' }
        case STREET_NAME_ADMIN_REGISTER_CHANGED:
            return { ...state, streetName: action.payload }
        case NUMBER_ADMIN_REGISTER_CHANGED:
            return { ...state, number: action.payload }
        case CEP_ADMIN_REGISTER_CHANGED:
            return { ...state, cep: action.payload }
        case SERVICE_AT_HOME_ADMIN_REGISTER_CHANGED:
            return { ...state, serviceAtHome: action.payload }
        case ADDITIONAL_INFO_ADMIN_REGISTER_CHANGED:
            return { ...state, additionalInfo: action.payload }
        default:
            return state;
    }
}