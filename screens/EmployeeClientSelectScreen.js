import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../components/Header'
import { connect } from 'react-redux'
import EmployeeClientList from '../components/EmployeeClientList'
import _ from 'lodash'

class EmployeeClientSelectScreen extends Component {
    render() {
        const { employeesSelected } = this.props.selectedService
        return (
            <View style={styles.mainView}>
                <Header headerText='Escolha um funcionário' goBack />
                <EmployeeClientList data={_.values(employeesSelected)}/>
            </View>
        )
    }
}

const styles = {
    mainView: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'white'
    }
}

const mapStateToProps = ({ servicesClient }) => {
    const { selectedService } = servicesClient
    return { selectedService }
}

export default connect(mapStateToProps, {})(EmployeeClientSelectScreen);