import React, { Component } from 'react';
import firebase from 'firebase'
import { connect } from 'react-redux';
import { Spinner } from '../components/Spinner'
import { loadLoggedInUser, loadAvailableBusinesses, handleExistingUser } from '../actions'

class RedirectingScreen extends Component {

    componentDidMount() {
        this.loadExistingUser()
    }
    
    async loadExistingUser() {
        if (!this.props.currentUser) {

            try {
                await firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        this.props.handleExistingUser(user)
                        this.props.loadAvailableBusinesses()
                    } else {
                        this.props.navigation.navigate('auth')
                    }
                })

            } catch (err) {
                alert(err)
                return
            }

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

export default connect(mapStateToProps, { loadLoggedInUser, loadAvailableBusinesses, handleExistingUser })(RedirectingScreen)