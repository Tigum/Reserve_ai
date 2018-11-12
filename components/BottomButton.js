import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation';
import { sanFranciscoWeights } from 'react-native-typography';

const SCREEN_WIDTH = Dimensions.get('window').width

class BottomButton extends Component {
    render() {
        const { buttonText, buttonAction } = this.props
        return (
            <TouchableWithoutFeedback onPress={buttonAction || {}}>
                <View style={styles.buttonView}>
                    <Text style={[sanFranciscoWeights.thin, styles.addButtonStyle]}>{buttonText}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    buttonView: {
        width: SCREEN_WIDTH,
        backgroundColor: '#78b572',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonStyle: {
        fontSize: 25,
        color: 'white'
    }
}

export default BottomButton;