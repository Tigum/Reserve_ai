import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../components/Header'
import BottomButton from '../components/BottomButton'
import { connect } from 'react-redux';
import {
    continueRegisterAdmin,
    uploadPhotoClient,
    checkIfClientEmailExistsAndRegister,
    setAvatarDefault
} from '../actions'
import Button from '../components/Button'
import { bucket, region, accessKey, secretKey, successActionStatus } from '../s3/s3'
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

class RegisterAdminPicScreen extends Component {
    state = {
        imageLoading: true
    }

    endLoadingImage() {
        this.setState({ imageLoading: false })
    }

    onRegisterButtonPress() {
        this.props.setAvatarDefault()
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

                    try {

                        const { status } = await Permissions.getAsync(Permissions.CAMERA);
                        if (status) {

                            if (status === 'granted') {

                                try {
                                    let result = await ImagePicker.launchCameraAsync({
                                        allowsEditing: true,
                                        aspect: [4, 4],
                                    });
                                    if (result) {
                                        if (!result.cancelled) {

                                            try {

                                                const { _id } = this.props.currentUser
                                                const userId = _id
                                                if (userId) {
                                                    // const { uid } = currentUser
                                                    const { uri } = result
                                                    const successRouteName = 'mainAdminScreen'
                                                    this.props.uploadPhotoClient({ uri, S3Options, userId, successRouteName })
                                                }

                                            } catch (err) {
                                                alert(err)
                                                return
                                            }
                                        }
                                    }

                                } catch (err) {
                                    alert(err)
                                    return
                                }

                            } else {

                                try {
                                    await Permissions.askAsync(Permissions.CAMERA)
                                } catch (err) {
                                    alert(err)
                                    return
                                }

                                try {
                                    const { status } = await Permissions.getAsync(Permissions.CAMERA);
                                    if (status) {


                                        if (status === 'granted') {


                                            try {
                                                let result = await ImagePicker.launchCameraAsync({
                                                    allowsEditing: true,
                                                    aspect: [4, 4],
                                                });

                                                if (result) {


                                                    try {
                                                        const { _id } = this.props.currentUser
                                                        const userId = _id
                                                        if (userId) {
                                                            // const { uid } = currentUser
                                                            const { uri } = result
                                                            const successRouteName = 'mainAdminScreen'
                                                            this.props.uploadPhotoClient({ uri, S3Options, userId, successRouteName })
                                                        }

                                                    } catch (err) {
                                                        alert(err)
                                                        return
                                                    }

                                                }
                                            } catch (err) {
                                                alert(err)
                                                return
                                            }

                                        } else {
                                            alert('Permissão para acessar camera negada')
                                            throw new Error('Permissão para acessar camera negada');
                                        }


                                    }
                                } catch (err) {
                                    alert(err)
                                    return
                                }
                            }

                        }

                    } catch (err) {
                        alert(err)
                        return
                    }

                }

                if (buttonIndex === 1) {

                    try {
                        const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL)

                        if (status) {

                            if (status === 'granted') {

                                try {
                                    let result = await ImagePicker.launchImageLibraryAsync({
                                        allowsEditing: true,
                                        aspect: [4, 4],
                                    });

                                    if (result) {
                                        if (!result.cancelled) {


                                            try {
                                                const { _id } = this.props.currentUser
                                                const userId = _id
                                                if (userId) {
                                                    // const { uid } = currentUser
                                                    const { uri } = result
                                                    const successRouteName = 'mainAdminScreen'
                                                    this.props.uploadPhotoClient({ uri, S3Options, userId, successRouteName })
                                                }
                                            } catch (err) {
                                                alert(err)
                                                return
                                            }


                                        }

                                    }
                                } catch (err) {
                                    alert(err)
                                    return
                                }

                            } else {

                                try {
                                    await Permissions.askAsync(Permissions.CAMERA_ROLL)
                                } catch (err) {
                                    alert(err)
                                    return
                                }
                                try {
                                    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL)

                                    if (status) {

                                        if (status === 'granted') {

                                            try {
                                                let result = await ImagePicker.launchImageLibraryAsync({
                                                    allowsEditing: true,
                                                    aspect: [4, 4],
                                                });
                                                if (result) {
                                                    if (!result.cancelled) {

                                                        try {
                                                            const { _id } = this.props.currentUser
                                                            const userId = _id
                                                            if (userId) {
                                                                // const { uid } = currentUser
                                                                const { uri } = result
                                                                const successRouteName = 'mainAdminScreen'
                                                                this.props.uploadPhotoClient({ uri, S3Options, userId, successRouteName })
                                                            }
                                                        } catch (err) {
                                                            alert(err)
                                                            return
                                                        }

                                                    }
                                                }
                                            } catch (err) {
                                                alert(err)
                                                return
                                            }

                                        } else {
                                            alert('Permissão para acessar a biblioteca negada')
                                            throw new Error('Permissão para acessar a biblioteca negada');
                                        }
                                    }

                                } catch (err) {
                                    alert(err)
                                    return
                                }
                            }

                        }

                    } catch (err) {
                        alert(err)
                        return
                    }
                }
            });
    }


    renderContent() {
        if (this.props.loading) {
            return <Spinner text='Criando conta...' />
        }
        return (

            <View
                style={styles.mainView}
            >
                <Header headerText='Foto da loja ou Logo' icon='leftcircleo' />
                <View>
                    <Button
                        buttonText='Subir foto'
                        // buttonBackgroundColor={this.sundayColor()}
                        // buttonHeight={BUTTONS_HEIGHT}
                        buttonAction={this.onOpenActionSheet.bind(this)}
                    />
                </View>
                <BottomButton
                    buttonText='Finalizar cadastro'
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
    image: {
        width: 100,
        height: 100,
        borderRadius: 10
    },
    text: {
        fontSize: 20,
        color: 'black'
    }
}

const mapStateToProps = ({ registerAdmin, auth }) => {
    const { currentUser } = auth
    const {
        name,
        email,
        companyName,
        phone,
        password,
        passwordConfirmation,
        loading,
        startHour,
        endHour,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        image
    } = registerAdmin;
    return {
        name,
        email,
        companyName,
        phone,
        password,
        passwordConfirmation,
        loading,
        startHour,
        endHour,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        image,
        currentUser
    }
}

export default connect(mapStateToProps, {
    continueRegisterAdmin,
    uploadPhotoClient,
    checkIfClientEmailExistsAndRegister,
    setAvatarDefault
})(connectActionSheet(RegisterAdminPicScreen));