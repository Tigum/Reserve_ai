import React from 'react';
import { View, ActivityIndicator, Dimensions, Text } from 'react-native';
import { sanFranciscoWeights } from 'react-native-typography';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Spinner = ({ size, text }) => {
    return (
        <View style={styles.spinnerStyle}>
            <ActivityIndicator size={size || 'large'}/>
            <Text style={[sanFranciscoWeights.thin, styles.loadingTextStyle]}>{text || 'Processando...'}</Text>
        </View>    
    );
};

const styles = {
    spinnerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    loadingTextStyle: {
        color: '#8c8c8c',
        fontSize: 13,
        paddingTop: 10
    }
}
export { Spinner };