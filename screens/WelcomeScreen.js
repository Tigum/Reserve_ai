import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';

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

    render() {
        return (
            <Slides
                data={SLIDE_DATA}
                
            />
        )
    }
}

export default withNavigation(WelcomeScreen);