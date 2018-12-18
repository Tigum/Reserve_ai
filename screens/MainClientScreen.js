import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import SearchBarHeader from '../components/SearchBarHeader'
import { loadAvailableBusinesses, authLoadingOffExport } from '../actions'
import BusinessList from '../components/BusinessList'
import { Spinner } from '../components/Spinner'


class MainClientScreen extends Component {

    state = {
        userLoaded: false
    }

    componentWillMount() {
        this.props.authLoadingOffExport()
    }

    componentDidMount() {
        this.props.loadAvailableBusinesses()

    }

    render() {
        console.log('clientProps', this.props)
        if (this.props.loading) {
            return <Spinner fontSize={11} text='PROCURANDO SERVIÇOS DISPONÍVEIS...' />
        }

        return (
            <View style={styles.mainView}>
                <SearchBarHeader icon='search1' />
                <ScrollView>
                    <BusinessList data={this.props.businesses} />
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
    const { businesses, loading } = servicesClient
    const { user } = auth
    return { businesses, user, loading }
}

export default connect(mapStateToProps, { loadAvailableBusinesses, authLoadingOffExport })(MainClientScreen);