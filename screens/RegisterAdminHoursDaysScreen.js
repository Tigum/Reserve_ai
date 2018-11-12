import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, Dimensions, Picker } from 'react-native';
import { FormLabel } from 'react-native-elements'
import Header from '../components/Header'
import BottomButton from '../components/BottomButton'
import { connect } from 'react-redux';
import {
    continueRegisterAdmin,
    registerAdminUser
} from '../actions'
import { Spinner } from '../components/Spinner'
import { sanFranciscoWeights } from 'react-native-typography';

const SCREEN_WIDTH = Dimensions.get('window').width;

class RegisterAdminHoursDaysScreen extends Component {

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
        console.log('props', this.props)
        return (

            <KeyboardAvoidingView
                style={styles.mainView}
                behavior="padding"
            >
                <Header headerText='Horário de funcionamento' icon='leftcircleo' />
                {this.renderError()}
                <View>
                    <FormLabel
                        labelStyle={sanFranciscoWeights.light}
                    >
                        ABRE ÀS
                    </FormLabel>

                    <Picker
                    // selectedValue='00:00'
                    // onValueChange={value => '00:00'}
                    >
                        <Picker.item label='00:00' value='00:00' />
                        {/* <Picker.item type={String} label='01:00' value='01:00' />
                        <Picker.item type={String} label='02:00' value='02:00' />
                        <Picker.item type={String} label='03:00' value='03:00' />
                        <Picker.item type={String} label='04:00' value='04:00' />
                        <Picker.item type={String} label='05:00' value='05:00' />
                        <Picker.item type={String} label='06:00' value='06:00' />
                        <Picker.item type={String} label='07:00' value='07:00' />
                        <Picker.item type={String} label='08:00' value='08:00' />
                        <Picker.item type={String} label='09:00' value='09:00' />
                        <Picker.item type={String} label='10:00' value='10:00' />
                        <Picker.item type={String} label='11:00' value='11:00' />
                        <Picker.item type={String} label='12:00' value='12:00' />
                        <Picker.item type={String} label='13:00' value='13:00' />
                        <Picker.item type={String} label='14:00' value='14:00' />
                        <Picker.item type={String} label='15:00' value='15:00' />
                        <Picker.item type={String} label='16:00' value='16:00' />
                        <Picker.item type={String} label='17:00' value='17:00' />
                        <Picker.item type={String} label='18:00' value='18:00' />
                        <Picker.item type={String} label='19:00' value='19:00' />
                        <Picker.item type={String} label='20:00' value='20:00' />
                        <Picker.item type={String} label='21:00' value='21:00' />
                        <Picker.item type={String} label='22:00' value='22:00' />
                        <Picker.item type={String} label='23:00' value='23:00' /> */}
                    </Picker>

                    <FormLabel
                        labelStyle={sanFranciscoWeights.light}
                    >
                        FECHA ÀS
                    </FormLabel>

                    <Picker
                    // style={{ flex: 1 }}
                    // selectedValue={this.props.shift}
                    // onValueChange={value => this.props.employeeUpdate({ prop: 'shift', value })}
                    >
                        {/* <Picker.item label='00:00' value='00:00' />
                        <Picker.item label='01:00' value='01:00' />
                        <Picker.item label='02:00' value='02:00' />
                        <Picker.item label='03:00' value='03:00' />
                        <Picker.item label='04:00' value='04:00' />
                        <Picker.item label='05:00' value='05:00' />
                        <Picker.item label='06:00' value='06:00' />
                        <Picker.item label='07:00' value='07:00' />
                        <Picker.item label='08:00' value='08:00' />
                        <Picker.item label='09:00' value='09:00' />
                        <Picker.item label='10:00' value='10:00' />
                        <Picker.item label='11:00' value='11:00' />
                        <Picker.item label='12:00' value='12:00' />
                        <Picker.item label='13:00' value='13:00' />
                        <Picker.item label='14:00' value='14:00' />
                        <Picker.item label='15:00' value='15:00' />
                        <Picker.item label='16:00' value='16:00' />
                        <Picker.item label='17:00' value='17:00' />
                        <Picker.item label='18:00' value='18:00' />
                        <Picker.item label='19:00' value='19:00' />
                        <Picker.item label='20:00' value='20:00' />
                        <Picker.item label='21:00' value='21:00' />
                        <Picker.item label='22:00' value='22:00' />
                        <Picker.item label='23:00' value='23:00' /> */}
                    </Picker>
                </View>

                <BottomButton
                    buttonText='Finalizar cadastro'
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
    continueRegisterAdmin,
    registerAdminUser
})(RegisterAdminHoursDaysScreen);