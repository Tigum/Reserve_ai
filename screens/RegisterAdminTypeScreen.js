import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Header from '../components/Header'
import BottomButton from '../components/BottomButton'
import { connect } from 'react-redux';
import {
    
} from '../actions'
import { Spinner } from '../components/Spinner'
import adminTypes from '../admin_types.json'
import List from '../components/List'


class RegisterAdminTypeScreen extends Component {

    onRegisterButtonPress() {
        if(this.props.areasSelected.length === 0) {
            return alert('É necessário escolher ao menos uma área de atuação')
        }
        this.props.navigation.navigate('adminForm')
    }

    renderContent() {
        if (this.props.loading) {
            return <Spinner text='Criando conta...' />
        }
        return (

            <View style={styles.mainView}>
                <Header headerText='Áreas de atuação' icon='leftcircleo' />
                <ScrollView>
                    <List data={adminTypes.types} />
                </ScrollView>
                <BottomButton
                    buttonText='Continuar'
                    buttonAction={this.onRegisterButtonPress.bind(this)}
                />
            </View>
        )
    }

    render() {
        return this.renderContent()
    }
}

const styles = {
    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    registerButton: {
        paddingTop: 35,
        paddingBottom: 35
    },
}

const mapStateToProps = ({ registerAdmin }) => {
    const {
        areasSelected
    } = registerAdmin;
    return {
        areasSelected
    }
}

export default connect(mapStateToProps, {
    
})(RegisterAdminTypeScreen);