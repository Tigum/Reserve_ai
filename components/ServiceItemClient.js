import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ServiceItemClient extends Component {
    render() {
        const { service } = this.props
        return (
            <View style={styles.mainView}>
                <View>
                    <Text>{service.serviceName}</Text>
                </View>
            </View>
        )
    }
}

const styles = {
    mainView: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'grey'
    }
}

export default ServiceItemClient