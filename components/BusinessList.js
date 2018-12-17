import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import BusinessItem from './BusinessItem';
import EmptyListWarning from './EmptyListWarning'

class BusinessList extends Component {

    renderList() {
        const { data } = this.props
        if (data.length > 0) {
            return (
                data.map((item) => (
                    <BusinessItem
                        key={item.uid}
                        business={item}
                    />
                ))
            )
        } else {
            return (
                <EmptyListWarning
                    text='NÃO HÁ SERVIÇOS DISPONÍVEIS :('
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

export default BusinessList;