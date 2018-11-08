import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, Keyboard } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import {
    nameAdminChanged,
    emailAdminChanged,
    companyNameAdminChanged,
    passwordAdminChanged,
    passwordConfirmationAdminChanged,
    registerAdminUser
} from '../actions'

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

    onPasswordChange(text) {
        this.props.passwordAdminChanged(text)
    }

    onPasswordConfirmationChange(text) {
        this.props.passwordConfirmationAdminChanged(text)
    }

    onRegisterButtonPress() {
        const { name, email, companyName, password, passwordConfirmation } = this.props
        this.props.registerAdminUser({ name, email, companyName, password, passwordConfirmation })
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

    render() {
        return (
            
            <KeyboardAvoidingView style={styles.mainView} behavior="padding">
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

                {/* <View>
                    <Button
                        borderRadius={50}
                        backgroundColor='#0089e3'
                        style={styles.registerButton}
                        title='Cadastrar'
                    // onPress={this.onLoginButtonPress.bind(this)}
                    />
                </View> */}
            </KeyboardAvoidingView>
        )
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
    }
}

const mapStateToProps = ({ registerAdmin }) => {
    const { name, email, companyName, password, passwordConfirmation, user, error } = registerAdmin;
    return {
        name,
        email,
        companyName,
        password,
        passwordConfirmation,
        user,
        error
    }
}

export default connect(mapStateToProps, {
    nameAdminChanged,
    emailAdminChanged,
    companyNameAdminChanged,
    passwordAdminChanged,
    passwordConfirmationAdminChanged,
    registerAdminUser
})(RegisterAdminFormScreen);