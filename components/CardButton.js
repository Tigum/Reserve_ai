import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { sanFranciscoWeights } from 'react-native-typography';

class CardButton extends Component {
    render() {
        const { text, backgroundColor, fontSize, onAction, color } = this.props
        return (
            <TouchableWithoutFeedback onPress={onAction}>
                <View style={[styles.cardButtonView, { backgroundColor }]}>
                    <Text style={[sanFranciscoWeights.thin, { fontSize, color }]}>{text || 'Texto não informado'}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    cardButtonView: {
        flexDirection: 'row',
        flex: 1,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
}

export default CardButton