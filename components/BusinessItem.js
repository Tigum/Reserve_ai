import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { iOSUIKit, sanFranciscoWeights } from 'react-native-typography'

class BusinessItem extends Component {
    state = {
        imageLoading: true
    }

    endLoadingImage() {
        this.setState({imageLoading: false})
    }

    loadAreas() {
        const { areasSelected } = this.props.business
        return areasSelected.join(', ')
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
                    <Text style={[sanFranciscoWeights.thin, styles.areas]}>{this.loadAreas()}</Text>
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
        padding: 15,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10
    },
    title: {
        fontSize: 22,
        marginTop: -8,
    },
    cityAndState: {
        fontSize: 12,
        padding: 2,
        marginTop: -8
    },
    areas: {
        fontSize: 17,
        padding: 2
    },
    textView: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        flex: 1,
        paddingLeft: 10
    }
}

export default BusinessItem