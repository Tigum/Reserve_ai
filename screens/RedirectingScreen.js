import React, { Component } from 'react';
import firebase from 'firebase'
import { connect } from 'react-redux';
import { Spinner } from '../components/Spinner'
import { handleExistingUser } from '../actions'

class RedirectingScreen extends Component {

    componentDidMount() {
        this.loadExistingUser()
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.userLoaded) return

        if(this.props.currentUser !== nextProps.currentUser){
            const { role } = nextProps.currentUser
            if(role === 'admin'){
                this.props.navigation.navigate('mainAdminScreen')
            }

            if(role === 'client'){
                this.props.navigation.navigate('mainClientScreen')
            }

            if(!role){
                alert('Favor faça o cadastro novamente')
                this.props.navigation.navigate('auth')
            }
        }
    }

    
    async loadExistingUser() {
        if (!this.props.currentUser) {

            try {
                await firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        this.props.handleExistingUser(user)
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
    const { currentUser, userLoaded } = auth
    return { currentUser, userLoaded }
}

export default connect(mapStateToProps, { handleExistingUser })(RedirectingScreen)