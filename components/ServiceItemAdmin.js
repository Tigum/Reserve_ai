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
        employeesPics: [],
    }

    async componentWillMount() {
        this.mounted = true;
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
                            this.setState({
                                employeesNames: [...this.state.employeesNames, employeeToAdd.name],
                                employeesPics: [...this.state.employeesPics, employeeToAdd.imageUrl],
                            })

                        } else {
                            const employeeToAdd = {
                                name: employee.name,
                                imageUrl: employee.imageUrl
                            }
                            this.setState({
                                employeesNames: [...this.state.employeesNames, employeeToAdd.name],
                                employeesPics: [...this.state.employeesPics, employeeToAdd.imageUrl],
                            })
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
            let data = this.state.employeesNames.join(', ')

            if (this.state.employeesNames.length > 5) {
                data = this.state.employeesNames.slice(0, 5).join(', ') + ' + ' + (this.state.employeesNames.length - 5) + ' funcionário(s)'
            }

            if (this.state.employeesPics) {
                const names = this.state.employeesNames
                if (names.length === 2) return <Text style={[sanFranciscoWeights.thin, styles.namesStyles, { marginLeft: INITIAL_MARGIN + ADDITIONAL_MARGIN }]}>{data}</Text>
                if (names.length === 3) return <Text style={[sanFranciscoWeights.thin, styles.namesStyles, { marginLeft: INITIAL_MARGIN + (ADDITIONAL_MARGIN * 2) }]}>{data}</Text>
                if (names.length === 4) return <Text style={[sanFranciscoWeights.thin, styles.namesStyles, { marginLeft: INITIAL_MARGIN + (ADDITIONAL_MARGIN * 3) }]}>{data}</Text>
                if (names.length >= 5) return <Text style={[sanFranciscoWeights.thin, styles.namesStyles, { marginLeft: INITIAL_MARGIN + (ADDITIONAL_MARGIN * 4) }]}>{data}</Text>
                return <Text style={[sanFranciscoWeights.thin, styles.namesStyles, { marginLeft: INITIAL_MARGIN }]}>{data}</Text>
            }
        }
    }

    renderEmployeePicList() {
        if (this.state.employeesPics) {
            let data = this.state.employeesPics

            if (data.length > 5) {
                data = this.state.employeesPics.slice(0, 5)
            }
            return (
                data.map((item, i) => (
                    <Avatar
                        key={item}
                        small
                        rounded
                        source={{ uri: item }}
                        onPress={() => console.log("Works!", i)}
                        activeOpacity={0.7}
                        containerStyle={[styles.avatars, { marginLeft: i * 10 }]}
                    />
                ))

            )

        }
    }

    render() {

        return (
            <View style={styles.itemOutterView}>
                <View style={styles.itemInnerView}>

                    <View style={styles.titleView}>
                        <Text style={[sanFranciscoWeights.light, styles.itemTitle]}>{this.props.service.serviceName}</Text>
                        <View style={styles.activationView}>
                            <View style={styles.circle} /><Text style={[sanFranciscoWeights.thin, styles.activation]}> Ativado</Text>
                        </View>
                    </View>

                    <Text style={[sanFranciscoWeights.thin, styles.itemDescription]}>{this.props.service.serviceDescription}</Text>
                    <Text style={[sanFranciscoWeights.thin, styles.itemAdditionalInfo]}>Duração:{this.props.service.serviceDuration} min</Text>
                    <Text style={[sanFranciscoWeights.thin, styles.itemAdditionalInfo]}>Preço: R${this.props.service.servicePrice}</Text>
                    {/* <Divider style={styles.divider} /> */}

                    <View>
                        <Text style={[sanFranciscoWeights.thin, styles.employeeText]}>Funcionário(s) selecionado(s)</Text>
                        <View style={{ flexDirection: 'row' }}>
                            {this.renderEmployeePicList()}
                            {this.renderEmployeeNameList()}
                        </View>
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
        marginTop: 16,
        marginBottom: 15,
        color: '#a0a0a0',
    },
    avatars: {
        position: 'absolute',
        marginTop: 6,
        borderStyle: 'solid',
        borderColor: 'white',
        borderLeftWidth: 5,
        borderTopWidth: 9,
        borderBottomWidth: 9,
        borderRadius: '90%'
    },
    titleView: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },
    activationView: {
        flexDirection: 'row',
    },
    employeeText: {
        color: '#8c8c8c',
        fontSize: 13, 
        marginTop: 18
    }
}

const mapStateToProps = ({ servicesAdmin }) => {
    const { } = servicesAdmin;
    return {}
}

export default connect(mapStateToProps, { findEmployeesNamesById })(ServiceItemAdmin)