import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import StoreServicesItem from './StoreServicesItem'
import EmptyListWarning from './EmptyListWarning'

class StoreServicesList extends Component {

    renderList() {
        const { data } = this.props
        if (data) {
            return (
                data.map((item) => (
                    <StoreServicesItem
                        key={item.serviceId}
                        service={item}
                    />
                ))
            )
        } else {
            return (
                <EmptyListWarning
                    text='NÃO HÁ SERVIÇOS REGISTRADOS'
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

export default StoreServicesList;