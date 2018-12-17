import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class BusinessItem extends Component {
    render() {
        const { business } = this.props
        return (
            <View style={styles.mainView}>
                <View>
                    <Image style={styles.image} source={{ uri: business.imageUrl }} />
                </View>
                <View>
                    <Text>{business.companyName}</Text>
                </View>
            </View>
        )
    }
}

const styles = {
    mainView: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'grey'
    },
    image: {
        width: 60,
        height: 60
    }
}

export default BusinessItem