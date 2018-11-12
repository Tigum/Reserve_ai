import React, { Component } from 'react';
import { View, Text, Image, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { FormLabel, FormInput, SocialIcon } from 'react-native-elements'
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, facebookLogin, doFacebookLogin } from '../actions'
import { Spinner } from '../components/Spinner'
import Button from '../components/Button'
import ButtonFacebook from '../components/ButtonFacebook'
import { sanFranciscoWeights } from 'react-native-typography';

const SCREEN_WIDTH = Dimensions.get('window').width;

class LoginScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { navigate } = navigation

        return {
            tabBarVisible: false
        }
    }

    componentWillMount() {
        this.props.facebookLogin()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.routeName !== nextProps.routeName) {
            this.props.navigation.navigate(nextProps.routeName)
        }
    }

    onEmailChange(text) {
        this.props.emailChanged(text)
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text)
    }

    onLoginButtonPress() {
        const { email, password } = this.props;
        this.props.loginUser({ email, password })
    }

    onFacebookButtonPress() {
        this.props.doFacebookLogin()
        // this.props.navigation.navigate('welcome')
    }

    renderForm() {
        if (this.props.loading) {
            return (
                <View style={styles.spinnerView}>
                    <Spinner />
                </View>
            )
        }

        return (
            <View style={styles.formView}>
                <FormLabel
                    labelStyle={sanFranciscoWeights.light}
                >
                EMAIL
                </FormLabel>

                <FormInput onPress={() => this.setState({ emailInputFocus: true })}
                    placeholder='Digite seu email'
                    returnKeyType={"next"}
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email}
                    autoCapitalize='none'
                    inputStyle={sanFranciscoWeights.thin}
                />

                <FormLabel
                    labelStyle={sanFranciscoWeights.light}
                >SENHA
                </FormLabel>
                <FormInput
                    secureTextEntry
                    placeholder='Digite seu password'
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                    autoCapitalize='none'
                    containerStyle={styles.formStyle}
                    inputStyle={sanFranciscoWeights.thin}
                />
                <Button 
                    buttonText='Entrar'
                    buttonAction={this.onLoginButtonPress.bind(this)}
                />
                <ButtonFacebook 
                    buttonText='Entrar com Facebook'
                    buttonAction={this.onFacebookButtonPress.bind(this)}
                />
            </View>
        )
    }

    renderLinks() {
        if (!this.props.loading) {
            return (
                <View style={styles.registerLinkView}>

                    <TouchableWithoutFeedback>
                        <Text style={[styles.registerLink, sanFranciscoWeights.thin]}>Não tem uma conta? Cadastre-se</Text>
                    </TouchableWithoutFeedback>

                    <Text style={[styles.registerLink, {textDecorationLine: 'none'},]}>ou</Text>

                    <TouchableWithoutFeedback onPress={this.onAdminRegisterPress.bind(this)}>
                        <Text style={[styles.registerLink, sanFranciscoWeights.thin]}>Cadastre-se como profissional!</Text>
                    </TouchableWithoutFeedback>

                </View>
            )
        }
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'transparent' }}>
                    <Text style={styles.error}>
                        {this.props.error}
                    </Text>
                </View>
            )
        }
    }

    onAdminRegisterPress() {
        this.props.navigation.navigate('adminForm')
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.mainView} behavior="padding">
                <View style={styles.logoView}>
                    <Image
                        style={styles.logo}
                        source={require('../img/logo_main.png')}
                    />
                </View>
                <View>
                    {this.renderError()}
                    {this.renderForm()}
                </View>
                {this.renderLinks()}
            </KeyboardAvoidingView>
        )
    }
}

const styles = {
    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    logoView: {
        width: SCREEN_WIDTH,
        paddingTop: 80
    },
    logo: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    registerLink: {
        alignSelf: 'center',
        textDecorationLine: 'underline',
        fontSize: 13,
        color: '#7fc3ff'
    },
    registerLinkView: {
        paddingBottom: 20
    },
    error: {
        alignSelf: 'center',
        color: 'red',
        fontSize: 15
    },
    spinnerView: {
        marginTop: 60,
        flex: 1,
        alignItems: 'center',
        marginTop: -800
    },
    formView: {
        paddingBottom: 100
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading, routeName, user } = auth;
    return {
        email,
        password,
        error,
        loading,
        routeName,
        user
    }
}

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginUser,
    facebookLogin,
    doFacebookLogin,
})(LoginScreen);