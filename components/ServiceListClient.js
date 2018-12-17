import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ServiceItemClient from './ServiceItemClient';
import EmptyListWarning from './EmptyListWarning'

class ServicesListClient extends Component {

    renderList() {
        const { data } = this.props
        if (data.length > 0) {
            return (
                data.map((item) => (
                    <ServiceItemClient
                        key={item.serviceId}
                        service={item}
                    />
                ))
            )
        } else {
            return (
                <EmptyListWarning
                    text='NÃO ENCONTRAMOS SERVIÇOS DISPONÍVEIS :('
                    icon='book'
                    iconSize={30}
                    textSize={12}
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

export default ServicesListClient;