import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import ServiceItemAdmin from './ServiceItemAdmin';
import EmptyListWarning from './EmptyListWarning'

class ServicesListAdmin extends Component {

    renderList() {
        const { data } = this.props
        if (data.length > 0) {
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
                <EmptyListWarning
                    text='Não há serviços registrados'
                />
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