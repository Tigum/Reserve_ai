import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { sanFranciscoWeights } from 'react-native-typography';

class BottomButton extends Component {
    render() {
        const { buttonText, buttonAction } = this.props
        console.log('buttonAction', buttonAction)
        return (
            <TouchableWithoutFeedback onPress={buttonAction}>
                <View style={styles.buttonView}>
                    <Text style={[sanFranciscoWeights.thin, styles.addButtonStyle]}>{buttonText}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    buttonView: {
        backgroundColor: '#5f5f5f',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        marginLeft: 20,
        marginTop: 10
    },
    addButtonStyle: {
        fontSize: 20,
        color: 'white'
    }
}

export default BottomButton;