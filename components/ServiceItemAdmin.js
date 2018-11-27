import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import firebase from 'firebase'
import { Divider, Avatar } from 'react-native-elements'
import { View, Text } from 'react-native';
import { sanFranciscoWeights } from 'react-native-typography';
import { findEmployeesNamesById } from '../actions'

class ServiceItemAdmin extends Component {
    state = {
        employeesNames: [],
        employeesPics: []
    }

    async componentWillMount() {
        const { currentUser } = await firebase.auth()
        await this.props.service.employeesSelected.map(async (item) => {
            try {
                await firebase.database().ref(`/users/${currentUser.uid}/employees/${item}`)
                    .on('value', async snapshot => {
                        const employee = await snapshot.val()
                        if (!employee) {
                            let imageUrl
                            await firebase.database().ref(`/users/${currentUser.uid}/imageUrl`).once('value', function (snapshot) {
                                imageUrl = snapshot.val()
                            })
                            const employeeToAdd = {
                                name: 'Você',
                                imageUrl
                            }
                            this.setState({ employeesNames: [...this.state.employeesNames, employeeToAdd.name] })
                            this.setState({ employeesPics: [...this.state.employeesPics, employeeToAdd.imageUrl] })
                        } else {
                            const employeeToAdd = {
                                name: employee.name,
                                imageUrl: employee.imageUrl
                            }
                            this.setState({ employeesNames: [...this.state.employeesNames, employeeToAdd.name] })
                            this.setState({ employeesPics: [...this.state.employeesPics, employeeToAdd.imageUrl] })
                        }
                    })
            } catch (err) {
                console.log(err)
            }
        })
    }

    renderEmployeeNameList() {
        const INITIAL_MARGIN = 45
        const ADDITIONAL_MARGIN = 10
        if (this.state.employeesNames) {
            if (this.state.employeesPics) {
                const pics = this.state.employeesPics
                if (pics.length === 2) return <Text style={[sanFranciscoWeights.thin, styles.namesStyles, { marginLeft: INITIAL_MARGIN + ADDITIONAL_MARGIN }]}>{this.state.employeesNames.join(', ')}</Text>
                if (pics.length === 3) return <Text style={[sanFranciscoWeights.thin, styles.namesStyles, { marginLeft: INITIAL_MARGIN + (ADDITIONAL_MARGIN * 2) }]}>{this.state.employeesNames.join(', ')}</Text>
                if (pics.length === 4) return <Text style={[sanFranciscoWeights.thin, styles.namesStyles, { marginLeft: INITIAL_MARGIN + (ADDITIONAL_MARGIN * 3) }]}>{this.state.employeesNames.join(', ')}</Text>
                if (pics.length === 5) return <Text style={[sanFranciscoWeights.thin, styles.namesStyles, { marginLeft: INITIAL_MARGIN + (ADDITIONAL_MARGIN * 4) }]}>{this.state.employeesNames.join(', ')}</Text>
                return <Text style={[sanFranciscoWeights.thin, styles.namesStyles, { marginLeft: INITIAL_MARGIN }]}>{this.state.employeesNames.join(', ')}</Text>
            }

        }
    }

    renderEmployeePicList() {
        if (this.state.employeesPics) {
            const data = this.state.employeesPics
            return (
                data.map((item, i) => (
                    <Avatar
                        key={item}
                        small
                        rounded
                        source={{ uri: item }}
                        onPress={() => console.log("Works!", i)}
                        activeOpacity={0.7}
                        containerStyle={[styles.avatars, { marginLeft: i * 10}]}
                    />
                ))

            )
        }
    }

    render() {

        return (
            <View style={styles.itemOutterView}>
                <View style={styles.itemInnerView}>
                    <Text style={[sanFranciscoWeights.light, styles.itemTitle]}>{this.props.service.serviceName}</Text>
                    <Text style={[sanFranciscoWeights.thin, styles.itemDescription]}>{this.props.service.serviceDescription}</Text>
                    <Text style={[sanFranciscoWeights.thin, styles.itemAdditionalInfo]}>Duração:{this.props.service.serviceDuration} min</Text>
                    <Text style={[sanFranciscoWeights.thin, styles.itemAdditionalInfo]}>Preço: R${this.props.service.servicePrice}</Text>
                    <Divider style={styles.divider} />
                    <View style={{ flexDirection: 'row' }}>

                        <View style={styles.circle} /><Text style={[sanFranciscoWeights.thin, styles.activation]}> Ativado</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {this.renderEmployeePicList()}
                        {this.renderEmployeeNameList()}
                    </View>

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
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#dcdcdc'
    },
    namesStyles: {
        marginTop: 20,
        marginBottom: 15,
        color: '#a0a0a0'
    },
    avatars: {
        position: 'absolute',
        marginTop: 10,
        borderStyle: 'solid',
        borderColor: 'white',
        borderLeftWidth: 5,
        borderTopWidth: 9,
        borderBottomWidth: 9,
        borderRadius: '90%'
    }
}

const mapStateToProps = ({ servicesAdmin }) => {
    const { employeesByJob } = servicesAdmin;
    return { employeesByJob }
}

export default connect(mapStateToProps, { findEmployeesNamesById })(ServiceItemAdmin)