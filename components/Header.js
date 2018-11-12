import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { sanFranciscoWeights } from 'react-native-typography';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const SCREEN_WIDTH = Dimensions.get('window').width


class Header extends Component {

    render() {
        return (
            <View style={styles.viewStyle}>
                <Text style={[styles.textStyle, sanFranciscoWeights.thin]}>{this.props.headerText}</Text>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                    <AntDesign style={styles.closeIconStyle} name={this.props.icon} size={20} color="grey" />
                </TouchableWithoutFeedback>
            </View>
        )
    }
}


const styles = {
    viewStyle: {
        backgroundColor: '#f8f8f8',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: 80,
        paddingTop: 35,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
        width: SCREEN_WIDTH,
        paddingLeft: 15,
        flexDirection: 'row',
        // flex: 1
    },
    textStyle: {
        fontSize: 25
    },
    closeIconStyle: {
        paddingTop: 8,
        paddingRight: 15
    }
};

export default withNavigation(Header);
