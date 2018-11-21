import React, { Component } from 'react';
import { View, Text } from 'react-native'
import ListItemSwipe from './ListItemSwipe';

class EmployeeList extends Component {

    renderList() {
        const { data, routeName } = this.props
        if (data) {
            return (
                data.map((item) => (<ListItemSwipe key={item.key} item={item} routeName={routeName} />))
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