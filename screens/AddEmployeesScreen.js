import React, { Component } from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { ImagePicker, Permissions } from 'expo';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { sanFranciscoWeights } from 'react-native-typography';
import { ListItem, FormLabel, FormInput } from 'react-native-elements';
import { employeeNameChanged, employeePhotoChangedEdit, uploadEmployeePhotoToS3, addNewEmployee } from '../actions'
import { EvilIcons } from '@expo/vector-icons';
import DefaultModal from '../components/DefaultModal'
import random from 'random-id';

const S3Options = {
    keyPrefix: "reserve_ai/",
    bucket: "tigum",
    region: "us-east-1",
    accessKey: "AKIAIUHHF3SCXDZ2UR4A",
    secretKey: "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",
    successActionStatus: 201
}

class AddEmployeesScreen extends Component {

    state = {
        modalTitle: null,
        modalButtonActionText: null
    }

    componentWillMount() {
        const { params } = this.props.navigation.state
        console.log('params', params)

        if (params) {
            this.props.employeeNameChanged(params.name)
            this.props.employeePhotoChangedEdit(params.imageUrl)
            this.setState({ modalTitle: 'Editar funcionário', modalButtonActionText: 'Concluir'})
        } else {
            this.setState({ modalTitle: null, modalButtonActionText: null})
        }

    }

    onNameChanged(text) {
        this.props.employeeNameChanged(text)
    }

    onChoosePhoto = async () => {
        let options = ['Camera', 'Biblioteca', 'Cancel'];
        // let destructiveButtonIndex = 0;
        let cancelButtonIndex = 2;

        this.props.showActionSheetWithOptions({
            options,
            cancelButtonIndex,
            // destructiveButtonIndex,
        },
            async (buttonIndex) => {

                if (buttonIndex === 0) {
                    const { status } = await Permissions.getAsync(Permissions.CAMERA);
                    if (status === 'granted') {
                        let result = await ImagePicker.launchCameraAsync({
                            allowsEditing: true,
                            aspect: [4, 4],
                        });
                        if (!result.cancelled) {
                            const uid = await this.props.user.uid
                            const uri = result.uri
                            await this.props.uploadEmployeePhotoToS3({ uri, S3Options, uid })
                        }
                    } else {
                        await Permissions.askAsync(Permissions.CAMERA)
                        const { status } = await Permissions.getAsync(Permissions.CAMERA);
                        if (status === 'granted') {
                            let result = await ImagePicker.launchCameraAsync({
                                allowsEditing: true,
                                aspect: [4, 4],
                            });
                            const uid = await this.props.user.uid
                            if (!result.cancelled) {
                                const uri = result.uri
                                await this.props.uploadEmployeePhotoToS3({ uri, S3Options, uid })
                            }
                        } else {
                            alert('Permissão para acessar camera negada')
                            throw new Error('Permissão para acessar camera negada');
                        }
                    }
                }

                if (buttonIndex === 1) {
                    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL)

                    if (status === 'granted') {
                        let result = await ImagePicker.launchImageLibraryAsync({
                            allowsEditing: true,
                            aspect: [4, 4],
                        });
                        if (!result.cancelled) {
                            const uid = await this.props.user.uid
                            const uri = result.uri
                            await this.props.uploadEmployeePhotoToS3({ uri, S3Options, uid })
                        }
                    } else {
                        await Permissions.askAsync(Permissions.CAMERA_ROLL)
                        const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL)
                        if (status === 'granted') {
                            let result = await ImagePicker.launchImageLibraryAsync({
                                allowsEditing: true,
                                aspect: [4, 4],
                            });
                            if (!result.cancelled) {
                                const uid = await this.props.user.uid
                                const uri = result.uri
                                await this.props.uploadEmployeePhotoToS3({ uri, S3Options, uid })
                            }
                        } else {
                            alert('Permissão para acessar a biblioteca negada')
                            throw new Error('Permissão para acessar a biblioteca negada');
                        }
                    }
                }
            });
    }

    renderPhoto() {
        const EMPLOYEE_IMAGE = this.props.employeePhoto ? { uri: this.props.employeePhoto } : require('../img/default-avatar.png')
        const EMPLOYEE_NAME = this.props.employeeName || 'Nome do funcionário'
        if (this.props.loading) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, paddingTop: 40 }}>
                    <ActivityIndicator size='small' />
                    <Text style={[sanFranciscoWeights.thin, { fontSize: 10, paddingTop: 10 }]}>Carregando foto...</Text>
                </View>
            )
        }

        return (
            <TouchableWithoutFeedback onPress={() => this.onChoosePhoto()}>
                <View style={styles.inputViews}>
                    <FormLabel
                        labelStyle={sanFranciscoWeights.light}
                    >
                        FOTO DO FUNCIONÁRIO
                        </FormLabel>
                    <ListItem
                        key={0}
                        avatar={EMPLOYEE_IMAGE}
                        title={EMPLOYEE_NAME}
                        subtitle='Clique aqui para escolher foto'
                        rightIcon={<EvilIcons name="camera" size={35} color="grey" />}
                    />

                </View>
            </TouchableWithoutFeedback>
        )
    }

    async addNewEmployee() {
        const uid = this.props.user.uid
        const key = await random(17, 'aA0');
        if (!this.props.employeeName) return alert('Informe o nome do funcionário')
        const employee = {
            name: this.props.employeeName,
            imageUrl: this.props.employeePhoto || '',
            key,
            role: 'Funcionário',
            ownerUid: uid,
        }

        await this.props.addNewEmployee({ uid, employee })
        this.props.navigation.goBack()
    }

    render() {

        return (
            <DefaultModal
                title={this.state.modalTitle || 'Adicionar funcionário'}
                buttonText={this.state.modalButtonActionText || 'Adicionar'}
                dismissIcon='close'
                buttonAction={this.addNewEmployee.bind(this)}
            >
                <KeyboardAwareScrollView>

                    {this.renderPhoto()}

                    <View style={styles.inputViews}>
                        <FormLabel
                            labelStyle={sanFranciscoWeights.light}
                        >
                            NOME DO FUNCIONÁRIO
                        </FormLabel>

                        <FormInput
                            placeholder='Digite o nome do funcionário'
                            returnKeyType={"next"}
                            onChangeText={this.onNameChanged.bind(this)}
                            value={this.props.employeeName}
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

const mapStateToProps = ({ mainAdmin, servicesAdmin }) => {
    const { user } = mainAdmin
    const { serviceName, serviceDescription, servicePrice, serviceDuration, employeeName, employeePhoto, loading, employees, employeeId } = servicesAdmin

    return {
        user,
        serviceName,
        serviceDescription,
        servicePrice,
        serviceDuration,
        employeeName,
        employeePhoto,
        loading,
        employees,
        employeeId
    }
}

export default connect(mapStateToProps,
    {
        employeeNameChanged,
        employeePhotoChangedEdit,
        uploadEmployeePhotoToS3,
        addNewEmployee,
    }
)(connectActionSheet(AddEmployeesScreen));
