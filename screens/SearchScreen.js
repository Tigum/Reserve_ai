import React, { Component } from 'react'
import { View, Dimensions } from 'react-native';
import SearchInput from '../components/SearchInput'
import { autoFocus, searchTextOutputClear } from '../actions'
import { connect } from 'react-redux';

const SCREEN_WIDTH = Dimensions.get('window').width

class SearchScreen extends Component {

    iconAction() {
        this.props.autoFocus(false)
        this.props.searchTextOutputClear()
        this.props.navigation.goBack()
    }

    render() {
        const { searchText } = this.props
        return (
            <View style={styles.mainView}>
                <SearchInput iconAction={this.iconAction.bind(this)} textInput={searchText}/>
            </View>
        )
    }
}

const styles= {
    mainView: {
        width: SCREEN_WIDTH,
        backgroundColor: 'white'
    }
}

const mapStateToProps = ({ servicesClient }) => {
    const { searchText } = servicesClient
    return { searchText }
}

export default connect(mapStateToProps, { autoFocus, searchTextOutputClear })(SearchScreen)