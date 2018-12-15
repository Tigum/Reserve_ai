import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { HEADER_BACKGROUND_COLOR, HEADER_TEXT_COLOR, HEADER_TEXT_FONT_WEIGHT } from '../app_styles'
import { userLogOut } from '../actions'

class SettingsScreen extends Component {

    componentDidMount() {
        this.props.navigation.setParams({ props: this.props })
    }

    static navigationOptions = ({ navigation }) => {
        const { navigate, state } = navigation
        return {
            headerTitle: 'Configurações',
            headerRight: (
                <TouchableWithoutFeedback onPress={() => state.params.props.userLogOut()}>
                    <View style={{ paddingRight: 10 }}>
                        <AntDesign name="logout" size={22} color="white" />
                    </View>
                </TouchableWithoutFeedback>
            ),
            headerStyle: {
                backgroundColor: HEADER_BACKGROUND_COLOR,
            },
            headerTintColor: HEADER_TEXT_COLOR,
            headerTitleStyle: {
                fontWeight: HEADER_TEXT_FONT_WEIGHT
            },
        }
    };

    render() {
        return (
            <View>
                <Text>Settings</Text>
            </View>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const { routeName } = auth
    return { routeName }
}

export default connect(mapStateToProps, { userLogOut })(SettingsScreen);