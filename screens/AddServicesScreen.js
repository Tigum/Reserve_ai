import React, { Component } from 'react';
import { Text, View } from 'react-native';
import DefaultModal from '../components/DefaultModal'

class AddServicesScreen extends Component {
    render() {
        console.log('entrou')
        return (
                <DefaultModal
                    title='Adicionar serviço'
                    buttonText='Adicionar'
                    dismissIcon='close'
                >
                    <Text style={{ fontSize: 30 }}>This is a modal!</Text>
                </DefaultModal>
        )
    }
}

export default AddServicesScreen;