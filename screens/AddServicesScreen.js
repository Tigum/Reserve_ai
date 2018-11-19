import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FormLabel, FormInput } from 'react-native-elements'
import DefaultModal from '../components/DefaultModal'
import { connect } from 'react-redux';
import { getAdminUserInfo, serviceNameChanged, serviceDescriptionChanged, servicePriceChanged, serviceDurationChanged } from '../actions'
import { sanFranciscoWeights } from 'react-native-typography';

class AddServicesScreen extends Component {
    componentWillMount() {
        this.props.getAdminUserInfo()
    }

    onNameChanged(text) {
        this.props.serviceNameChanged(text)
    }

    onDescriptionChanged(text) {
        this.props.serviceDescriptionChanged(text)
    }

    onPriceChanged(text) {
        this.props.servicePriceChanged(text)
    }

    onDurationChanged(text) {
        this.props.serviceDurationChanged(text)
    }

    onContinuePress() {
        this.props.navigation.goBack()
        this.props.navigation.navigate('selectEmployee')
    }

    render() {
        return (
            <DefaultModal
                title='Adicionar serviço'
                buttonText='Continuar'
                dismissIcon='close'
                buttonAction={this.onContinuePress.bind(this)}
            >
                <KeyboardAwareScrollView>
                    <View style={styles.inputViews}>
                        <FormLabel
                            labelStyle={sanFranciscoWeights.light}
                        >
                            NOME DO SERVIÇO
                        </FormLabel>

                        <FormInput
                            placeholder='Digite o nome do serviço'
                            returnKeyType={"next"}
                            onChangeText={this.onNameChanged.bind(this)}
                            value={this.props.serviceName}
                            inputStyle={sanFranciscoWeights.thin}
                            onBlur={() => Keyboard.dismiss()}
                        />
                    </View>

                    <View style={styles.inputViews}>
                        <FormLabel
                            labelStyle={sanFranciscoWeights.light}
                        >
                            DESCRIÇAO OU OBSERVAÇÓES
                        </FormLabel>

                        <FormInput
                            placeholder='Descreva seu serviço'
                            returnKeyType={"next"}
                            onChangeText={this.onDescriptionChanged.bind(this)}
                            value={this.props.serviceDescription}
                            inputStyle={sanFranciscoWeights.thin}
                            onBlur={() => Keyboard.dismiss()}
                        />
                    </View>

                    <View style={styles.inputViews}>
                        <FormLabel
                            labelStyle={sanFranciscoWeights.light}
                        >
                            VALOR DO SERVIÇO EM REAIS
                        </FormLabel>

                        <FormInput
                            placeholder='Digite o valor a ser cobrado'
                            returnKeyType={"next"}
                            onChangeText={this.onPriceChanged.bind(this)}
                            value={this.props.servicePrice}
                            keyboardType='numeric'
                            inputStyle={sanFranciscoWeights.thin}
                            onBlur={() => Keyboard.dismiss()}
                        />
                    </View>

                    <View style={styles.inputViews}>
                        <FormLabel
                            labelStyle={sanFranciscoWeights.light}
                        >
                            DURAÇÃO DO SERVIÇO EM MINUTOS
                        </FormLabel>

                        <FormInput
                            placeholder='Digite em minutos a duração do serviço'
                            returnKeyType={"next"}
                            onChangeText={this.onDurationChanged.bind(this)}
                            value={this.props.serviceDuration}
                            keyboardType='numeric'
                            inputStyle={sanFranciscoWeights.thin}
                            onBlur={() => Keyboard.dismiss()}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </DefaultModal>
        )
    }
}

const styles = {
    inputViews: {
        paddingTop: 30
    }
}

const mapStateToProps = ({ mainAdmin, servicesAdmin }) => {
    const { user } = mainAdmin
    const { serviceName, serviceDescription, servicePrice, serviceDuration } = servicesAdmin

    return { 
        user,
        serviceName,
        serviceDescription,
        servicePrice,
        serviceDuration
    }
}


export default connect(mapStateToProps,
    {
        getAdminUserInfo,
        serviceNameChanged,
        serviceDescriptionChanged,
        servicePriceChanged,
        serviceDurationChanged
    }
)(AddServicesScreen);