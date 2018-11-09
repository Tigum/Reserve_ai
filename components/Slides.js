import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { facebookLogout } from '../actions'
import { withNavigation } from 'react-navigation';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    onFacebookLogOut() {
        this.props.facebookLogout()
            .then(() => this.props.navigation.navigate('auth'))
    }

    renderSlides() {
        return this.props.data.map((slide) => {
            return (
                <View key={slide.text} style={[styles.slideStyle, { backgroundColor: slide.color }]}>
                    <Text style={styles.slideText}>{slide.text}</Text>
                    <Button 
                        onPress={this.onFacebookLogOut.bind(this)}
                        title='LOG OUT FACEBOOK'
                    />
                </View>
            )
        })
    }
    render() {
        return (
            <ScrollView
                horizontal
                style={{ flex: 1 }}
                pagingEnabled
            >
                {this.renderSlides()}
            </ScrollView>
        )
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    slideText: {
        fontSize: 30,
        color: 'white'
    },

}

const mapStateToProps = ({ auth }) => {
    const { routeName, user } = auth;
    return {
        routeName,
        user
    }
}

export default connect(mapStateToProps, { facebookLogout })(withNavigation(Slides));