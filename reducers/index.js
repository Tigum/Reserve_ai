import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer'
import RegisterAdminReducer from './RegisterAdminReducer'

export default combineReducers({
    auth: AuthReducer,
    registerAdmin: RegisterAdminReducer
})