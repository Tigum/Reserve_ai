import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { getAdminUserInfo, loadRegisteredServices, setServiceModeExport, clearServiceFormExport, startAddService } from '../actions'
import ServicesListAdmin from '../components/ServicesListAdmin'
import { HEADER_BACKGROUND_COLOR, HEADER_TEXT_COLOR, HEADER_TEXT_FONT_WEIGHT } from '../app_styles'
import { Spinner } from '../components/Spinner'
import Header from '../components/Header'

class ServicesAdminScreen extends Component {

    componentDidMount() {
        this.props.navigation.setParams({ props: this.props })
    }

    componentWillMount() {
        this.props.loadRegisteredServices()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.mode !== nextProps.mode) {
            this.props.navigation.setParams({ props: nextProps })
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { navigate } = navigation
        return {
            headerTitle: 'Serviços Cadastrados',
            headerRight: (
                <TouchableWithoutFeedback onPress={() => {
                    navigation.state.params.props.clearServiceFormExport()
                    navigation.state.params.props.setServiceModeExport('add')
                    navigate('addService')
                }}>
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

    addService() {
        this.props.startAddService()
        this.props.navigation.navigate('addService')
    }

    render() {
        if (this.props.loading) {
            return  <Spinner text='CARREGANDO SERVIÇOS...'/>
        }

        return (
            <View>
                <Header icon='plus' headerText='Meus serviços' iconAction={this.addService.bind(this)} goBack/>
                <ServicesListAdmin
                    data={this.props.registeredServices}
                />
            </View>
        )
    }
}

const mapStateToProps = ({ mainAdmin, servicesAdmin }) => {
    const { user } = mainAdmin
    const { registeredServices, loading } = servicesAdmin
    return { user, registeredServices, loading }
}

export default connect(mapStateToProps, { getAdminUserInfo, loadRegisteredServices, setServiceModeExport, clearServiceFormExport, startAddService })(ServicesAdminScreen);