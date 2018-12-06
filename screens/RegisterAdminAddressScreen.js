import React, { Component } from 'react';
import { View, Keyboard, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FormLabel, FormInput, CheckBox } from 'react-native-elements';
import Header from '../components/Header';
import BottomButton from '../components/BottomButton';
import { connect } from 'react-redux';
import {
    streetNameChanged,
    numberChanged,
    cepChanged,
    serviceAtHomeChanged
} from '../actions';
import { Spinner } from '../components/Spinner';
import { sanFranciscoWeights } from 'react-native-typography';

class RegisterAdminFormScreen extends Component {

    onStreetNameChange(text) {
        this.props.streetNameChanged(text)
    }

    onNumberChange(text) {
        this.props.numberChanged(text)
    }

    onCepChange(text) {
        this.props.cepChanged(text)
    }

    onServiceAtHomeChange() {
        this.props.serviceAtHomeChanged(this.props.serviceAtHome)
    }


    onRegisterButtonPress() {
        const { serviceAtHome, streetName, number, cep } = this.props
        if (serviceAtHome) return this.props.navigation.navigate('hoursForm')
        if (!streetName) return alert('Favor informar o nome da rua')
        if (!number) return alert('Favor informar o número do estabelecimento')
        if (!cep) return alert('Favor informar o CEP do estabelecimento')
        this.props.navigation.navigate('hoursForm')
    }

    onRenderCheckBox() {
        return (
            <View style={styles.inputViews}>
                <CheckBox
                    title={<Text style={[sanFranciscoWeights.thin, styles.checkBoxText]}>Não possuo endereço, atendo a domicílio</Text>}
                    onPress={this.onServiceAtHomeChange.bind(this)}
                    checked={this.props.serviceAtHome}
                />
            </View>
        )
    }

    renderContent() {
        if (this.props.loading) {
            return <Spinner text='Validando usuário...' />
        }

        if (this.props.serviceAtHome) {
            return (
                <View style={styles.mainView}>
                    <KeyboardAwareScrollView>
                        <Header headerText='Endereço' icon='leftcircleo' />
                        {this.onRenderCheckBox()}
                    </KeyboardAwareScrollView>
                    <BottomButton
                        buttonText='Continuar'
                        buttonAction={this.onRegisterButtonPress.bind(this)}
                    />
                </View>
            )
        }

        return (
            <View style={styles.mainView}>
                <KeyboardAwareScrollView>
                    <Header headerText='Endereço' icon='leftcircleo' />
                    {this.onRenderCheckBox()}
                    <View style={styles.inputViews}>
                        <FormLabel
                            labelStyle={sanFranciscoWeights.light}
                        >
                            NOME DA RUA
                    </FormLabel>

                        <FormInput
                            placeholder='Digite o nome da sua rua'
                            returnKeyType={"next"}
                            onChangeText={this.onStreetNameChange.bind(this)}
                            value={this.props.streetName}
                            onBlur={() => Keyboard.dismiss()}
                            inputStyle={sanFranciscoWeights.thin}
                        />
                    </View>
                    <View style={styles.inputViews}>
                        <FormLabel
                            labelStyle={sanFranciscoWeights.light}
                        >
                            NÚMERO
                    </FormLabel>

                        <FormInput
                            placeholder='Digite o número'
                            returnKeyType={"next"}
                            onChangeText={this.onNumberChange.bind(this)}
                            value={this.props.number}
                            onBlur={() => Keyboard.dismiss()}
                            inputStyle={sanFranciscoWeights.thin}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.inputViews}>
                        <FormLabel
                            labelStyle={sanFranciscoWeights.light}
                        >
                            CEP
                    </FormLabel>

                        <FormInput
                            placeholder='Digite seu CEP'
                            returnKeyType={"next"}
                            onChangeText={this.onCepChange.bind(this)}
                            value={this.props.cep}
                            keyboardType='numeric'
                            onBlur={() => Keyboard.dismiss()}
                            inputStyle={sanFranciscoWeights.thin}
                        />
                    </View>

                </KeyboardAwareScrollView>
                <BottomButton
                    buttonText='Continuar'
                    buttonAction={this.onRegisterButtonPress.bind(this)}
                />
            </View>
        )
    }

    render() {
        return this.renderContent()
    }
}

const styles = {
    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    registerButton: {
        paddingTop: 35,
        paddingBottom: 35
    },
    inputViews: {
        paddingTop: 10
    },
    checkBoxText: {
        paddingLeft: 5,
        color: 'grey'
    }
}

const mapStateToProps = ({ registerAdmin }) => {
    const { serviceAtHome, streetName, number, cep } = registerAdmin;
    return {
        serviceAtHome,
        streetName,
        number,
        cep,
    }
}

export default connect(mapStateToProps, {
    streetNameChanged,
    numberChanged,
    cepChanged,
    serviceAtHomeChanged
})(RegisterAdminFormScreen);