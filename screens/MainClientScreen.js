import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Card, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { HEADER_BACKGROUND_COLOR, HEADER_TEXT_COLOR, HEADER_TEXT_FONT_WEIGHT } from '../app_styles'
import SearchBarHeader from '../components/SearchBarHeader'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

class MainClientScreen extends Component {

    componentWillReceiveProps(nextProps) {
        if (this.props.user !== nextProps.user) {
            this.props.navigation.setParams({ props: nextProps })
        }
    }

    render() {
        return (

            <View style={styles.mainView}>
                <SearchBarHeader icon='search1'/>
                <ScrollView style={styles.scrollView}>
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

const styles = {
    mainView: {
        backgroundColor: 'white',
        flexDirection: 'column',
        flex: 1
    },
    scrollView: {
        // backgroundColor: 'white',
        // flexDirection: 'column',
        // flex: 1,
        // width: SCREEN_WIDTH,
    }
}

const mapStateToProps = ({ auth }) => {
    const { user } = auth
    return { user }
}

export default connect(mapStateToProps, {})(MainClientScreen);