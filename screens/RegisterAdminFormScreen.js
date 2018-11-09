import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, Keyboard, Dimensions } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import {
    nameAdminChanged,
    emailAdminChanged,
    companyNameAdminChanged,
    phoneAdminChanged,
    passwordAdminChanged,
    passwordConfirmationAdminChanged,
    registerAdminUser
} from '../actions'
import { Spinner } from '../components/Spinner'

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
        this.props.registerAdminUser({ name, email, companyName, phone, password, passwordConfirmation })
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
            return (
                <View style={styles.spinnerView}>
                    <Spinner />
                </View>
            )
        }

        return (
            
            <KeyboardAvoidingView style={styles.mainView} behavior="padding">
                {this.renderError()}
                <View>
                    <FormLabel>NOME</FormLabel>

                    <FormInput
                        placeholder='Digite seu nome'
                        returnKeyType={"next"}
                        onChangeText={this.onNameChange.bind(this)}
                        value={this.props.name}
                        onBlur={() => Keyboard.dismiss()}
                    />
                </View>
                <View>
                    <FormLabel>EMAIL</FormLabel>

                    <FormInput
                        placeholder='Digite seu nome'
                        returnKeyType={"next"}
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                        onBlur={() => Keyboard.dismiss()}
                        autoCapitalize='none'
                    />
                </View>
                <View>
                    <FormLabel>NOME DE SEU EMPREENDIMENTO</FormLabel>

                    <FormInput
                        placeholder='Digite seu nome'
                        returnKeyType={"next"}
                        onChangeText={this.onCompanyNameChange.bind(this)}
                        value={this.props.companyName}
                        onBlur={() => Keyboard.dismiss()}
                    />
                </View>
                <View>
                    <FormLabel>TELEFONE</FormLabel>

                    <FormInput
                        placeholder='Digite seu telefone'
                        returnKeyType={"next"}
                        onChangeText={this.onPhoneChange.bind(this)}
                        value={this.props.phone}
                        onBlur={() => Keyboard.dismiss()}
                        keyboardType='numeric'
                    />
                </View>
                <View>
                    <FormLabel>SENHA</FormLabel>

                    <FormInput
                        placeholder='Digite seu nome'
                        returnKeyType={"next"}
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                        secureTextEntry
                        onBlur={() => Keyboard.dismiss()}
                    />
                </View>
                <View>
                    <FormLabel>CONFIRMAR SENHA</FormLabel>

                    <FormInput
                        placeholder='Digite seu nome'
                        returnKeyType={"next"}
                        onChangeText={this.onPasswordConfirmationChange.bind(this)}
                        value={this.props.passwordConfirmation}
                        secureTextEntry
                        onBlur={() => Keyboard.dismiss()}
                    />
                    <Button
                        borderRadius={50}
                        backgroundColor='#0089e3'
                        style={styles.registerButton}
                        title='Cadastrar'
                    onPress={this.onRegisterButtonPress.bind(this)}
                    />
                </View>

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
        backgroundColor: '#d8edff'
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
        backgroundColor: '#d8edff',
        alignSelf: 'center',
        width: SCREEN_WIDTH
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
    registerAdminUser
})(RegisterAdminFormScreen);