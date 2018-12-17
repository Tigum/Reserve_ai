import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer'
import RegisterAdminReducer from './RegisterAdminReducer'
import RegisterClientReducer from './RegisterClientReducer'
import CurrentAdminUserReducer from './CurrentAdminUserReducer'
import ServicesAdminReducer from './ServicesAdminReducer'
import ServicesClientReducer from './ServicesClientReducer'

export default combineReducers({
    auth: AuthReducer,
    registerAdmin: RegisterAdminReducer,
    registerClient: RegisterClientReducer,
    mainAdmin: CurrentAdminUserReducer,
    servicesAdmin: ServicesAdminReducer,
    servicesClient: ServicesClientReducer
})