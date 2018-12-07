import React, { Component } from 'react';
import { View, Text, Image, Dimensions, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, facebookLogin, doFacebookLogin, checkIfUserAlreadyLoggedIn } from '../actions'
import { Spinner } from '../components/Spinner'
import Button from '../components/Button'
import ButtonFacebook from '../components/ButtonFacebook'
import { sanFranciscoWeights } from 'react-native-typography';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class LoginScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { navigate } = navigation
        return {
            tabBarVisible: false
        }
    }

    componentWillMount() {
        this.props.facebookLogin()
        this.props.checkIfUserAlreadyLoggedIn()
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
    }

    renderForm() {
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
                    buttonBackgroundColor='#7f7f7f'
                    buttonHeight={50}
                />
                <ButtonFacebook 
                    buttonText='Entrar com Facebook'
                    buttonAction={this.onFacebookButtonPress.bind(this)}
                    buttonHeight={50}
                />
            </View>
        )
    }

    renderLinks() {
        if (!this.props.loading) {
            return (
                <View style={styles.registerLinkView}>

                    <Button 
                        buttonText='Não tem uma conta? Cadastre-se'
                        buttonBackgroundColor='white'
                        buttonBorderColor='#3577e6'
                        buttonBorderStyle='solid'
                        buttonHeight={30}
                        buttonTextColor='#3577e6'
                        buttonFontSize={15}
                        buttonMarginTop={0}
                        buttonAction={this.onClientRegisterPress.bind(this)}
                    />
                    <Button 
                        buttonText='Cadastre-se como profissional!'
                        buttonBackgroundColor='white'
                        buttonBorderColor='#3577e6'
                        buttonBorderStyle='solid'
                        buttonHeight={30}
                        buttonTextColor='#3577e6'
                        buttonFontSize={15}
                        buttonMarginTop={5}
                        buttonAction={this.onAdminRegisterPress.bind(this)}
                    />
                
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

    onClientRegisterPress() {
        this.props.navigation.navigate('clientForm')
    }

    onRenderLogo() {
        if(!this.props.loading) {
            return (
                <View style={styles.logoView}>
                    <Image
                        style={styles.logo}
                        source={require('../img/logo.png')}
                    />
                </View>
            )
        }
    }

    render() {
        if (this.props.loading) {
            return  <Spinner text='Autenticando usuário...'/>
        }
        
        return (
            <KeyboardAvoidingView style={styles.mainView} behavior="padding">
                {this.onRenderLogo()}
                <View style={{justifyContent: 'center', flex: 1}}>
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
        backgroundColor: 'white',
    },
    logoView: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT/3,
        justifyContent: 'flex-end'
    },
    logo: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 120,
        height: 125,
    },
    registerLink: {
        alignSelf: 'center',
        textDecorationLine: 'underline',
        fontSize: 13,
        color: '#7fc3ff'
    },
    registerLinkView: {
        paddingBottom: 10,
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
        marginTop: -25,
    }
}

const mapStateToProps = ({ auth, registerAdmin }) => {
    const { email, password, error, loading, routeName, user } = auth;
    return {
        email,
        password,
        error,
        loading,
        routeName,
        user,
    }
}

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginUser,
    facebookLogin,
    doFacebookLogin,
    checkIfUserAlreadyLoggedIn,
})(LoginScreen);