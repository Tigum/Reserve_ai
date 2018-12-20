import React, { Component } from 'react';
import { View, TextInput, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { sanFranciscoWeights } from 'react-native-typography';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';

const SCREEN_WIDTH = Dimensions.get('window').width

class SearchInput extends Component {

    render() {
        const { iconAction, autoFocusSearch } = this.props
        console.log('autoFocusSearch', autoFocusSearch)
        return (
            <View style={styles.mainView}>
                <View style={styles.textInputView}>
                    <TextInput
                        style={[sanFranciscoWeights.thin, styles.text]}
                        placeholder='Pesquise por loja, cidade, ou setor...'
                        placeholderTextColor='black'
                        autoFocus={autoFocusSearch}
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
    const { autoFocusSearch } = servicesClient
    return{ autoFocusSearch }
}

export default connect(mapStateToProps, {})(SearchInput);