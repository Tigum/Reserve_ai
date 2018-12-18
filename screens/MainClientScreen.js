import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import SearchBarHeader from '../components/SearchBarHeader'
import { loadAvailableBusinesses } from '../actions'
import BusinessList from '../components/BusinessList'
import { Spinner } from '../components/Spinner'


class MainClientScreen extends Component {
    state = {
        isMounted: false
    }

    componentDidMount() {
        this.setState({ isMounted: true }, async () => {
            const { currentUser } = await firebase.auth()
            if (currentUser) {
                this.props.loadAvailableBusinesses()
            }
        })
    }

    componentWillUnmount() {
        this.setState({ isMounted: false })
    }

    render() {
        if (this.props.loading || !this.state.isMounted) {
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

export default connect(mapStateToProps, { loadAvailableBusinesses })(MainClientScreen);