import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { sanFranciscoWeights } from 'react-native-typography';
import { ListItem, FormLabel, FormInput } from 'react-native-elements';
import DefaultModal from '../components/DefaultModal'

class AddEmployeesScreen extends Component {
    render() {
        return (
            <DefaultModal
                title='Adicionar funcionário'
                buttonText='Adicionar'
                dismissIcon='close'
            // buttonAction={this.onContinuePress.bind(this)}
            >
                <KeyboardAwareScrollView>
                    <View style={styles.inputViews}>
                        <FormLabel
                            labelStyle={sanFranciscoWeights.light}
                        >
                            FOTO DO FUNCIONÁRIO
                        </FormLabel>
                        <ListItem
                            key={0}
                            avatar={require('../img/default-avatar.png')}
                            title='Nome do funcionário'
                            subtitle='Funcionário'
                        />

                    </View>
                    <View style={styles.inputViews}>
                        <FormLabel
                            labelStyle={sanFranciscoWeights.light}
                        >
                            NOME DO FUNCIONÁRIO
                        </FormLabel>

                        <FormInput
                            placeholder='Digite o nome do funcionário'
                            returnKeyType={"next"}
                            // onChangeText={this.onNameChanged.bind(this)}
                            // value={this.props.serviceName}
                            inputStyle={sanFranciscoWeights.thin}
                            onBlur={() => Keyboard.dismiss()}
                        />
                    </View>

                </KeyboardAwareScrollView>
            </DefaultModal>
        )
    }
}

const styles = {
    inputViews: {
        paddingTop: 30
    }
}

export default AddEmployeesScreen;
