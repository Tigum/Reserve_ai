import React, { Component } from 'react';
import { View, Text, Keyboard, Dimensions, Picker } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FormLabel, FormInput } from 'react-native-elements';
import Header from '../components/Header';
import BottomButton from '../components/BottomButton';
import { connect } from 'react-redux';
import {
    
} from '../actions';
import { Spinner } from '../components/Spinner';
import { sanFranciscoWeights } from 'react-native-typography';

const SCREEN_WIDTH = Dimensions.get('window').width;

class RegisterAdminFormScreen extends Component {

    // onNameChange(text) {
    //     this.props.nameAdminChanged(text)
    // }

   

    // onRegisterButtonPress() {
    //     const { name, email, companyName, phone, password, passwordConfirmation } = this.props
    //     if (!name) return alert('Nome não informado')
    //     if (!email) return alert('E-mail não informado')
    //     if (!companyName) return alert('Nome do empreendimento não informado')
    //     if (!phone) return alert('Telefone não informado')
    //     if (password.length < 6) return alert('A senha precisa ter no mínimo 6 caracteres')
    //     if (!password || !passwordConfirmation) return alert('Senha ou confirmação de senha não informado')
    //     if (password !== passwordConfirmation) return alert('Confirmação de senha incorreta')
    //     const errorMessage = 'O e-mail informado já possui uma conta.'
    //     const errorRouteName = 'auth'
    //     const successRouteName = 'hoursForm'

    //     this.props.checkIfEmailExists({email, errorMessage, errorRouteName, successRouteName})
    // }

    // renderError() {
    //     if (this.props.error) {
    //         return (
    //             <View style={{ backgroundColor: 'transparent' }}>
    //                 <Text style={styles.errorTextStyle}>
    //                     {this.props.error}
    //                 </Text>
    //             </View>
    //         )
    //     }
    // }

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
                <Header headerText='Endereço' icon='leftcircleo' />
                {/* {this.renderError()} */}
                <View style={styles.inputViews}>
                    <FormLabel
                        labelStyle={sanFranciscoWeights.light}
                    >
                        NOME DA RUA
                    </FormLabel>

                    <FormInput
                        placeholder='Digite o nome da sua rua'
                        returnKeyType={"next"}
                        // onChangeText={this.onNameChange.bind(this)}
                        // value={this.props.name}
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
                        // onChangeText={this.onEmailChange.bind(this)}
                        // value={this.props.email}
                        onBlur={() => Keyboard.dismiss()}
                        autoCapitalize='none'
                        inputStyle={sanFranciscoWeights.thin}
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
                        // onChangeText={this.onPasswordChange.bind(this)}
                        // value={this.props.password}
                        keyboardType='numeric'
                        onBlur={() => Keyboard.dismiss()}
                        inputStyle={sanFranciscoWeights.thin}
                    />
                </View>
                
            </KeyboardAwareScrollView>
            <BottomButton
                    buttonText='Continuar'
                    // buttonAction={this.onRegisterButtonPress.bind(this)}
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
    const { hasLocation, streetName, number, state, cep, city } = registerAdmin;
    return {
        hasLocation,
        streetName,
        number,
        state,
        cep,
        city
    }
}

export default connect(mapStateToProps, {
    
})(RegisterAdminFormScreen);