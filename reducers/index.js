import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer'
import RegisterAdminReducer from './RegisterAdminReducer'
import RegisterClientReducer from './RegisterClientReducer'
import CurrentAdminUserReducer from './CurrentAdminUserReducer'

export default combineReducers({
    auth: AuthReducer,
    registerAdmin: RegisterAdminReducer,
    registerClient: RegisterClientReducer,
    mainAdmin: CurrentAdminUserReducer
})