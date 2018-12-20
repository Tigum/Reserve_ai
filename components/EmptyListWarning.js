import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { sanFranciscoWeights } from 'react-native-typography';
import { AntDesign } from '@expo/vector-icons';

const SCREEN_HEIGHT = Dimensions.get('window').height

class EmptyListWarning extends Component {
    render() {
        const { text, textColor, textSize, icon, iconSize, iconColor, backgroundColor } = this.props
        return (
            <View style={[styles.noServicesView, {backgroundColor: backgroundColor || 'white'}]}>
                <View style={[styles.innerView, {backgroundColor: backgroundColor || 'white'}]}>
                <AntDesign name={icon} size={iconSize || 25} color={iconColor || '#b7b7b7'} />

                <Text style={[sanFranciscoWeights.thin, {color: textColor || '#b7b7b7', fontSize: textSize || 15}]}>
                    {text}
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
        alignItems: 'center',
    },
}

export default EmptyListWarning;