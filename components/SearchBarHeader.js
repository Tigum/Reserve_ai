import React, { Component } from 'react';
import { View, Dimensions, TouchableWithoutFeedback, Text } from 'react-native';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements'
import { sanFranciscoWeights } from 'react-native-typography';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { renderAvatar } from '../actions'

const SCREEN_WIDTH = Dimensions.get('window').width

class Header extends Component {

    componentWillMount() {
        this.props.renderAvatar()
    }

    render() {
        const { iconAction, icon, avatar } = this.props
        return (
            <View style={styles.viewStyle}>
                <TouchableWithoutFeedback onPress={() => iconAction || this.props.navigation.goBack()}>
                    <AntDesign style={styles.closeIconStyle} name={icon} size={25} color="black" />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => iconAction || this.props.navigation.goBack()}>
                    <View style={styles.textView}>
                        <Text style={[styles.textStyle, sanFranciscoWeights.thin]}>Encontre serviços...</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.avatarView}>
                <Avatar
                    size="small"
                    rounded
                    source={ avatar ? { uri: avatar } : require('../img/loading.gif')}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                    
                />
                </View>
                
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
        color: 'black',
        // flex: 'flex-start'
    },
    textView: {
        flex: 1,
        alignItems: 'flex-start'
    },
    closeIconStyle: {
        paddingTop: 3,
        paddingRight: 15
    },
    avatarView: {
        paddingRight: 10
    }
}

const mapStateToProps = ({ auth }) => {
    const { avatar } = auth
    return { avatar }
}

export default connect(mapStateToProps, { renderAvatar })(withNavigation(Header));
