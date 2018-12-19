import React, { Component } from 'react';
import firebase from 'firebase'
import { connect } from 'react-redux';
import { Spinner } from '../components/Spinner'
import { loadLoggedInUser, loadAvailableBusinesses } from '../actions'

class RedirectingScreen extends Component {

    componentDidMount() {
        if(!this.props.registering){
            this.loadExistingUser()
        }
    }

    async loadExistingUser() {
        if(!this.props.currentUser){
            firebase.auth().onAuthStateChanged(async user => {
                if (user) {
                    await firebase.database().ref(`/users/${user.uid}`).on('value', async snapshot => {
                        const userData = snapshot.val()
                        this.props.loadLoggedInUser()
                        if (userData.role === 'admin') {
                            return this.props.navigation.navigate('mainAdminScreen')
                        }
                        if (userData.role === 'client') {
                            this.props.loadAvailableBusinesses()
                            return this.props.navigation.navigate('mainClientScreen')
                        }
                    })
                } else {
                    this.props.navigation.navigate('auth')
                }
            })
        }
        
    }

    render() {
        return <Spinner fontSize={11} text='PROCESSANDO...' />
    }
}

const mapStateToProps = ({ auth }) => {
    const { registering, currentUser } = auth
    return { registering, currentUser }
}

export default connect(mapStateToProps, { loadLoggedInUser, loadAvailableBusinesses })(RedirectingScreen)