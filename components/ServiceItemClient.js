import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ServiceItemClient extends Component {
    render() {
        const { service } = this.props
        return (
            <View style={styles.mainView}>
                <Text>{service.serviceName}</Text>
            </View>
        )
    }
}

const styles = {
    mainView: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'white'
    }
}

export default ServiceItemClient