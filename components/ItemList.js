import React, { Component } from 'react';
import { View } from 'react-native';

class ItemList extends Component {
    render() {
        const { children } = this.props
        return (
            <View style={styles.mainView}>
                {children}
            </View>
        )
    }
}

const styles = {
    mainView: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'white', 
        padding: 15
    },
}

export default ItemList