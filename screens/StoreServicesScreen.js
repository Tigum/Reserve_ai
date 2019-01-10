import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image, Dimensions, ScrollView } from 'react-native';
import Header from '../components/Header'
import { iOSUIKit, sanFranciscoWeights } from 'react-native-typography';
import { connect } from 'react-redux'
import { EvilIcons } from '@expo/vector-icons';
import { Division } from '../components/Division'
import StoreServicesList from '../components/StoreServicesList'
import _ from 'lodash'
import { loadSelecetedStoreServices } from '../actions'

const IMAGE_WIDTH_AND_HEIGHT = Dimensions.get('window').width * 0.3

class StoreServicesScreen extends Component {
    state = {
        imageLoading: true
    }

    componentDidMount() {
        this.loadServices()
    }

    endLoadingImage() {
        this.setState({ imageLoading: false })
    }

    loadImage() {
        const { imageUrl } = this.props.selectedStore
        return <Image style={styles.image}
            source={this.state.imageLoading ? require('../img/loading.gif') : { uri: imageUrl }}
            onLoadEnd={this.endLoadingImage.bind(this)}
        />
    }

    loadServices() {
        const { storeId } = this.props.selectedStore
        this.props.loadSelecetedStoreServices(storeId)
    }

    render() {
        const { loading, selectedStore } = this.props
        if (loading) {
            return (
                <View>
                    <Header headerText={'Carregando...'} goBack />
                    <ActivityIndicator />
                </View>

            )
        }

        const { companyName, areasSelected, streetName, number, state, city} = this.props.selectedStore
        const { storeServices } = this.props

        return (
            <View style={styles.mainView}>
                <Header headerText={companyName} goBack />
                <View style={styles.viewStoreInfo}>
                    <View style={styles.imageView}>
                        {this.loadImage()}
                    </View>
                    <View style={styles.titleView}>
                        <Text style={[iOSUIKit.largeTitleEmphasized]}>{companyName}</Text>
                        <Text style={[styles.subtitle, sanFranciscoWeights.light]}>{(_.values(areasSelected)).join(', ')}</Text>
                        <Text style={[styles.hours, sanFranciscoWeights.light]}>Ver horários de funcionamento</Text>
                        <View style={styles.addressView}>
                            <Text style={[styles.subtitle, sanFranciscoWeights.light]}>
                                <EvilIcons name='location' size={21} color="grey" />
                                {streetName}, {number}
                            </Text>
                            <Text style={[styles.subtitle, sanFranciscoWeights.light]}>
                                {'     ' + city}, {state}
                            </Text>
                        </View>
                    </View>
                </View>
                <Division />
                <View style={styles.serviceTitleView}>
                    <Text style={[iOSUIKit.title3Emphasized]}>Serviços disponíveis</Text>
                </View>
                    <ScrollView>
                        <StoreServicesList data={storeServices}/>
                    </ScrollView>
            </View>
        )
    }
}

const styles = {
    mainView: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: 'white'
    },
    viewStoreInfo: {
        flexDirection: 'row',
    },
    image: {
        width: IMAGE_WIDTH_AND_HEIGHT,
        height: IMAGE_WIDTH_AND_HEIGHT,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#e8e8e8'
    },
    imageView: {
        paddingTop: 30,
        paddingRight: 30,
        paddingLeft: 30
    },
    titleView: {
        paddingTop: 25,
        paddingRight: 10,
        marginLeft: -10,
        flexDirection: 'column',
        width: '80%',
        flexWrap: 'wrap',
        flex: 1
    },
    subtitle: {
        color: 'grey',
        fontSize: 16,
        alignItems: 'center',
    },
    hours: {
        color: '#5099e8',
        fontSize: 16,
        alignItems: 'center',
        textDecorationLine: 'underline',
        paddingTop: 3
    },
    addressView: {
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flex: 1,
    },
    serviceTitleView: {
        paddingLeft: 15,
        marginTop: -10,
        paddingBottom: 15
    }
}

const mapStateToProps = ({ servicesClient }) => {
    const { selectedStore, loading, storeServices } = servicesClient
    return { selectedStore, loading, storeServices }

}
export default connect(mapStateToProps, {loadSelecetedStoreServices})(StoreServicesScreen)