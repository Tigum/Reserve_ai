import React, { Component } from 'react';
import firebase from 'firebase'
import { View } from 'react-native';
import Header from '../components/Header'
import BottomButton from '../components/BottomButton'
import { connect } from 'react-redux';
import {
    continueRegisterClient,
    uploadPhotoClient,
    setAvatarDefault
} from '../actions'
import Button from '../components/Button'
import { bucket, region, accessKey, secretKey, successActionStatus } from '../s3'
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
        this.props.setAvatarDefault()
        this.props.navigation.navigate('mainClientScreen')
    }

    onOpenActionSheet = async () => {
        let options = ['Camera', 'Biblioteca', 'Cancel'];
        // let destructiveButtonIndex = 0;
        let cancelButtonIndex = 2;
        console.log('CURRENT_USER', this.props.currentUser)
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
                                                    const successRouteName = 'mainClientScreen'
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
                                                        console.log('userId', userId)
                                                        if (userId) {

                                                            if (!result.cancelled) {
                                                                // const { uid } = currentUser
                                                                const { uri } = result
                                                                const successRouteName = 'mainClientScreen'
                                                                this.props.uploadPhotoClient({ uri, S3Options, userId, successRouteName })
                                                            }
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
                                                console.log('userId2', userId)
                                                if (userId) {
                                                    // const { uid } = currentUser
                                                    const { uri } = result
                                                    const successRouteName = 'mainClientScreen'
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
        console.log('this.props', this.props)
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

const mapStateToProps = ({ registerClient, auth }) => {
    const { currentUser } = auth
    const {
        name,
        email,
        phone,
        password,
        passwordConfirmation,
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
        loading,
        image,
        role,
        currentUser
    }
}

export default connect(mapStateToProps, {
    continueRegisterClient,
    uploadPhotoClient,
    setAvatarDefault
})(connectActionSheet(RegisterClientPicScreen));