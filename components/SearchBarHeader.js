import React, { Component } from 'react';
import { View, Dimensions, TouchableWithoutFeedback, Text } from 'react-native';
import { sanFranciscoWeights } from 'react-native-typography';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const SCREEN_WIDTH = Dimensions.get('window').width

class Header extends Component {

    render() {
        const { iconAction, icon } = this.props
        return (
            <View style={styles.viewStyle}>
                <TouchableWithoutFeedback onPress={() => iconAction || this.props.navigation.goBack()}>
                    <AntDesign style={styles.closeIconStyle} name={icon} size={25} color="black" />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => iconAction || this.props.navigation.goBack()}>
                    <Text style={[styles.textStyle, sanFranciscoWeights.thin]}>Encontre serviços...</Text>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}


const styles = {
    viewStyle: {
        backgroundColor: '#f8f8f8',
        justifyContent: 'flex-start',
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
    },
    textStyle: {
        fontSize: 25,
        color: 'black'
    },
    closeIconStyle: {
        paddingTop: 3,
        paddingRight: 15
    }
}

export default withNavigation(Header);
