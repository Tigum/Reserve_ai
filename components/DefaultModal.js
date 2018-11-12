import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import Header from './Header';
import BottomButton from './BottomButton';

const SCREEN_WIDTH = Dimensions.get('window').width

class DefaultModal extends Component {
    render() {
        const { title, children, dismissIcon } = this.props

        return (
            <View style={styles.mainView}>
                <Header headerText={title} icon={dismissIcon}/>
                 {children}
                 <BottomButton 
                    buttonText='Adicionar'
                    buttonAction={() => alert('Hello!')}
                 />
            </View>
        )
    }
}

const styles = {
    mainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: SCREEN_WIDTH,
        backgroundColor: '#f3f3f3'
    }
}

export default DefaultModal;