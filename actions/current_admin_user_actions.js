import firebase from 'firebase';
import NavigationService from './NavigationServices';
import {
    LOAD_ADMIN_USER_INFO
} from './types';


export const getAdminUserInfo = () => {
    return async (dispatch) => {
        const { currentUser } = await firebase.auth()
        firebase.database().ref(`/users/${currentUser.uid}`)
            .on('value', async snapshot => {
                const user = await snapshot.val()
                user['uid'] = currentUser.uid
                try {
                    await loginAdminUserInfoSuccess(dispatch, user)
                } catch (err) {
                    alert(err)
                }
            })
    }
}

const loginAdminUserInfoSuccess = (dispatch, user) => {
    dispatch({
        type: LOAD_ADMIN_USER_INFO,
        payload: user
    })
}