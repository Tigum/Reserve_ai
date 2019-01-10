import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { iOSUIKit, sanFranciscoWeights } from 'react-native-typography';
import { connect } from 'react-redux'
import { selectService } from '../actions'

class StoreServicesItem extends Component {
    render() {
        const { serviceName, servicePrice, serviceDescription, serviceId, ownerUid } = this.props.service
        return (
            <TouchableWithoutFeedback onPress={() => this.props.selectService(ownerUid, serviceId)}>
                <View style={styles.mainView}>
                    <View style={styles.serviceDescription}>
                        <Text style={[iOSUIKit.footnoteEmphasized, styles.nameText]}>
                            {serviceName}
                        </Text>
                        <Text style={[styles.descriptionText, sanFranciscoWeights.light]}>
                            {serviceDescription}
                        </Text>
                    </View>
                    <View style={styles.price}>
                        <Text style={[iOSUIKit.footnoteEmphasized, styles.priceText]}>
                            R${servicePrice}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomStyle: 'solid',
        borderBottomWidth: 0.5,
        borderColor: '#e8e8e8',
    },
    serviceDescription: {
        padding: 15,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexWrap: 'wrap',
        flex: 1
    },
    price: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    descriptionText: {
        fontSize: 15,
        color: 'grey'
    },
    nameText: {
        fontSize: 20
    },
    priceText: {
        fontSize: 20
    }
}

export default connect(null, { selectService })(StoreServicesItem);