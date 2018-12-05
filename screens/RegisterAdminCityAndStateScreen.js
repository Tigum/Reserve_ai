import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Picker } from 'react-native';
import _ from 'lodash';
import { FormLabel } from 'react-native-elements'
import Header from '../components/Header'
import BottomButton from '../components/BottomButton'
import { connect } from 'react-redux';
import {
    loadStates,
    selectState,
    loadCities,
    selectCity
} from '../actions'
import { sanFranciscoWeights } from 'react-native-typography';


class RegisterAdminCityAndStasteScreen extends Component {

    componentWillMount() {
        this.props.loadStates()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.state !== nextProps.state) {
            this.props.loadCities(nextProps.state)
        }
    }

    onRegisterButtonPress() {
        const { state, city } = this.props
        if(!state) return alert('Favor selecionar seu estado')
        if(!city) return alert('Favor selecionar sua cidade')
        this.props.navigation.navigate('addressForm')
    }

    onLoadStates() {
        return (
            this.props.states.map((item) => (
                <Picker.Item
                    key={item}
                    type={String}
                    label={item}
                    value={item}
                />
            ))
        )
    }

    onLoadCities() {
        const list = this.props.cities[0]
        if (list) {
            return (
                list.map((item) => (
                    <Picker.Item
                        key={item}
                        type={String}
                        label={item}
                        value={item}
                    />
                ))
            )
        }
    }

    renderContent() {
        console.log('cities2', this.props.cities)
        return (

            <KeyboardAvoidingView
                style={styles.mainView}
                behavior="padding"
            >
                <Header headerText='Estado e cidade' icon='leftcircleo' />
                <View>
                    <FormLabel
                        labelStyle={sanFranciscoWeights.light}
                    >
                        ESTADO
                    </FormLabel>

                    <Picker
                        selectedValue={this.props.state}
                        onValueChange={state => this.props.selectState(state)}
                    >
                        <Picker.Item label='Selecione o estado' value={null} />
                        {this.onLoadStates()}
                    </Picker>

                    <FormLabel
                        labelStyle={sanFranciscoWeights.light}
                    >
                        CIDADE
                    </FormLabel>

                    <Picker
                        selectedValue={this.props.city}
                        onValueChange={city => this.props.selectCity(city)}
                    >
                        <Picker.Item label='Selecione a cidade' value={null} />
                        {this.onLoadCities()}
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
    const { state, states, city, cities } = registerAdmin;
    return {
        state, states, city, cities
    }
}

export default connect(mapStateToProps, {
    loadStates,
    selectState,
    loadCities,
    selectCity
})(RegisterAdminCityAndStasteScreen);