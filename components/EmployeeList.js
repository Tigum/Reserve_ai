import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements';

class EmployeeList extends Component {

    renderList() {
        const { data } = this.props
        
        if (data) {
            return (
                data.map((item) => (
                    <ListItem
                        key={item.key}
                        avatar={item.imageUrl ? {uri: item.imageUrl} : require('../img/default-avatar.png')}
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