import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header'
import { connect } from 'react-redux'
import moment from 'moment'
import ScheduleList from '../components/ScheduleList'
import { loadAvailableScheduleToClient } from '../actions'
import { iOSUIKit } from 'react-native-typography'

class ClientCalendarScreen extends Component {
    componentDidMount() {
        const { selectedDate, selectedEmployee, selectedService } = this.props
        const { storeId } = this.props.selectedStore
        this.props.loadAvailableScheduleToClient(storeId, selectedService, selectedDate, selectedEmployee)
    }

    render() {
        const { selectedDate, availableSchedules } = this.props
        return (
            <View style={styles.mainView}>
                <Header headerText={moment(selectedDate).locale('pt').format('ll')} goBack />
                <View style={styles.subtitleView}>
                    <Text style={iOSUIKit.title3Emphasized}>
                        Horários disponíveis
                    </Text>
                </View>
                <ScheduleList data={availableSchedules}/>
            </View>
        )
    }
}

const styles = {
    mainView: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'white'
    },
    subtitleView: {
        padding: 20,
        alignItems: 'center'
    }
}

const mapStateToProps = ({ servicesClient }) => {
    const { selectedDate, availableSchedules, selectedStore, selectedEmployee, selectedService} = servicesClient
    return { selectedDate, availableSchedules, selectedStore, selectedEmployee, selectedService }
}

export default connect(mapStateToProps, {loadAvailableScheduleToClient})(ClientCalendarScreen)