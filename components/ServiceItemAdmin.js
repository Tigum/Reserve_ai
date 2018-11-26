import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import firebase from 'firebase'
import { View, Text } from 'react-native';
import { sanFranciscoWeights } from 'react-native-typography';
import { findEmployeesNamesById } from '../actions'

class ServiceItemAdmin extends Component {
    state = {
        employees: ''
    }

    async componentWillMount() {
        const { currentUser } = await firebase.auth()
        await this.props.service.employeesSelected.map(async (item) => {
            try {
                await firebase.database().ref(`/users/${currentUser.uid}/employees/${item}`)
                    .on('value', async snapshot => {
                        const employee = await snapshot.val()
                        if (!employee) {
                            this.setState({ employees: [...this.state.employees, 'Você'] })
                        } else {
                            this.setState({ employees: [...this.state.employees, employee.name] })
                        }
                    })
            } catch (err) {
                console.log(err)
            }
        })
    }

    render() {
        return (
            <View style={styles.itemOutterView}>
                <View style={styles.itemInnerView}>
                    <Text style={[sanFranciscoWeights.light, styles.itemTitle]}>{this.props.service.serviceName}</Text>
                    <Text style={[sanFranciscoWeights.thin, styles.itemDescription]}>{this.props.service.serviceDescription}</Text>
                    <Text style={[sanFranciscoWeights.thin, styles.itemAdditionalInfo]}>Duração:{this.props.service.serviceDuration} min</Text>
                    <Text style={[sanFranciscoWeights.thin, styles.itemAdditionalInfo]}>Preço: R${this.props.service.servicePrice}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.circle} /><Text style={[sanFranciscoWeights.thin, styles.activation]}> Ativado</Text>
                    </View>
                    <Text>{this.state.employees}</Text>
                </View>
            </View>
        )
    }
}

const styles = {
    itemOutterView: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 8
    },
    itemInnerView: {
        margin: 15
    },
    itemTitle: {
        fontSize: 20,
    },
    itemDescription: {
        fontSize: 17,
        paddingBottom: 7
    },
    itemAdditionalInfo: {
        fontSize: 13
    },
    itemBadge: {
        fontSize: 13,
        color: 'green'
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        backgroundColor: 'green',
        marginTop: 3
    },
    activation: {
        color: 'green',
    }
}

const mapStateToProps = ({ servicesAdmin }) => {
    const { employeesByJob } = servicesAdmin;
    return { employeesByJob }
}

export default connect(mapStateToProps, { findEmployeesNamesById })(ServiceItemAdmin)