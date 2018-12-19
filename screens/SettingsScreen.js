import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { userLogOut, registeringOff } from '../actions'
import Header from '../components/Header'

class SettingsScreen extends Component {

    userLogOut() {
        this.props.registeringOff()
        this.props.userLogOut()
    }

    render() {
        return (
            <View>
                <Header icon='logout' headerText='Configurações' iconAction={this.userLogOut.bind(this)} />
                <Text>Settings</Text>
            </View>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const { routeName } = auth
    return { routeName }
}

export default connect(mapStateToProps, { userLogOut, registeringOff })(SettingsScreen);