import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Keyboard, Dimensions } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import Header from '../components/Header';
import BottomButton from '../components/BottomButton';
import { connect } from 'react-redux';
import {
    nameClientChanged,
    emailClientChanged,
    phoneClientChanged,
    passwordClientChanged,
    passwordConfirmationClientChanged,
    checkIfClientEmailExistsAndRegister
} from '../actions';
import { Spinner } from '../components/Spinner';
import { sanFranciscoWeights } from 'react-native-typography';

const SCREEN_WIDTH = Dimensions.get('window').width;

class RegisterClientFormScreen extends Component {

    onNameChange(text) {
        this.props.nameClientChanged(text)
    }

    onEmailChange(text) {
        this.props.emailClientChanged(text)
    }

    onPhoneChange(text) {
        this.props.phoneClientChanged(text)
    }

    onPasswordChange(text) {
        this.props.passwordClientChanged(text)
    }

    onPasswordConfirmationChange(text) {
        this.props.passwordConfirmationClientChanged(text)
    }

    onRegisterButtonPress() {
        const { name, email, phone, password, passwordConfirmation, imageUrl } = this.props
        if (!name) return alert('Nome não informado')
        if (!email) return alert('E-mail não informado')
        if (!phone) return alert('Telefone não informado')
        if (password.length < 6) return alert('A senha precisa ter no mínimo 6 caracteres')
        if (!password || !passwordConfirmation) return alert('Senha ou confirmação de senha não informado')
        if (password !== passwordConfirmation) return alert('Confirmação de senha incorreta')
        const errorMessage = 'O e-mail informado já possui uma conta.'
        const errorRouteName = 'auth'
        const successRouteName = 'picFormClient'
        const userInfo = { name, email, phone, password, passwordConfirmation, imageUrl, role: 'client' }

        this.props.checkIfClientEmailExistsAndRegister({ email, errorMessage, errorRouteName, successRouteName, userInfo })
    }

    renderContent() {
        if (this.props.loading) {
            return <Spinner text='Criando conta...' />
        }

        return (

            <KeyboardAvoidingView
                style={styles.mainView}
                behavior="padding"
            >
                <Header headerText='Cadastre-se' icon='leftcircleo' />
                <View>
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
                <View>
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
                <View>
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
                <View>
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
                <View>
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
                <BottomButton
                    buttonText='Continuar'
                    buttonAction={this.onRegisterButtonPress.bind(this)}
                />
            </KeyboardAvoidingView>
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
    spinnerView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
        width: SCREEN_WIDTH
    }
}

const mapStateToProps = ({ registerClient }) => {
    const { name, email, phone, password, passwordConfirmation, user, loading, imageUrl } = registerClient;
    return {
        name,
        email,
        phone,
        password,
        passwordConfirmation,
        user,
        loading,
        imageUrl
    }
}

export default connect(mapStateToProps, {
    nameClientChanged,
    emailClientChanged,
    phoneClientChanged,
    passwordClientChanged,
    passwordConfirmationClientChanged,
    checkIfClientEmailExistsAndRegister
})(RegisterClientFormScreen);