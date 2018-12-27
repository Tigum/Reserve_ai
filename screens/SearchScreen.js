import React, { Component } from 'react'
import { View, Dimensions, Text } from 'react-native';
import SearchInput from '../components/SearchInput'
import { autoFocus, searchTextOutputClear, loadSearchResults } from '../actions'
import { connect } from 'react-redux';

const SCREEN_WIDTH = Dimensions.get('window').width

class SearchScreen extends Component {

    iconAction() {
        this.props.autoFocus(false)
        this.props.searchTextOutputClear()
        this.props.navigation.goBack()
    }

    componentWillReceiveProps(nextProps){
        if(this.props.searchText !== nextProps.searchText){
            this.props.loadSearchResults(nextProps.searchText)
        }
    }

    renderResultsCities() {
        const { searchResultCities } = this.props
        if (searchResultCities.length > 0) {
            return (
                searchResultCities.map((item) => (
                    <Text
                        key={item.email}
                    >
                    {item.city}
                    </Text>
                ))
            )
        } 
    }

    renderResultsNames() {
        const { searchResultNames } = this.props
        if (searchResultNames.length > 0) {
            return (
                searchResultNames.map((item) => (
                    <Text
                        key={item.email}
                    >
                    {item.companyName}
                    </Text>
                ))
            )
        } 
    }

    render() {
        const { searchText } = this.props
        return (
            <View style={styles.mainView}>
                <SearchInput iconAction={this.iconAction.bind(this)} textInput={searchText}/>
                {this.renderResultsCities()}
                {this.renderResultsNames()}
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
    const { searchText, searchResultCities, searchResultNames } = servicesClient
    return { searchText, searchResultCities, searchResultNames }
}

export default connect(mapStateToProps, { autoFocus, searchTextOutputClear, loadSearchResults })(SearchScreen)