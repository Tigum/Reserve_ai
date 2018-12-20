import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Card, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { HEADER_BACKGROUND_COLOR, HEADER_TEXT_COLOR, HEADER_TEXT_FONT_WEIGHT } from '../app_styles'
import Header from '../components/Header'
import { authLoadingOffExport, registeringOff } from '../actions'

class MainAdminScreen extends Component {

    componentWillMount(){
        this.props.registeringOff()
        this.props.authLoadingOffExport()
    }

    goToServicesScreen() {
        this.props.navigation.navigate('servicesAdmin')
    }

    render() {
        return (
            <View>
                <Header icon='carryout' headerText='Hoje' iconAction={this.goToServicesScreen.bind(this)}/>
                <ScrollView>
                    <Card
                        title='HELLO WORLD'
                        image={require('../img/logo_main.png')}>
                        <Text style={{ marginBottom: 10 }}>
                            The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                        <Button
                            icon={{ name: 'code' }}
                            backgroundColor='#03A9F4'
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='VIEW NOW' />
                    </Card>
                    <Card
                        title='HELLO WORLD'
                        image={require('../img/logo_main.png')}>
                        <Text style={{ marginBottom: 10 }}>
                            The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                        <Button
                            icon={{ name: 'code' }}
                            backgroundColor='#03A9F4'
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='VIEW NOW' />
                    </Card>
                    <Card
                        title='HELLO WORLD'
                        image={require('../img/logo_main.png')}>
                        <Text style={{ marginBottom: 10 }}>
                            The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                        <Button
                            icon={{ name: 'code' }}
                            backgroundColor='#03A9F4'
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='VIEW NOW' />
                    </Card>
                    <Card
                        title='HELLO WORLD'
                        image={require('../img/logo_main.png')}>
                        <Text style={{ marginBottom: 10 }}>
                            The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                        <Button
                            icon={{ name: 'code' }}
                            backgroundColor='#03A9F4'
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='VIEW NOW' />
                    </Card>
                    <Card
                        title='HELLO WORLD'
                        image={require('../img/logo_main.png')}>
                        <Text style={{ marginBottom: 10 }}>
                            The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                        <Button
                            icon={{ name: 'code' }}
                            backgroundColor='#03A9F4'
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='VIEW NOW' />
                    </Card>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const { user } = auth
    return { user }
}

export default connect(mapStateToProps, {authLoadingOffExport, registeringOff})(MainAdminScreen);