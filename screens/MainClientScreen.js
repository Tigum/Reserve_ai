import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import SearchBarHeader from '../components/SearchBarHeader'
import { loadAvailableBusinesses, autoFocus } from '../actions'
import BusinessList from '../components/BusinessList'

class MainClientScreen extends Component {

    componentWillMount(){
        this.props.loadAvailableBusinesses()
    }

    iconAction() {
        this.props.autoFocus(true)
        this.props.navigation.navigate('searchScreen')
    }

    render() {
        return (
            <View style={styles.mainView}>
                <SearchBarHeader icon='search1' iconAction={this.iconAction.bind(this)}/>
                <ScrollView>
                    {this.props.loading ? <ActivityIndicator size='large' style={styles.spinner} /> : <BusinessList data={this.props.businesses} />}
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
    spinner: {
        paddingTop: 90
    }
}

const mapStateToProps = ({ servicesClient, auth }) => {
    const { businesses, loading } = servicesClient
    const { currentUser } = auth
    return { businesses, loading, currentUser }
}

export default connect(mapStateToProps, { loadAvailableBusinesses, autoFocus })(MainClientScreen);