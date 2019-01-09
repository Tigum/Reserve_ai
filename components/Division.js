import React from 'react';
import { View, Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Division = () => {
    return (
        <View style={styles.mainView}>
            <Divider style={styles.divider}/>
        </View>
    )
}

const styles= {
    mainView: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: SCREEN_WIDTH,
        marginTop: 30,
        marginBottom: 30
    },
    divider: {
        width: SCREEN_WIDTH*0.94,
    }
}

export { Division }