import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer'
import RegisterAdminReducer from './RegisterAdminReducer'
import RegisterClientReducer from './RegisterClientReducer'

export default combineReducers({
    auth: AuthReducer,
    registerAdmin: RegisterAdminReducer,
    registerClient: RegisterClientReducer
})