import React, { Component } from 'react';
import { View, Text, Image, Dimensions, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button, SocialIcon } from 'react-native-elements'
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions'
import { Spinner } from '../components/Spinner'

const SCREEN_WIDTH = Dimensions.get('window').width;

class LoginScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const { navigate } = navigation

        return {
            tabBarVisible: false
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

    renderButton() {
        if (this.props.loading) {
            return <Spinner size='small' />
        }

        return (
            <View>
                <Button
                    borderRadius={50}
                    backgroundColor='#0089e3'
                    style={styles.loginButton}
                    title='Entrar'
                    onPress={this.onLoginButtonPress.bind(this)}
                />
                <SocialIcon
                    style={styles.socialIconStyle}
                    title='Sign In With Facebook'
                    button
                    type='facebook'
                    returnKeyType={"return"}
                />
                <Text style={styles.registerLink}>Não tem uma conta? Cadastre-se</Text>
            </View>
        )
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.error}>
                        {this.props.error}
                    </Text>
                </View>
            )
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.mainView} behavior="padding">
                {/* <View> */}
                <View style={styles.logoView}>
                    <Image
                        style={styles.logo}
                        source={require('../img/logo_main.png')}
                    />
                </View>
                <View>
                    {this.renderError()}
                    <FormLabel>EMAIL</FormLabel>

                    <FormInput onPress={() => this.setState({ emailInputFocus: true })}
                        placeholder='Digite seu email'
                        returnKeyType={"next"}
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />

                    <FormLabel>SENHA</FormLabel>
                    <FormInput
                        placeholder='Digite seu password'
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                    {this.renderButton()}

                </View>
                {/* </View> */}

            </KeyboardAvoidingView>
        )
    }
}

const styles = {
    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#d8edff'
    },
    logoView: {
        width: SCREEN_WIDTH,
        // paddingBottom: 60
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
        paddingTop: 20,
        textDecorationLine: 'underline'
    },
    error: {
        alignSelf: 'center',
        color: 'red'
    }
}

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return {
        email,
        password,
        error,
        loading
    }
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginScreen);