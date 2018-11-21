import React, { Component } from 'react';
import { TouchableHighlight } from 'react-native'
import { ListItem } from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

class ListItemSwipe extends Component {
    swipeable = null

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

export default withNavigation(ListItemSwipe);