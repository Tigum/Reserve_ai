import React, { Component } from 'react';
import { View, Text, Dimensions, Image } from 'react-native';
import { sanFranciscoWeights } from 'react-native-typography';

const SCREEN_HEIGHT = Dimensions.get('window').height

class EmptyListWarning extends Component {
    render() {
        const { text } = this.props
        return (
            <View style={styles.noServicesView}>
                <View style={styles.innerView}>
                <Image
                    style={styles.image}
                    source={require('../img/logo.png')}
                />
                <Text style={[sanFranciscoWeights.thin, styles.text]}>
                    Não há serviços disponiveis
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = {
    noServicesView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        height: SCREEN_HEIGHT - 113,
    },
    image: {
        width: 45,
        height: 45
    },
    innerView: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    text: {
        color: '#b7b7b7'
    }
}

export default EmptyListWarning;