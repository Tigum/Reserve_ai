import React, { Component } from 'react';
import { View, Text, Image, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button, SocialIcon } from 'react-native-elements'
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, facebookLogin, doFacebookLogin } from '../actions'
import { Spinner } from '../components/Spinner'

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
                <FormLabel>EMAIL</FormLabel>

                <FormInput onPress={() => this.setState({ emailInputFocus: true })}
                    placeholder='Digite seu email'
                    returnKeyType={"next"}
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email}
                    autoCapitalize='none'
                />

                <FormLabel>SENHA</FormLabel>
                <FormInput
                    secureTextEntry
                    placeholder='Digite seu password'
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                    autoCapitalize='none'
                />
                <Button
                    borderRadius={50}
                    backgroundColor='#0089e3'
                    style={styles.loginButton}
                    title='Entrar'
                    onPress={this.onLoginButtonPress.bind(this)}
                />
                <SocialIcon
                    style={styles.socialIconStyle}
                    title='Entrar com Facebook'
                    button
                    type='facebook'
                    returnKeyType={"return"}
                    onPress={this.onFacebookButtonPress.bind(this)}
                />
            </View>
        )
    }

    renderLinks() {
        if (!this.props.loading) {
            return (
                <View style={styles.registerLinkView}>

                    <TouchableWithoutFeedback>
                        <Text style={styles.registerLink}>Não tem uma conta? Cadastre-se</Text>
                    </TouchableWithoutFeedback>

                    <Text style={styles.registerLink}>ou</Text>

                    <TouchableWithoutFeedback onPress={this.onAdminRegisterPress.bind(this)}>
                        <Text style={styles.registerLink}>Cadastre-se como profissional!</Text>
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
        backgroundColor: '#d8edff'
    },
    logoView: {
        width: SCREEN_WIDTH,
        paddingTop: 80
    },
    logo: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    loginButton: {
        paddingTop: 20,
        width: '100%'
    },
    socialIconStyle: {
        width: '93%',
        alignSelf: 'center',
        // marginTop: 50
    },
    registerLink: {
        alignSelf: 'center',
        textDecorationLine: 'underline',
        fontSize: 17
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