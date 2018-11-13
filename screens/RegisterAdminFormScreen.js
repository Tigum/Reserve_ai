import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, Keyboard, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
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
    registerAdminUser,
    continueRegisterAdmin
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
        const userInfo = {
            name,
            email,
            companyName,
            phone,
            password,
            passwordConfirmation
        }
        this.props.continueRegisterAdmin(userInfo)
        this.props.navigation.navigate('hoursAndDaysForm')
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
            
            <KeyboardAvoidingView 
                style={styles.mainView} 
                behavior="padding"
            >
            <Header headerText='Cadastre sua loja' icon='leftcircleo'/>
            {this.renderError()}
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
                <View>
                    <FormLabel
                        labelStyle={sanFranciscoWeights.light}
                    >
                    TELEFONE
                    </FormLabel>

                    <FormInput
                        placeholder='Digite seu telefone'
                        returnKeyType={"next"}
                        onChangeText={this.onPhoneChange.bind(this)}
                        value={this.props.phone}
                        onBlur={() => Keyboard.dismiss()}
                        keyboardType='numeric'
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
    registerAdminUser,
    continueRegisterAdmin
})(RegisterAdminFormScreen);