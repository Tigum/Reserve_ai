import React, { Component } from 'react'
import { View, Dimensions, Text } from 'react-native';
import SearchInput from '../components/SearchInput'
import { autoFocus, searchTextOutputClear, loadSearchResults } from '../actions'
import { connect } from 'react-redux';
import SearchListItem from '../components/SearchListItem'

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
                    <SearchListItem 
                        key={item.email+'city'}
                        result={item.city}
                        type='city'
                    />
                ))
            )
        } 
    }

    renderResultsNames() {
        const { searchResultNames } = this.props
        if (searchResultNames.length > 0) {
            return (
                searchResultNames.map((item) => (
                    <SearchListItem 
                        key={item.email+'name'}
                        result={item.companyName}
                        type='name'
                    />
                ))
            )
        } 
    }

    render() {
        const { searchText } = this.props
        return (
            <View style={styles.mainView}>
                <SearchInput iconAction={this.iconAction.bind(this)} textInput={searchText}/>
                {this.renderResultsNames()}
                {this.renderResultsCities()}
            </View>
        )
    }
}

const styles= {
    mainView: {
        width: SCREEN_WIDTH,
        backgroundColor: 'white',
        flexDirection: 'column',
        flex: 1
    }
}

const mapStateToProps = ({ servicesClient }) => {
    const { searchText, searchResultCities, searchResultNames } = servicesClient
    return { searchText, searchResultCities, searchResultNames }
}

export default connect(mapStateToProps, { autoFocus, searchTextOutputClear, loadSearchResults })(SearchScreen)