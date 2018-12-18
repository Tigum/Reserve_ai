import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { iOSUIKit, sanFranciscoWeights } from 'react-native-typography'

class BusinessItem extends Component {
    state = {
        imageLoading: true
    }

    endLoadingImage() {
        // console.log('OII', e)
        this.setState({imageLoading: false})
    }

    loadImage() {
        return <Image style={styles.image} 
                source={this.state.imageLoading ? require('../img/loading.gif') : { uri: this.props.business.imageUrl }} 
                onLoadEnd={this.endLoadingImage.bind(this)}
            />
    }
    render() {
        const { business } = this.props
        return (
            <View style={styles.mainView}>
                <View>
                    {this.loadImage()}
                    
                </View>
                <View style={styles.textView}>
                    <Text style={[iOSUIKit.largeTitleEmphasized, styles.title]}>{business.companyName}</Text>
                    <Text style={[sanFranciscoWeights.thin, styles.cityAndState]}>{business.city} - {business.state}</Text>
                </View>
            </View>
        )
    }
}

const styles = {
    mainView: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'white', 
        padding: 15
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10
    },
    title: {
        fontSize: 20
    },
    cityAndState: {
        fontSize: 15
    },
    textView: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        flex: 1,
        paddingLeft: 10
    }
}

export default BusinessItem