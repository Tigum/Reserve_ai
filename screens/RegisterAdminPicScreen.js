import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase'
import Header from '../components/Header'
import BottomButton from '../components/BottomButton'
import { connect } from 'react-redux';
import { EvilIcons } from '@expo/vector-icons';
import {
    continueRegisterAdmin,
    uploadPhoto,
    checkIfClientEmailExistsAndRegister,
    ifNoPicWasUpdated
} from '../actions'
import Button from '../components/Button'
import { bucket, region, accessKey, secretKey, successActionStatus } from '../s3'
import { Spinner } from '../components/Spinner'
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { ImagePicker, Permissions } from 'expo'
import { sanFranciscoWeights } from 'react-native-typography';

const S3Options = {
    bucket,
    region,
    accessKey,
    secretKey,
    successActionStatus 
}

class RegisterAdminPicScreen extends Component {
    state ={
        imageLoading: true
    }

    endLoadingImage() {
        this.setState({ imageLoading: false})
    }

    onRegisterButtonPress() {
        console.log('entrouuuuuuuuu', this.props)
        this.props.navigation.navigate('mainAdminScreen')
        // const { currentUser } = await firebase.auth()
        // console.log('currentUser', currentUser)
        // if (currentUser) {
        //     this.props.ifNoPicWasUpdated(currentUser.uid)
        // } else {
        //     alert('Você não está logado. Faça o login e tente novamente')
        // }
    }

    renderPhoto() {
        // const { currentUser } = firebase.auth()
        console.log('currentUser')
        // if(!currentUser) return
        // firebase.database().ref(`/users/${currentUser.uid}`).on('value', async snapshot => {
        //     const user = await snapshot.val()
        //     console.log('user5', user)
        //     if (user.imageUrl && user.imageUrl.length > 0) {
        //         if (user.role === 'admin') {
        //             return (
        //                 <View>
        //                     <EvilIcons name='camera' size={30} />
        //                     <Text style={[sanFranciscoWeights.thin, styles.text]}>Adicione seu logo</Text>
        //                 </View>
        //             )
        //         }
        //         return (
        //             <View>
        //                 <EvilIcons name='camera' size={30} />
        //                 <Text style={[sanFranciscoWeights.thin, styles.text]}>Adicione foto do perfil</Text>
        //             </View>
        //         )
        //     }

        //     if (user.imageUrl) {
        //         return (
        //             <Image style={styles.image}
        //                 source={this.state.imageLoading ? require('../img/loading.gif') : { uri: user.imageUrl }}
        //                 onLoadEnd={this.endLoadingImage.bind(this)}
        //             />
        //         )
        //     }
        // })
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
                            const uid = await this.props.currentUser.uid
                            const uri = result.uri
                            const successRouteName = 'mainAdminScreen'
                            await this.props.uploadPhoto({ uri, S3Options, uid, successRouteName })
                        }
                    } else {
                        await Permissions.askAsync(Permissions.CAMERA)
                        const { status } = await Permissions.getAsync(Permissions.CAMERA);
                        if (status === 'granted') {
                            let result = await ImagePicker.launchCameraAsync({
                                allowsEditing: true,
                                aspect: [4, 4],
                            });
                            const uid = await this.props.currentUser.uid
                            if (!result.cancelled) {
                                const uri = result.uri
                                const successRouteName = 'mainAdminScreen'
                                await this.props.uploadPhoto({ uri, S3Options, uid, successRouteName })
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
                            const uid = await this.props.currentUser.uid
                            const uri = result.uri
                            const successRouteName = 'mainAdminScreen'
                            await this.props.uploadPhoto({ uri, S3Options, uid, successRouteName })
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
                                const uid = await this.props.currentUser.uid
                                const uri = result.uri
                                const successRouteName = 'mainAdminScreen'
                                await this.props.uploadPhoto({ uri, S3Options, uid, successRouteName })
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
            return <Spinner text='Criando conta...' />
        }
        return (

            <View
                style={styles.mainView}
            >
                <Header headerText='Foto da loja ou Logo' icon='leftcircleo' />
                <View>
                    {/* <Image 
                        source={{uri:''}}
                    /> */}
                    {this.renderPhoto()}
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
        width:100,
        height: 100,
        borderRadius: 10
    },
    text: {
        fontSize: 20,
        color: 'black'
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
    checkIfClientEmailExistsAndRegister,
    ifNoPicWasUpdated
})(connectActionSheet(RegisterAdminPicScreen));