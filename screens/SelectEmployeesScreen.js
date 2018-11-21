import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, ScrollView, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { showCurrentEmployees, clearEmployeeForm } from '../actions'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { sanFranciscoWeights } from 'react-native-typography';
import EmployeeList from '../components/EmployeeList'
import BottomButton from '../components/BottomButton';

class SelectEmployeesScreen extends Component {

    componentWillMount() {
        this.props.showCurrentEmployees()
    }

    static navigationOptions = ({ navigation }) => {

        const { navigate } = navigation

        return {
            headerTitle: 'Selecione funcionários',
            headerLeft: (
                <TouchableWithoutFeedback onPress={() => navigate('mainAdminScreen')}>
                    <View style={{ paddingLeft: 10 }}>
                        <AntDesign name="close" size={25} color="#3577e6" />
                    </View>
                </TouchableWithoutFeedback>
            ),
            headerRight: (
                <TouchableWithoutFeedback>
                    <View style={{ paddingRight: 10 }}>
                        <MaterialIcons name="done" size={25} color="#3577e6" />
                    </View>
                </TouchableWithoutFeedback>
            ),
        }

    };

    addEmployee() {
        this.props.navigation.navigate('addEmployee')
    }

    render() {
        console.log('employeesSelected', this.props.employeesSelected)
        if (this.props.loading) {
            return (
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, paddingTop: 40, backgroundColor: 'white'}}>
                    <ActivityIndicator />
                    <Text style={[sanFranciscoWeights.thin, {fontSize: 10, paddingTop: 10}]}>CARREGANDO FUNCIONÁRIOS...</Text>
                </View>
            )
        }

        return (
            <ScrollView>
                <EmployeeList
                    data={this.props.employees}
                    routeName='addEmployee'
                    iconsTypeUnselected={<AntDesign name="checkcircleo" size={25} color="grey" />}
                    iconsTypeSelected={<AntDesign name="checkcircle" size={25} color="blue" />}
                />
                <BottomButton
                    buttonText='Novo funcionário'
                    buttonAction={() => {
                        this.props.clearEmployeeForm()
                        this.props.navigation.navigate('addEmployee')
                    }}
                />
            </ScrollView>

        )
    }
}

const mapStateToProps = ({ servicesAdmin }) => {
    const {
        employees,
        loading,
        serviceName,
        serviceDescription,
        servicePrice,
        serviceDuration,
        employeeId,
        employeesSelected
    } = servicesAdmin
    return {
        employees,
        loading,
        serviceName,
        serviceDescription,
        servicePrice,
        serviceDuration,
        employeeId,
        employeesSelected,
    }
}

export default connect(mapStateToProps, { showCurrentEmployees, clearEmployeeForm })(SelectEmployeesScreen);