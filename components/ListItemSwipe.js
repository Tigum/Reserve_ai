import React, { Component } from 'react';
import { TouchableHighlight } from 'react-native'
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipeable from 'react-native-swipeable';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { manageEmployeeToSelection, deleteEmployee } from '../actions'

class ListItemSwipe extends Component {

    swipeable = null

    handleIcon(employees, key) {
        if (employees.includes(key)) {
            return this.props.iconsTypeSelected
        }
        return this.props.iconsTypeUnselected
    }

    deleteButton(key) {
        const { uid } = this.props.user
        const employeeId = key
        this.props.deleteEmployee({uid, employeeId})
    }

    render() {
        const { item, navigation, routeName } = this.props
        return (

            <Swipeable
                key={item.key}
                onRef={ref => this.swipeable = ref}
                rightButtons={
                    [<TouchableHighlight style={styles.editButton} onPress={() => {
                        navigation.navigate(routeName, item)
                        this.swipeable.recenter()
                    }}>
                        <AntDesign name="edit" size={25} color="white" />
                    </TouchableHighlight>,
                    <TouchableHighlight style={styles.deleteButton} onPress={() => this.deleteButton(item.key)}>
                        <AntDesign name="delete" size={25} color="white" />
                    </TouchableHighlight>]
                }>
                <ListItem
                    containerStyle={{ backgroundColor: 'white' }}
                    key={item.key}
                    avatar={item.imageUrl ? { uri: item.imageUrl } : require('../img/default-avatar.png')}
                    title={item.name}
                    subtitle={item.role}
                    rightIcon={this.handleIcon(this.props.employeesSelected, item.key)}
                    onPress={() => this.props.manageEmployeeToSelection(this.props.employeesSelected, item.key)}
                />
            </Swipeable>


        )
    }
}

const styles = {
    editButton: {
        backgroundColor: '#78b572',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        paddingLeft: '6%'
    },
    deleteButton: {
        backgroundColor: '#ff867d',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        paddingLeft: '6%'
    }
}
const mapStateToProps = ({ mainAdmin, servicesAdmin }) => {
    const { user } = mainAdmin
    const { employeeId, employeesSelected } = servicesAdmin

    return {
        user,
        employeeId,
        employeesSelected
    }
}

export default connect(mapStateToProps, { manageEmployeeToSelection, deleteEmployee })(withNavigation(ListItemSwipe));