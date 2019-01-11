import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { iOSUIKit } from 'react-native-typography';

class ScheduleListItem extends Component{
    render() {
        const { schedule } = this.props
        return (
            <View style={styles.mainView}>
                <Text style={iOSUIKit.title3Emphasized}>
                    {schedule}
                </Text>
            </View>
        )
    }
}

const styles = {
    mainView: {
        padding: 20,
        borderBottomStyle: 'solid',
        borderBottomWidth: 0.5,
        borderColor: '#e8e8e8',
        alignItems: 'center'
    }
}

export default ScheduleListItem