import React, { Component } from 'react';
import firebase from 'firebase'
import { connect } from 'react-redux';
import { Spinner } from '../components/Spinner'
import { loadLoggedInUser } from '../actions'

class RedirectingScreen extends Component {

    componentDidMount() {
        if(!this.props.registering){
            this.loadExistingUser()
        }
    }

    loadExistingUser() {
        firebase.auth().onAuthStateChanged(async user => {
            if (user) {
                firebase.database().ref(`/users/${user.uid}`).on('value', async snapshot => {
                    const userData = snapshot.val()
                    this.props.loadLoggedInUser()
                    if (userData.role === 'admin') return this.props.navigation.navigate('mainAdminScreen')
                    if (userData.role === 'client') return this.props.navigation.navigate('mainClientScreen')
                })
            } else {
                this.props.navigation.navigate('auth')
            }
        })
    }

    render() {
        return <Spinner fontSize={11} text='PROCESSANDO...' />
    }
}

const mapStateToProps = ({ auth }) => {
    const { registering } = auth
    return { registering }
}

export default connect(mapStateToProps, { loadLoggedInUser })(RedirectingScreen)