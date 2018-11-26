import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Card, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { HEADER_BACKGROUND_COLOR, HEADER_TEXT_COLOR, HEADER_TEXT_FONT_WEIGHT } from '../app_styles'

class MainAdminScreen extends Component {

    componentWillReceiveProps(nextProps) {
        if(this.props.user !== nextProps.user) {
            this.props.navigation.setParams({ props: nextProps })
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { navigate } = navigation
        return {
            headerTitle: 'Hoje',
            headerRight: (
                <TouchableWithoutFeedback onPress={() => navigate('servicesAdmin')}>
                    <View style={{ paddingRight: 10 }}>
                        <AntDesign name="carryout" size={25} color="white" />
                    </View>
                </TouchableWithoutFeedback>
            ),
            headerStyle: {
                backgroundColor: HEADER_BACKGROUND_COLOR,
            },
            headerTintColor: HEADER_TEXT_COLOR,
            headerTitleStyle: {
                fontWeight: HEADER_TEXT_FONT_WEIGHT
            },
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

const mapStateToProps = ({ auth }) => {
    const { user } = auth
    return { user }
}

export default connect(mapStateToProps, {})(MainAdminScreen);