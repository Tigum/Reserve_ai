import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Header from '../components/Header'
import { connect } from 'react-redux'

class StoreServicesScreen extends Component {
    render() {
        const { loading, selectedStore } = this.props
        if (loading) {
            return (
                <View>
                    <Header headerText={'Carregando...'} goBack />
                    <ActivityIndicator />
                </View>

            )
        }

        const storeName = selectedStore ? selectedStore[0].companyName : 'Store name not found'

        return (
            <View>
                <Header headerText={storeName} goBack />
                <Text>
                    PÁGINA DO ADMIN
                </Text>
            </View>
        )
    }
}

const mapStateToProps = ({ servicesClient }) => {
    const { selectedStore, loading } = servicesClient
    return { selectedStore, loading }

}
export default connect(mapStateToProps, {})(StoreServicesScreen)