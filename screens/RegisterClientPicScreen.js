import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../components/Header'
import BottomButton from '../components/BottomButton'
import { connect } from 'react-redux';
import {
    continueRegisterClient,
    uploadPhotoClient,
} from '../actions'
import Button from '../components/Button'
import { bucket, region, accessKey, secretKey, successActionStatus} from '../s3'
import { Spinner } from '../components/Spinner'
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { ImagePicker, Permissions } from 'expo'

const S3Options = {
    bucket,
    region,
    accessKey,
    secretKey,
    successActionStatus
}

class RegisterClientPicScreen extends Component {

    onRegisterButtonPress() {
        this.props.navigation.navigate('mainAdminScreen')
    }

    onOpenActionSheet = async () => {
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
                            const successRouteName = 'mainAdminScreen'
                            await this.props.uploadPhotoClient({ uri, S3Options, uid, successRouteName })
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
                                const successRouteName = 'mainAdminScreen'
                                await this.props.uploadPhotoClient({ uri, S3Options, uid, successRouteName })
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
                            const successRouteName = 'mainAdminScreen'
                            await this.props.uploadPhotoClient({ uri, S3Options, uid, successRouteName })
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
                                const successRouteName = 'mainAdminScreen'
                                await this.props.uploadPhotoClient({ uri, S3Options, uid, successRouteName })
                            }
                        } else {
                            alert('Permissão para acessar a biblioteca negada')
                            throw new Error('Permissão para acessar a biblioteca negada');
                        }
                    }
                }
            });
    }


    renderContent() {
        if (this.props.loading) {
            return <Spinner text='Subindo foto...' />
        }
        return (

            <View
                style={styles.mainView}
            >
                <Header headerText='Foto do perfil' icon='leftcircleo' />
                <View>
                    {/* <Image 
                        source={{uri:''}}
                    /> */}
                    <Button
                        buttonText='Subir foto'
                        // buttonBackgroundColor={this.sundayColor()}
                        // buttonHeight={BUTTONS_HEIGHT}
                        buttonAction={this.onOpenActionSheet.bind(this)}
                    />
                </View>
                <BottomButton
                    buttonText='Pular'
                    buttonAction={this.onRegisterButtonPress.bind(this)}
                />
            </View>
        )
    }

    render() {
        return this.renderContent()
    }
}

const styles = {
    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    registerButton: {
        paddingTop: 35,
        paddingBottom: 35
    },
}

const mapStateToProps = ({ registerClient }) => {
    const {
        name,
        email,
        phone,
        password,
        passwordConfirmation,
        user,
        loading,
        image,
        role
    } = registerClient;
    return {
        name,
        email,
        phone,
        password,
        passwordConfirmation,
        user,
        loading,
        image,
        role
    }
}

export default connect(mapStateToProps, {
    continueRegisterClient,
    uploadPhotoClient,
})(connectActionSheet(RegisterClientPicScreen));