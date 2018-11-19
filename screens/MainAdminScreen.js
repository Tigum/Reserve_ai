import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Card, ListItem, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { getAdminUserInfo } from '../actions'

class MainAdminScreen extends Component {

    componentWillMount() {
        this.props.getAdminUserInfo()
    }


    static navigationOptions = ({ navigation }) => {
        const { navigate } = navigation

        return {
            headerTitle: 'Hoje',
            headerRight: (
                <TouchableWithoutFeedback onPress={() => navigate('servicesAdmin')}>
                    <View style={{ paddingRight: 10 }}>
                        <AntDesign name="carryout" size={25} color="#3577e6" />
                    </View>
                </TouchableWithoutFeedback>
            ),
        }

    };


    render() {
        return (
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
        )
    }
}

const styles = {
    addIcon: {
        paddingRight: 10
    }
}

const mapStateToProps = ({ mainAdmin }) => {
    const { user } = mainAdmin
    return { user }
}

export default connect(mapStateToProps, { getAdminUserInfo })(MainAdminScreen);