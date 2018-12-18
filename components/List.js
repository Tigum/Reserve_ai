import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import ItemList from './ItemList';
import EmptyListWarning from './EmptyListWarning'

class List extends Component {

    renderList() {
        const { data } = this.props
        if (data.length > 0) {
            return (
                data.map((item) => (
                    <ItemList
                        key={item}
                        item={item}
                    />
                    // <Text>item</Text>
                ))
            )
        } else {
            return (
                <EmptyListWarning
                    text='NÃO HÁ ÁREAS CADASTRADAS :('
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

export default List;