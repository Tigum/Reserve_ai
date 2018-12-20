import React, { Component } from 'react'
import { View, Dimensions } from 'react-native';
import SearchInput from '../components/SearchInput'

const SCREEN_WIDTH = Dimensions.get('window').width

class SearchScreen extends Component {
    render() {
        return (
            <View style={styles.mainView}>
                <SearchInput iconAction={() => this.props.navigation.goBack()}/>
            </View>
        )
    }
}

const styles= {
    mainView: {
        width: SCREEN_WIDTH,
        // flexDirection: 'column',
        // flex: 1,
        backgroundColor: 'white'
    }
}

export default SearchScreen