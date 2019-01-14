import React, { Component } from 'react';
import { AsyncStorage } from 'react-native'
import firebase from 'firebase'
import { connect } from 'react-redux';
import { Spinner } from '../components/Spinner'
import { handleExistingUser, setToken } from '../actions'

class RedirectingScreen extends Component {

    async componentDidMount() {
        try{
            const token = await AsyncStorage.getItem('reserve_ai_token')
            if(token){
                this.props.setToken(token)
                this.props.handleExistingUser(token)
            } else {
                this.props.handleExistingUser(null)
            }
        }catch(err){
            alert(err)
            this.props.navigation.navigate('auth')
            return
        }
    }

    render() {
        return <Spinner fontSize={11} text='PROCESSANDO...' />
    }
}

const mapStateToProps = ({ auth }) => {
    const { currentUser, userLoaded, token } = auth
    return { currentUser, userLoaded, token }
}

export default connect(mapStateToProps, { handleExistingUser, setToken })(RedirectingScreen)