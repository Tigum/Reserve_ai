import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { showCurrentEmployees } from '../actions'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
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
        return (
            <ScrollView>
                <EmployeeList
                    data={this.props.employees}
                />
                <BottomButton 
                    buttonText='Novo funcionário'
                    buttonAction={() => this.props.navigation.navigate('addEmployee')}
                />
            </ScrollView>

        )
    }
}

const mapStateToProps = ({ servicesAdmin }) => {
    const { employees } = servicesAdmin
    return { employees }
}

export default connect(mapStateToProps, { showCurrentEmployees })(SelectEmployeesScreen);