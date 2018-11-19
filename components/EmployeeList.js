import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { ListItem } from 'react-native-elements';

class EmployeeList extends Component {

    renderList() {
        const { data } = this.props
        if (data) {
            return (
                data.map((item) => (
                    <ListItem
                        key={item.key}
                        leftAvatar={{ source: { uri: item.imageUrl ? item.imageUrl : '' } }}
                        title={item.name}
                        subtitle={item.role}
                    />
                ))
            )
        } else {
            return (
                <View>
                    <Text>
                        Não há funcionários disponiveis
                    </Text>
                </View>
            )
        }
    }


    render() {
        return this.renderList()
    }
}

export default EmployeeList;