import React, { Component } from 'react';
import { View, Text, Keyboard, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FormLabel, FormInput } from 'react-native-elements';
import Header from '../components/Header';
import BottomButton from '../components/BottomButton';
import { connect } from 'react-redux';
import {
    nameAdminChanged,
    emailAdminChanged,
    companyNameAdminChanged,
    phoneAdminChanged,
    passwordAdminChanged,
    passwordConfirmationAdminChanged,
    continueRegisterAdmin,
    checkIfEmailExists
} from '../actions';
import { Spinner } from '../components/Spinner';
import { sanFranciscoWeights } from 'react-native-typography';

const SCREEN_WIDTH = Dimensions.get('window').width;

class RegisterAdminFormScreen extends Component {

    onNameChange(text) {
        this.props.nameAdminChanged(text)
    }

    onEmailChange(text) {
        this.props.emailAdminChanged(text)
    }

    onCompanyNameChange(text) {
        this.props.companyNameAdminChanged(text)
    }

    onPhoneChange(text) {
        this.props.phoneAdminChanged(text)
    }

    onPasswordChange(text) {
        this.props.passwordAdminChanged(text)
    }

    onPasswordConfirmationChange(text) {
        this.props.passwordConfirmationAdminChanged(text)
    }

    onRegisterButtonPress() {
        const { name, email, companyName, phone, password, passwordConfirmation } = this.props
        if (!name) return alert('Nome não informado')
        if (!email) return alert('E-mail não informado')
        if (!companyName) return alert('Nome do empreendimento não informado')
        if (!phone) return alert('Telefone não informado')
        if (password.length < 6) return alert('A senha precisa ter no mínimo 6 caracteres')
        if (!password || !passwordConfirmation) return alert('Senha ou confirmação de senha não informado')
        if (password !== passwordConfirmation) return alert('Confirmação de senha incorreta')
        const errorMessage = 'O e-mail informado já possui uma conta.'
        const errorRouteName = 'auth'
        const successRouteName = 'stateAndCityForm'

        this.props.checkIfEmailExists({email, errorMessage, errorRouteName, successRouteName})
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'transparent' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            )
        }
    }

    renderContent() {
        if (this.props.loading) {
            return <Spinner text='Validando usuário...' />
        }

        return (
            <View style={styles.mainView}>
            <KeyboardAwareScrollView
                // style={styles.mainView}
                // behavior="padding"
            >
                <Header headerText='Cadastre sua loja' icon='leftcircleo' />
                {this.renderError()}
                <View style={styles.inputViews}>
                    <FormLabel
                        labelStyle={sanFranciscoWeights.light}
                    >
                        NOME
                    </FormLabel>

                    <FormInput
                        placeholder='Digite seu nome'
                        returnKeyType={"next"}
                        onChangeText={this.onNameChange.bind(this)}
                        value={this.props.name}
                        onBlur={() => Keyboard.dismiss()}
                        inputStyle={sanFranciscoWeights.thin}
                    />
                </View>
                <View style={styles.inputViews}>
                    <FormLabel
                        labelStyle={sanFranciscoWeights.light}
                    >
                        EMAIL
                    </FormLabel>

                    <FormInput
                        placeholder='Digite seu e-mail'
                        returnKeyType={"next"}
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                        onBlur={() => Keyboard.dismiss()}
                        autoCapitalize='none'
                        inputStyle={sanFranciscoWeights.thin}
                    />
                </View>
                <View style={styles.inputViews}>
                    <FormLabel
                        labelStyle={sanFranciscoWeights.light}
                    >
                        NOME DE SEU EMPREENDIMENTO
                    </FormLabel>

                    <FormInput
                        placeholder='Digite o nome do seu negócio'
                        returnKeyType={"next"}
                        onChangeText={this.onCompanyNameChange.bind(this)}
                        value={this.props.companyName}
                        onBlur={() => Keyboard.dismiss()}
                        inputStyle={sanFranciscoWeights.thin}
                    />
                </View>
                <View style={styles.inputViews}>
                    <FormLabel
                        labelStyle={sanFranciscoWeights.light}
                    >
                        TELEFONE
                    </FormLabel>

                    <FormInput
                        placeholder='Ex.: (00) 00000-0000'
                        returnKeyType={"next"}
                        onChangeText={this.onPhoneChange.bind(this)}
                        value={this.props.phone}
                        onBlur={() => Keyboard.dismiss()}
                        // keyboardType='numeric'
                        inputStyle={sanFranciscoWeights.thin}
                    />
                </View>
                <View style={styles.inputViews}>
                    <FormLabel
                        labelStyle={sanFranciscoWeights.light}
                    >
                        SENHA
                    </FormLabel>

                    <FormInput
                        placeholder='Digite sua senha'
                        returnKeyType={"next"}
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                        secureTextEntry
                        onBlur={() => Keyboard.dismiss()}
                        inputStyle={sanFranciscoWeights.thin}
                    />
                </View>
                <View style={styles.inputViews}>
                    <FormLabel
                        labelStyle={sanFranciscoWeights.light}
                    >
                        CONFIRMAR SENHA
                    </FormLabel>

                    <FormInput
                        placeholder='Confirme sua senha'
                        returnKeyType={"next"}
                        onChangeText={this.onPasswordConfirmationChange.bind(this)}
                        value={this.props.passwordConfirmation}
                        secureTextEntry
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
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    spinnerView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
        width: SCREEN_WIDTH
    },
    inputViews: {
        paddingTop: 10
    }
}

const mapStateToProps = ({ registerAdmin }) => {
    const { name, email, companyName, phone, password, passwordConfirmation, user, error, loading } = registerAdmin;
    return {
        name,
        email,
        companyName,
        phone,
        password,
        passwordConfirmation,
        user,
        error,
        loading
    }
}

export default connect(mapStateToProps, {
    nameAdminChanged,
    emailAdminChanged,
    companyNameAdminChanged,
    phoneAdminChanged,
    passwordAdminChanged,
    passwordConfirmationAdminChanged,
    continueRegisterAdmin,
    checkIfEmailExists
})(RegisterAdminFormScreen);