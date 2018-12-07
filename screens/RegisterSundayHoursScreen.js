import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Picker } from 'react-native';
import { FormLabel } from 'react-native-elements'
import Header from '../components/Header'
import BottomButton from '../components/BottomButton'
import { connect } from 'react-redux';
import {
    continueRegisterAdmin,
    sundayHourStart,
    sundayHourEnd,
    registerAdminUser,
} from '../actions'
import { sanFranciscoWeights } from 'react-native-typography';


class RegisterSaturdayHoursScreen extends Component {

    onRegisterButtonPress() {
        const {
            name,
            email,
            companyName,
            phone,
            password,
            passwordConfirmation,
            startHour,
            endHour,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
            state,
            city,
            streetName,
            number,
            additionalInfo,
            cep,
            serviceAtHome,
            saturdayHourStartSelected,
            saturdayHourEndSelected,
            sundayHourStartSelected,
            sundayHourEndSelected,
        } = this.props

        if (sundayHourStartSelected && sundayHourEndSelected) {
            const start = parseFloat(sundayHourStartSelected.substr(0, 2))
            const end = parseFloat(sundayHourEndSelected.substr(0, 2))
            if (sundayHourStartSelected === sundayHourEndSelected || start > end) {
                return alert('Horário de funcionamento não válido, horário de fechamento deve ser maior que o horário de abertura do empreendimento')
            }
        }

        const userInfo = {
            name,
            email,
            companyName,
            phone,
            password,
            passwordConfirmation,
            startHour,
            endHour,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
            state,
            city,
            streetName,
            number,
            additionalInfo,
            cep,
            serviceAtHome,
            saturdayHourStartSelected,
            saturdayHourEndSelected,
            sundayHourStartSelected,
            sundayHourEndSelected,
        }
        this.props.registerAdminUser(userInfo)
        this.props.navigation.navigate('picForm')
    }

    renderContent() {
        return (

            <KeyboardAvoidingView
                style={styles.mainView}
                behavior="padding"
            >
                <Header headerText='Horário de Domingo' icon='leftcircleo' />
                <View>
                    <FormLabel
                        labelStyle={sanFranciscoWeights.light}
                    >
                        ABRE ÀS
                    </FormLabel>

                    <Picker
                        selectedValue={this.props.sundayHourStartSelected}
                        onValueChange={hour => this.props.sundayHourStart(hour)}
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
                        selectedValue={this.props.sundayHourEndSelected}
                        onValueChange={hour => this.props.sundayHourEnd(hour)}
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
    }
}

const mapStateToProps = ({ registerAdmin }) => {
    const {
        name,
        email,
        companyName,
        phone,
        password,
        passwordConfirmation,
        user,
        loading,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        startHour,
        endHour,
        saturdayHourStartSelected,
        saturdayHourEndSelected,
        sundayHourStartSelected,
        sundayHourEndSelected,
        state,
        city,
        streetName,
        number,
        additionalInfo,
        cep,
        serviceAtHome,
    } = registerAdmin;
    return {
        name,
        email,
        companyName,
        phone,
        password,
        passwordConfirmation,
        user,
        loading,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        startHour,
        endHour,
        saturdayHourStartSelected,
        saturdayHourEndSelected,
        sundayHourStartSelected,
        sundayHourEndSelected,
        state,
        city,
        streetName,
        number,
        additionalInfo,
        cep,
        serviceAtHome,
    }
}

export default connect(mapStateToProps, {
    continueRegisterAdmin,
    sundayHourStart,
    sundayHourEnd,
    registerAdminUser,
})(RegisterSaturdayHoursScreen);