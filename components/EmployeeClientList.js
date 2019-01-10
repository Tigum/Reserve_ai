import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import EmployeeClientListItem from './EmployeeClientListItem'
import EmptyListWarning from './EmptyListWarning'

class EmployeeClientList extends Component {

    renderList() {
        const { data } = this.props
        if (data) {
            return (
                data.map((item) => (
                    <EmployeeClientListItem
                        key={item}
                        employeeId={item}
                    />
                ))
            )
        } else {
            return (
                <EmptyListWarning
                    text='NÃO HÁ FUNCIONÁRIOS REGISTRADOS'
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

export default EmployeeClientList;