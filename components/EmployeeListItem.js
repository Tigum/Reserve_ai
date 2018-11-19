import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';

class EmployeeListItem extends Component {

    render() {
        const { key, imageUrl, name, role } = this.props;
        return (
            <ListItem
                key={key}
                leftAvatar={{ source: { uri: imageUrl } }}
                title={name}
                subtitle={role}
            />
        )
    }
}

export default EmployeeListItem;