import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import { addAreaToAdmim, removeAreaToAdmim } from '../actions'

class ItemList extends Component {

    addAreaToSelection() {
        // console.log('entrou')
        const { areasSelected, item } = this.props
        if(!areasSelected.includes(item)){
            this.props.addAreaToAdmim(item)
        }else{
            this.props.removeAreaToAdmim(item)
        }
    }

    render() {
        const { item, areasSelected } = this.props
        // console.log('areasSelected', areasSelected)
        return (
            <View style={styles.mainView}>
            <CheckBox
                    center
                    title={item}
                    iconLeft
                    // checkedIcon={<AntDesign name="check" size={25} color="white" />}
                    // uncheckedIcon=''
                // checkedColor='red'
                onPress={this.addAreaToSelection.bind(this)}
                    checked={areasSelected.includes(item)}
                />
                
            </View>
        )
    }
}

const styles = {
    mainView: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'white',
        padding: 15
    },
}

const mapStateToProps = ({ registerAdmin }) => {
    const { areasSelected } = registerAdmin
    return { areasSelected }
}

export default connect(mapStateToProps, {addAreaToAdmim, removeAreaToAdmim})(ItemList)