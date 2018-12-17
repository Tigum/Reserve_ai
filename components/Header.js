import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { sanFranciscoWeights } from 'react-native-typography';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const SCREEN_WIDTH = Dimensions.get('window').width

class Header extends Component {

    goBack() {
        this.props.navigation.goBack()
    }

    render() {
        const { headerText, icon, iconAction, goBack } = this.props
        return (
            <View style={styles.viewStyle}>

                <TouchableWithoutFeedback onPress={this.goBack.bind(this)}>
                    <View style={{flexDirection: 'row'}}>
                        <AntDesign style={styles.closeIconStyle} name='arrowleft' size={25} color="black" />
                        <Text style={[styles.textStyle, sanFranciscoWeights.thin]}>{headerText}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={iconAction || this.goBack.bind(this)}>
                    <AntDesign style={styles.closeIconStyle} name={icon} size={25} color="black" />
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
    },
    textStyle: {
        fontSize: 25,
        color: 'black'
    },
    closeIconStyle: {
        paddingTop: 3,
        paddingRight: 15
    }
};

export default withNavigation(Header);
