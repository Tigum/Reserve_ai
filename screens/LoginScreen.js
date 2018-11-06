import React, { Component } from 'react';
import { View, Text, Image, Dimensions, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button, SocialIcon } from 'react-native-elements'
import { connect } from 'react-redux';
import { emailChanged, passwordChanged } from '../actions'

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
                    <Button
                        borderRadius={50}
                        backgroundColor='#0089e3'
                        style={styles.loginButton}
                        title='Entrar'
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

export default connect(mapStateToProps, { emailChanged, passwordChanged })(LoginScreen);