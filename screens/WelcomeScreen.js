import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Slides from '../components/Slides'

const SLIDE_DATA = [
    { text: 'Bem vindo ao Reserve Aí', color: '#03A9F4' },
    { text: 'Organize sua agenda de trabalho', color: '#009688' },
    { text: 'Organize suas finanças', color: '#03A9F4' }
]

class WelcomeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { navigate } = navigation
        
        return {
            tabBarVisible: true
        }

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.routeName !== nextProps.routeName){
            this.props.navigation.navigate(nextProps.routeName)
        }
    }

    render() {
        return (
            <Slides
                data={SLIDE_DATA}
            />
        )
    }
}

export default WelcomeScreen;