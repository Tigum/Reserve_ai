import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { sanFranciscoWeights } from 'react-native-typography';

class BottomButton extends Component {
    render() {
        const {
            buttonText,
            buttonAction,
            buttonBackgroundColor,
            buttonBorderColor,
            buttonHeight,
            buttonBorderStyle,
            buttonTextColor,
            buttonFontSize,
            buttonMarginTop
        } = this.props
        const height = buttonHeight || 60
        const borderColor = buttonBorderColor || ''
        const backgroundColor = buttonBackgroundColor || '#7f7f7f'
        const borderStyle = buttonBorderStyle || 'none'
        const borderWidth = buttonBorderStyle ? 1 : 0
        const color = buttonTextColor || 'white'
        const fontSize = buttonFontSize || 20
        const marginTop = buttonMarginTop || 10
        return (
            <TouchableWithoutFeedback onPress={buttonAction}>
                <View style={[styles.buttonView, { backgroundColor }, { borderColor }, { height }, { borderStyle }, { borderWidth }, {marginTop}]}>
                    <Text
                        style={
                            [sanFranciscoWeights.thin,
                            styles.addButtonStyle,
                            { color },
                            { fontSize }]
                        }>
                        {buttonText}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    buttonView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        marginLeft: 20,
    },
    addButtonStyle: {
        fontSize: 20,
    }
}

export default BottomButton;