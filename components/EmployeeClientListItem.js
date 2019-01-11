import React, { Component } from 'react';
import { iOSUIKit, sanFranciscoWeights } from 'react-native-typography';
import firebase from 'firebase'
import { connect } from 'react-redux'
import { ListItem } from 'react-native-elements';
import { selectEmployee } from '../actions'
import _ from 'lodash'

class EmployeeClientListItem extends Component {

    state = {
        employeeName: null,
        employeeImage: null,
        employeeRole: null,
        employeeId: null
    }


    async componentWillMount() {
        const { employeeId } = this.props
        const { ownerUid } = this.props.selectedService

        if (employeeId === ownerUid) {

            try {
                const Users = firebase.database().ref('/users')
                await Users.orderByKey().equalTo(employeeId).on('value', snapshot => {
                    const user = _.values(snapshot.val())[0]
                    if (user) {
                        const { name, imageUrl } = user
                        this.setState({
                            employeeName: name,
                            employeeImage: imageUrl,
                            employeeRole: 'Proprietário(a)',
                            employeeId: employeeId
                        })
                    }
                })
            } catch (err) {
                console.log(err)
                return
            }
        }

        const Employees = firebase.database().ref(`/users/${ownerUid}/employees`)

        try {
            await Employees.orderByChild('key').equalTo(employeeId).on('value', snapshot => {
                const employee = _.values(snapshot.val())[0]
                if (employee) {
                    const { name, imageUrl } = employee
                    this.setState({
                        employeeName: name,
                        employeeImage: imageUrl,
                        employeeRole: 'Funcionário(a)',
                        employeeId: employeeId
                    })
                }
            })
        } catch (err) {
            console.log(err)
            return
        }
    }

    onSelectEmployee() {
        this.props.selectEmployee({ ...this.state })
    }

    render() {
        const { employeeName, employeeImage, employeeRole } = this.state
        return (
            <ListItem
                key={employeeImage}
                avatar={employeeImage ? { uri: employeeImage } : require('../img/default-avatar.png')}
                title={employeeName}
                subtitle={employeeRole}
                containerStyle={styles.containerStyle}
                titleStyle={[styles.titleStyle, iOSUIKit.title3Emphasized]}
                subtitleStyle={[styles.subtitleStyle, sanFranciscoWeights.light]}
                onPress={this.onSelectEmployee.bind(this)}
            />
        )
    }
}

const styles = {
    containerStyle: {
        backgroundColor: 'white',
        // borderBottomStyle: 'solid',
        borderBottomWidth: 0.5,
        borderColor: '#e8e8e8',
    },
    titleStyle: {
        // fontSize: 20,
        paddingLeft: 10
    },
    subtitleStyle: {
        color: 'grey',
        fontSize: 15,
        paddingLeft: 10
    }
}

const mapStateToProps = ({ servicesClient }) => {
    const { selectedService } = servicesClient
    return { selectedService }
}

export default connect(mapStateToProps, {selectEmployee})(EmployeeClientListItem);