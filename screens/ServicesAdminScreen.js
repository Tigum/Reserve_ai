import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { getAdminUserInfo, loadRegisteredServices } from '../actions'
import ServicesListAdmin from '../components/ServicesListAdmin'
import { HEADER_BACKGROUND_COLOR, HEADER_TEXT_COLOR, HEADER_TEXT_FONT_WEIGHT } from '../app_styles'

class ServicesAdminScreen extends Component {

    componentWillMount() {
        this.props.loadRegisteredServices()
    }

    static navigationOptions = ({ navigation }) => {
        const { navigate } = navigation
        return {
            headerTitle: 'Serviços Cadastrados',
            headerRight: (
                <TouchableWithoutFeedback onPress={() => navigate('addService')}>
                    <View style={{ paddingRight: 10 }}>
                        <AntDesign name="plus" size={25} color="white" />
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
                <ServicesListAdmin
                    data={this.props.registeredServices}
                />
            </View>
        )
    }
}

const mapStateToProps = ({ mainAdmin, servicesAdmin }) => {
    const { user } = mainAdmin
    const { registeredServices } = servicesAdmin
    return { user, registeredServices }
}

export default connect(mapStateToProps, { getAdminUserInfo, loadRegisteredServices })(ServicesAdminScreen);