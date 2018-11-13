import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation';
import { sanFranciscoWeights } from 'react-native-typography';
import { AntDesign } from '@expo/vector-icons';

class BottomButton extends Component {
    render() {
        const { buttonText, buttonAction } = this.props
        return (
            <TouchableWithoutFeedback onPress={buttonAction}>
                <View style={styles.buttonView}>
                    <AntDesign name="facebook-square" size={25} color="white" />
                    <Text style={[sanFranciscoWeights.thin, styles.addButtonStyle]}>{buttonText}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    buttonView: {
        backgroundColor: '#3577e6',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight: 20,
        marginLeft: 20,
        marginTop: 10
    },
    addButtonStyle: {
        fontSize: 20,
        color: 'white',
        paddingLeft: 15
    }
}

export default withNavigation(BottomButton);