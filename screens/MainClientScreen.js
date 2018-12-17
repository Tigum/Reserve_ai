import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import SearchBarHeader from '../components/SearchBarHeader'
import { loadAvailableServices } from '../actions'
import ServicesListClient from '../components/ServiceListClient'


class MainClientScreen extends Component {

    componentWillMount() {
        this.props.loadAvailableServices()
    }

    render() {
        return (
            <View style={styles.mainView}>
                <SearchBarHeader icon='search1' />
                <ScrollView>
                    <ServicesListClient data={this.props.services} />
                </ScrollView>
            </View>
        )
    }
}

const styles = {
    mainView: {
        backgroundColor: 'white',
        flexDirection: 'column',
        flex: 1
    },
}

const mapStateToProps = ({ servicesClient, auth }) => {
    const { services } = servicesClient
    const { user } = auth
    return { services, user }
}

export default connect(mapStateToProps, { loadAvailableServices })(MainClientScreen);