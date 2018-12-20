import React, { Component } from 'react'
import { View, Dimensions } from 'react-native';
import SearchInput from '../components/SearchInput'
import { autoFocus } from '../actions'
import { connect } from 'react-redux';

const SCREEN_WIDTH = Dimensions.get('window').width

class SearchScreen extends Component {

    iconAction() {
        this.props.autoFocus(false)
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={styles.mainView}>
                <SearchInput iconAction={this.iconAction.bind(this)}/>
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

export default connect(null, { autoFocus })(SearchScreen)