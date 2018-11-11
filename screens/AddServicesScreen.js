import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements'
import { Header } from '../components/Header'

const SCREEN_WIDTH = Dimensions.get('window').width

class AddServicesScreen extends Component {
    render() {
        return (
            <View style={styles.mainView}>
                <Header style={styles.headerStyle} headerText='Adicionar serviço' />
                <Text style={{ fontSize: 30 }}>This is a modal!</Text>
                <View style={styles.buttonView}>
                    <Button
                        onPress={() => this.props.navigation.goBack()}
                        title="Dismiss"
                    />
                    <Button
                        onPress={() => this.props.navigation.goBack()}
                        title="Dismiss"
                    />
                </View>

            </View>
        )
    }
}

const styles = {
    mainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SCREEN_WIDTH,
        backgroundColor: '#d8edff'
    },
    headerStyle: {
        flex: 1
    },
    buttonView: {
        width: SCREEN_WIDTH,
        backgroundColor: 'red',
        height: 60

    }
}

export default AddServicesScreen;