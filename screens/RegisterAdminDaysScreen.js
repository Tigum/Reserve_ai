import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import Header from '../components/Header'
import BottomButton from '../components/BottomButton'
import { connect } from 'react-redux';
import {
    continueRegisterAdmin,
    mondaySelected,
    tuesdaySelected,
    wednesdaySelected,
    thursdaySelected,
    fridaySelected,
    saturdaySelected,
    sundaySelected,
    mondayUnselected,
    tuesdayUnselected,
    wednesdayUnselected,
    thursdayUnselected,
    fridayUnselected,
    saturdayUnselected,
    sundayUnselected,
    registerAdminUser,
    registeringOn
} from '../actions'
import { Spinner } from '../components/Spinner'
import Button from '../components/Button'

const SCREEN_WIDTH = Dimensions.get('window').width;
const BUTTONS_HEIGHT = 50
const BUTTONS_COLOR = '#9f9f9f'
const BUTTONS_COLOR_SELECTED = '#3577e6'

class RegisterAdminDaysScreen extends Component {

    state = {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    }


    onRegisterButtonPress() {
        this.props.registeringOn()
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
            areasSelected
        } = this.props

        if (!monday && !tuesday && !wednesday && !thursday && !friday && !saturday && !sunday) return alert('É obrigatório escolher um dia de funcionamento no mínimo.')

        if (saturday) {
            return this.props.navigation.navigate('saturdayForm')
        }

        if (sunday) {
            return this.props.navigation.navigate('sundayForm')
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
            saturdayHourStartSelected: null,
            saturdayHourEndSelected: null,
            sundayHourStartSelected: null,
            sundayHourEndSelected: null,
            areasSelected
        }
        this.props.registerAdminUser(userInfo)
        // this.props.navigation.navigate('picForm')
    }

    mondayColor() {
        return this.state.monday ? BUTTONS_COLOR_SELECTED : BUTTONS_COLOR
    }

    onPressMonday() {
        if (this.state.monday) {
            this.props.mondayUnselected()
            this.setState({ monday: false })
        }

        if (!this.state.monday) {
            this.props.mondaySelected()
            this.setState({ monday: true })
        }
    }

    tuesdayColor() {
        return this.state.tuesday ? BUTTONS_COLOR_SELECTED : BUTTONS_COLOR
    }

    onPressTuesday() {
        if (this.state.tuesday) {
            this.props.tuesdayUnselected()
            this.setState({ tuesday: false })
        }

        if (!this.state.tuesday) {
            this.props.tuesdaySelected()
            this.setState({ tuesday: true })
        }
    }

    wednesdayColor() {
        return this.state.wednesday ? BUTTONS_COLOR_SELECTED : BUTTONS_COLOR
    }

    onPressWednesday() {
        if (this.state.wednesday) {
            this.props.wednesdayUnselected()
            this.setState({ wednesday: false })
        }

        if (!this.state.wednesday) {
            this.props.wednesdaySelected()
            this.setState({ wednesday: true })
        }
    }

    thursdayColor() {
        return this.state.thursday ? BUTTONS_COLOR_SELECTED : BUTTONS_COLOR
    }

    onPressThursday() {
        if (this.state.thursday) {
            this.props.thursdayUnselected()
            this.setState({ thursday: false })
        }

        if (!this.state.thursday) {
            this.props.thursdaySelected()
            this.setState({ thursday: true })
        }
    }

    fridayColor() {
        return this.state.friday ? BUTTONS_COLOR_SELECTED : BUTTONS_COLOR
    }

    onPressFriday() {
        if (this.state.friday) {
            this.props.fridayUnselected()
            this.setState({ friday: false })
        }

        if (!this.state.friday) {
            this.props.fridaySelected()
            this.setState({ friday: true })
        }
    }

    saturdayColor() {
        return this.state.saturday ? BUTTONS_COLOR_SELECTED : BUTTONS_COLOR
    }

    onPressSaturday() {
        if (this.state.saturday) {
            this.props.saturdayUnselected()
            this.setState({ saturday: false })
        }

        if (!this.state.saturday) {
            this.props.saturdaySelected()
            this.setState({ saturday: true })
        }
    }

    sundayColor() {
        return this.state.sunday ? BUTTONS_COLOR_SELECTED : BUTTONS_COLOR
    }

    onPressSunday() {
        if (this.state.sunday) {
            this.props.sundayUnselected()
            this.setState({ sunday: false })
        }

        if (!this.state.sunday) {
            this.props.sundaySelected()
            this.setState({ sunday: true })
        }
    }


    renderContent() {
        if (this.props.loading) {
            return <Spinner />
        }
        return (

            <View
                style={styles.mainView}
            >
                <Header headerText='Dias de funcionamento' icon='leftcircleo' />
                <View>

                    <Button
                        buttonText='Segunda-feira'
                        buttonBackgroundColor={this.mondayColor()}
                        buttonHeight={BUTTONS_HEIGHT}
                        buttonAction={this.onPressMonday.bind(this)}
                    />
                </View>
                <View>
                    <Button
                        buttonText='Terça-feira'
                        buttonBackgroundColor={this.tuesdayColor()}
                        buttonHeight={BUTTONS_HEIGHT}
                        buttonAction={this.onPressTuesday.bind(this)}
                    />
                </View>
                <View>
                    <Button
                        buttonText='Quarta-feira'
                        buttonBackgroundColor={this.wednesdayColor()}
                        buttonHeight={BUTTONS_HEIGHT}
                        buttonAction={this.onPressWednesday.bind(this)}
                    />
                </View>
                <View>
                    <Button
                        buttonText='Quinta-feira'
                        buttonBackgroundColor={this.thursdayColor()}
                        buttonHeight={BUTTONS_HEIGHT}
                        buttonAction={this.onPressThursday.bind(this)}
                    />
                </View>
                <View>
                    <Button
                        buttonText='Sexta-feira'
                        buttonBackgroundColor={this.fridayColor()}
                        buttonHeight={BUTTONS_HEIGHT}
                        buttonAction={this.onPressFriday.bind(this)}
                    />
                </View>
                <View>
                    <Button
                        buttonText='Sábado'
                        buttonBackgroundColor={this.saturdayColor()}
                        buttonHeight={BUTTONS_HEIGHT}
                        buttonAction={this.onPressSaturday.bind(this)}
                    />
                </View>
                <View>
                    <Button
                        buttonText='Domingo'
                        buttonBackgroundColor={this.sundayColor()}
                        buttonHeight={BUTTONS_HEIGHT}
                        buttonAction={this.onPressSunday.bind(this)}
                    />
                </View>
                <BottomButton
                    buttonText='Continuar'
                    buttonAction={this.onRegisterButtonPress.bind(this)}
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
    const {
        name,
        email,
        companyName,
        phone,
        password,
        passwordConfirmation,
        user,
        loading,
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
        areasSelected
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
        areasSelected
    }
}

export default connect(mapStateToProps, {
    continueRegisterAdmin,
    mondaySelected,
    tuesdaySelected,
    wednesdaySelected,
    thursdaySelected,
    fridaySelected,
    saturdaySelected,
    sundaySelected,
    mondayUnselected,
    tuesdayUnselected,
    wednesdayUnselected,
    thursdayUnselected,
    fridayUnselected,
    saturdayUnselected,
    sundayUnselected,
    registerAdminUser,
    registeringOn
})(RegisterAdminDaysScreen);