import React, { Component } from 'react';
import { View } from 'react-native';
import { Spinner } from './Spinner'

class LoadingModal extends Component {
    render() {
        const { text } = this.props

        return (
            <View style={styles.mainView}>
                <Spinner text={text} />
            </View>
        )
    }
}

const styles = {
    mainView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f3f3'
    }
}

export default LoadingModal;