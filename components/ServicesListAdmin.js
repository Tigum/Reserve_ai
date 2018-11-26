import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import ServiceItemAdmin from './ServiceItemAdmin'

class ServicesListAdmin extends Component {

    renderList() {
        const { data } = this.props
        if (data) {
            return (
                data.map((item) => (
                    <ServiceItemAdmin
                        key={item.serviceId}
                        service={item}
                    />
                ))
            )
        } else {
            return (
                <View>
                    <Text>
                        Não há serviços disponiveis
                    </Text>
                </View>
            )
        }
    }

    render() {
        return (
            <ScrollView>
                {this.renderList()}
            </ScrollView>
        )
    }
}

export default ServicesListAdmin;