import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, Dimensions, Picker } from 'react-native';
import { FormLabel } from 'react-native-elements'
import Header from '../components/Header'
import BottomButton from '../components/BottomButton'
import { connect } from 'react-redux';
import {
    continueRegisterAdmin,
    registerAdminUser,
    hoursCompanyStart,
    hoursCompanyEnd
} from '../actions'
import { Spinner } from '../components/Spinner'
import { sanFranciscoWeights } from 'react-native-typography';

const SCREEN_WIDTH = Dimensions.get('window').width;

class RegisterAdminHoursScreen extends Component {

    onRegisterButtonPress() {
        const { name, email, companyName, phone, password, passwordConfirmation } = this.props
        this.props.registerAdminUser({ name, email, companyName, phone, password, passwordConfirmation })
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
                <Header headerText='Horário de funcionamento' icon='leftcircleo' />
                <View>
                    <FormLabel
                        labelStyle={sanFranciscoWeights.light}
                    >
                        ABRE ÀS
                    </FormLabel>

                    <Picker
                    selectedValue={this.props.startHour}
                    onValueChange={hour => this.props.hoursCompanyStart(hour)}
                    >
                        <Picker.Item label='00:00' value='00:00' />
                        <Picker.Item type={String} label='01:00' value='01:00' />
                        <Picker.Item type={String} label='02:00' value='02:00' />
                        <Picker.Item type={String} label='03:00' value='03:00' />
                        <Picker.Item type={String} label='04:00' value='04:00' />
                        <Picker.Item type={String} label='05:00' value='05:00' />
                        <Picker.Item type={String} label='06:00' value='06:00' />
                        <Picker.Item type={String} label='07:00' value='07:00' />
                        <Picker.Item type={String} label='08:00' value='08:00' />
                        <Picker.Item type={String} label='09:00' value='09:00' />
                        <Picker.Item type={String} label='10:00' value='10:00' />
                        <Picker.Item type={String} label='11:00' value='11:00' />
                        <Picker.Item type={String} label='12:00' value='12:00' />
                        <Picker.Item type={String} label='13:00' value='13:00' />
                        <Picker.Item type={String} label='14:00' value='14:00' />
                        <Picker.Item type={String} label='15:00' value='15:00' />
                        <Picker.Item type={String} label='16:00' value='16:00' />
                        <Picker.Item type={String} label='17:00' value='17:00' />
                        <Picker.Item type={String} label='18:00' value='18:00' />
                        <Picker.Item type={String} label='19:00' value='19:00' />
                        <Picker.Item type={String} label='20:00' value='20:00' />
                        <Picker.Item type={String} label='21:00' value='21:00' />
                        <Picker.Item type={String} label='22:00' value='22:00' />
                        <Picker.Item type={String} label='23:00' value='23:00' />
                    </Picker>

                    <FormLabel
                        labelStyle={sanFranciscoWeights.light}
                    >
                        FECHA ÀS
                    </FormLabel>

                    <Picker
                    selectedValue={this.props.endHour}
                    onValueChange={hour => this.props.hoursCompanyEnd(hour)}
                    >
                        <Picker.Item label='00:00' value='00:00' />
                        <Picker.Item label='01:00' value='01:00' />
                        <Picker.Item label='02:00' value='02:00' />
                        <Picker.Item label='03:00' value='03:00' />
                        <Picker.Item label='04:00' value='04:00' />
                        <Picker.Item label='05:00' value='05:00' />
                        <Picker.Item label='06:00' value='06:00' />
                        <Picker.Item label='07:00' value='07:00' />
                        <Picker.Item label='08:00' value='08:00' />
                        <Picker.Item label='09:00' value='09:00' />
                        <Picker.Item label='10:00' value='10:00' />
                        <Picker.Item label='11:00' value='11:00' />
                        <Picker.Item label='12:00' value='12:00' />
                        <Picker.Item label='13:00' value='13:00' />
                        <Picker.Item label='14:00' value='14:00' />
                        <Picker.Item label='15:00' value='15:00' />
                        <Picker.Item label='16:00' value='16:00' />
                        <Picker.Item label='17:00' value='17:00' />
                        <Picker.Item label='18:00' value='18:00' />
                        <Picker.Item label='19:00' value='19:00' />
                        <Picker.Item label='20:00' value='20:00' />
                        <Picker.Item label='21:00' value='21:00' />
                        <Picker.Item label='22:00' value='22:00' />
                        <Picker.Item label='23:00' value='23:00' />
                    </Picker>
                </View>

                <BottomButton
                    buttonText='Continuar'
                    buttonAction={this.onRegisterButtonPress.bind(this)}
                />
            </KeyboardAvoidingView>
        )
    }

    render() {
        console.log('props2', this.props)
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
    const { name, email, companyName, phone, password, passwordConfirmation, user, loading, startHour, endHour } = registerAdmin;
    return {
        name,
        email,
        companyName,
        phone,
        password,
        passwordConfirmation,
        user,
        loading,
        startHour,
        endHour
    }
}

export default connect(mapStateToProps, {
    continueRegisterAdmin,
    registerAdminUser,
    hoursCompanyStart,
    hoursCompanyEnd
})(RegisterAdminHoursScreen);