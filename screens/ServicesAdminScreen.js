import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

class ServicesAdminScreen extends Component {
    
    static navigationOptions = ({ navigation }) => {
        
        const { navigate } = navigation

        return {
            headerTitle: 'Serviços Cadastrados',
            headerRight: (
                <TouchableWithoutFeedback onPress={() => navigate('addService')}>
                    <View style={{ paddingRight: 10 }}>
                        <AntDesign name="plus" size={25} color="#3577e6" />
                    </View>
                </TouchableWithoutFeedback>
            ),
        }

    };


    render() {
        console.log('services', this.props)
        return (
            <View>
                <Text>Services Screen</Text>
            </View>
        )
    }
}

export default ServicesAdminScreen;