import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ScheduleListItem from './ScheduleListItem';
import EmptyListWarning from './EmptyListWarning'
import { iOSUIKit } from 'react-native-typography';

class ScheduleList extends Component {

    renderList() {
        const { data } = this.props
        if (data.length > 0) {
            return (
                data.map((item) => (
                    <ScheduleListItem
                        key={item}
                        schedule={item}
                    />
                ))
            )
        } else {
            return (
                <EmptyListWarning
                    text='NÃO HÁ HORÁRIOS DISPONÍVEIS :('
                    icon='book'
                    iconSize={30}
                    textSize={12}
                />
            )
        }
    }

    render() {
        return (
            <ScrollView>
                {this.renderList()}
            </ScrollView>
        )
    }
}

export default ScheduleList;