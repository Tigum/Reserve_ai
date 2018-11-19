import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { showCurrentEmployees } from '../actions'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import EmployeeList from '../components/EmployeeList'

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
                <TouchableWithoutFeedback onPress={() => navigate('addService')}>
                    <View style={{ paddingRight: 10 }}>
                        <MaterialIcons name="done" size={25} color="#3577e6" />
                    </View>
                </TouchableWithoutFeedback>
            ),
        }

    };

    render() {
        return (
            <EmployeeList 
                data={this.props.employees}
            />
        )
    }
}

const mapStateToProps = ({ servicesAdmin }) => {
    const { employees } = servicesAdmin
    return { employees }
}

export default connect(mapStateToProps, {showCurrentEmployees})(SelectEmployeesScreen);