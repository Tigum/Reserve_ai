import React, { Component } from 'react';
import { View, Text, Image, Dimensions, KeyboardAvoidingView, Keyboard, Animated, Easing } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'
import { connect } from 'react-redux';
import {
    emailChanged,
    passwordChanged,
    loginUser,
    facebookLogin,
    doFacebookLogin,
    checkIfUserAlreadyLoggedIn,
    emailAndPasswordInputFocus
} from '../actions'
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

    state = {
        animatedValue: new Animated.Value(0)
    }

    // componentWillMount() {
    //     this.props.facebookLogin()
    //     this.props.checkIfUserAlreadyLoggedIn()
    // }

    componentWillReceiveProps(nextProps) {
        

        if (this.props.emailAndPasswordFocus !== nextProps.emailAndPasswordFocus) {
            if (nextProps.emailAndPasswordFocus) {
                Animated.timing(this.state.animatedValue, {
                    toValue: 1,
                    duration: 300,
                    easing: Easing.ease
                }).start()
            } else {
                Animated.timing(this.state.animatedValue, {
                    toValue: 0,
                    duration: 300,
                    easing: Easing.ease
                }).start()
            }
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

    handleAnimation() {
        this.props.emailAndPasswordInputFocus(true)
    }

    dismissTextInput() {
        this.props.emailAndPasswordInputFocus(false)
        Keyboard.dismiss()
    }

    renderForm() {
        return (
            <View style={styles.formView}>
                <FormLabel
                    labelStyle={sanFranciscoWeights.light}
                >
                    EMAIL
                </FormLabel>

                <FormInput onFocus={() => this.handleAnimation()}
                    placeholder='Digite seu email'
                    returnKeyType={"next"}
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email}
                    autoCapitalize='none'
                    inputStyle={sanFranciscoWeights.thin}
                    onBlur={() => this.dismissTextInput()}
                />

                <FormLabel
                    labelStyle={sanFranciscoWeights.light}
                >SENHA
                </FormLabel>
                <FormInput onFocus={() => this.handleAnimation()}
                    secureTextEntry
                    placeholder='Digite seu password'
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                    autoCapitalize='none'
                    containerStyle={styles.formStyle}
                    inputStyle={sanFranciscoWeights.thin}
                    onBlur={() => this.dismissTextInput()}
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
        if (!this.props.loading) {
            return (
                <View style={styles.logoView}>
                    <Animated.Image
                        style={[styles.logo, {
                            transform: [
                                {
                                    translateY: this.state.animatedValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, -25]
                                    })
                                },
                                {
                                    scaleX: this.state.animatedValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1, 0.7]
                                    })
                                },
                                {
                                    scaleY: this.state.animatedValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1, 0.7]
                                    })
                                }
                            ]
                        }]}
                        source={require('../img/logo.png')}
                    />
                </View>
            )
        }
    }

    render() {
        if (this.props.loading) {
            return <Spinner fontSize={11} text='CARREGANDO...' />
        }

        return (
            <KeyboardAvoidingView style={styles.mainView} behavior="padding">
                {this.onRenderLogo()}
                {/* <KeyboardAvoidingView style={{justifyContent: 'center', flex: 1}}> */}
                {/* {this.renderError()} */}
                {this.renderForm()}
                {/* </KeyboardAvoidingView> */}
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
        height: SCREEN_HEIGHT / 3,
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
        paddingTop: 30,
        position: 'fixed',
        bottom: 10
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
        marginTop: -45,
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading, routeName, user, emailAndPasswordFocus } = auth;
    return {
        email,
        password,
        error,
        loading,
        routeName,
        user,
        emailAndPasswordFocus
    }
}

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginUser,
    facebookLogin,
    doFacebookLogin,
    checkIfUserAlreadyLoggedIn,
    emailAndPasswordInputFocus
})(LoginScreen);