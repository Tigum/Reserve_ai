import React, { Component } from 'react';
import { View, TextInput, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { sanFranciscoWeights } from 'react-native-typography';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { searchTextOutput } from '../actions'

const SCREEN_WIDTH = Dimensions.get('window').width

class SearchInput extends Component {

    inputText(text) {
        this.props.searchTextOutput(text)
    }

    render() {
        const { iconAction, autoFocusSearch, searchText } = this.props
        console.log('searchText', searchText)
        return (
            <View style={styles.mainView}>
                <View style={styles.textInputView}>
                    <TextInput
                        style={[sanFranciscoWeights.thin, styles.text]}
                        placeholder='Pesquise por loja ou cidade...'
                        placeholderTextColor='black'
                        autoFocus={autoFocusSearch}
                        onChangeText={this.inputText.bind(this)}
                        value={this.props.searchText}
                    />
                </View>
                <TouchableWithoutFeedback onPress={iconAction}>
                    <AntDesign style={styles.closeIconStyle} name='close' size={25} color="black" />
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = {
    mainView: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        position: 'fixed',
        top: 0,
        height: 80,
        width: SCREEN_WIDTH,
        justifyContent: 'space-between'
    },
    closeIconStyle: {
        marginTop: 38,
        paddingRight: 15
    },
    textInputView: {
        maxWidth: '80%',
        marginLeft: 15,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 20
    },
    text: {
        fontSize: 25,
        color: 'black',
    }
}

const mapStateToProps = ({ servicesClient }) => {
    const { autoFocusSearch, searchText } = servicesClient
    return { autoFocusSearch, searchText }
}

export default connect(mapStateToProps, { searchTextOutput })(SearchInput);