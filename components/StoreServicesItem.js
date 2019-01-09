import React, { Component } from 'react';
import { View, Text } from 'react-native';

class StoreServicesItem extends Component {
    render() {
        const { serviceName } = this.props.service
        return(
            <View>
                <Text>
                    {serviceName}
                </Text>
            </View>
        )
    }
}

export default StoreServicesItem;