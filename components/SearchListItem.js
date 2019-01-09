import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { sanFranciscoWeights } from 'react-native-typography';
import { EvilIcons } from '@expo/vector-icons';

class SearchListItem extends Component {
    renderIcon() {
        const { type } = this.props
        if (type === 'name') {
            return (
                <View style={styles.iconView}>
                    <EvilIcons style={styles.icon} name='user' size={35} color="grey" />
                </View>
            )
        }
        if (type === 'city') {
            return (
                <View style={styles.iconView}>
                    <EvilIcons style={styles.icon} name='location' size={35} color="grey" />
                </View>
            )
        }
    }

    render() {
        const { result } = this.props
        return (
            <View style={styles.mainView}>
                {this.renderIcon()}
                <Text style={[styles.result, sanFranciscoWeights.thin]}>
                    {result}
                </Text>
            </View>
        )
    }
}

const styles = {
    mainView: {
        backgroundColor: 'white',
        borderBottomStyle: 'solid',
        borderBottomWidth: 0.5,
        borderColor: '#e8e8e8',
        flexDirection: 'row',
    },
    result: {
        padding: 20,
        fontSize: 20,
        color: 'grey'
    },
    icon: {
        // paddingTop: 15
    },
    iconView: {
        marginTop: 15,
        marginRight: -10,
        marginLeft: 13
    }
}

export default SearchListItem