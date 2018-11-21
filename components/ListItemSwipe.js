import React, { Component } from 'react';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipeable from 'react-native-swipeable';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { selectedEmployeeId } from '../actions'

class ListItemSwipe extends Component {
    swipeable = null

    handleIcons(key) {
        const { iconsTypeUnselected, iconsTypeSelected, iconsType, itemSelected } = this.props

        if (iconsType) return iconsType

        if (itemSelected === key) {
            return iconsTypeSelected
        }

        return iconsTypeUnselected
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
                        <TouchableHighlight style={styles.deleteButton}>
                            <AntDesign name="delete" size={25} color="white" />
                        </TouchableHighlight>]
                    }>
                    <ListItem
                        key={item.key}
                        avatar={item.imageUrl ? { uri: item.imageUrl } : require('../img/default-avatar.png')}
                        title={item.name}
                        subtitle={item.role}
                        rightIcon={this.handleIcons(item.key)}
                        onPress={() => this.props.selectedEmployeeId(item.key)}
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

export default connect(mapStateToProps, {selectedEmployeeId})(withNavigation(ListItemSwipe));