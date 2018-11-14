import React, { Component } from 'react';
import { View, Text, Dimensions, ActivityIndicator } from 'react-native';
import Header from '../components/Header'
import BottomButton from '../components/BottomButton'
import { connect } from 'react-redux';
import {
    continueRegisterAdmin,
    uploadPhoto
} from '../actions'
import { sanFranciscoWeights } from 'react-native-typography';
import Button from '../components/Button'
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { ImagePicker, Permissions } from 'expo'

const SCREEN_WIDTH = Dimensions.get('window').width;

const S3Options = {
    keyPrefix: "reserve_ai/",
    bucket: "tigum",
    region: "us-east-1",
    accessKey: "AKIAIUHHF3SCXDZ2UR4A",
    secretKey: "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",
    successActionStatus: 201
}

class RegisterAdminPicScreen extends Component {

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
                            await this.props.uploadPhoto({ uri, S3Options, uid })
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
                                await this.props.uploadPhoto({ uri, S3Options, uid })
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
                            await this.props.uploadPhoto({ uri, S3Options, uid })
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
                                await this.props.uploadPhoto({ uri, S3Options, uid })
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
            return (
                <View style={styles.spinnerView}>
                    <ActivityIndicator size='large' />
                    <Text style={[sanFranciscoWeights.thin, styles.loadingTextStyle]}>Processando...</Text>
                </View>
            )
        }
        return (

            <View
                style={styles.mainView}
            >
                <Header headerText='Foto ou Logo' icon='leftcircleo' />
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
                    buttonText='Finalizar cadastro'
                    buttonAction={this.onRegisterButtonPress.bind(this)}
                />
            </View>
        )
    }

    render() {
        console.log('propsPic', this.props)
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
    spinnerView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    loadingTextStyle: {
        color: '#8c8c8c',
        fontSize: 13,
        paddingTop: 10
    }
}

const mapStateToProps = ({ registerAdmin }) => {
    const {
        name,
        email,
        companyName,
        phone,
        password,
        passwordConfirmation,
        user,
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
        user,
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
    }
}

export default connect(mapStateToProps, {
    continueRegisterAdmin,
    uploadPhoto,
})(connectActionSheet(RegisterAdminPicScreen));