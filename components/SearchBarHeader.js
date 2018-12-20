import React, { Component } from 'react';
import { View, Dimensions, TouchableWithoutFeedback, Text } from 'react-native';
import firebase from 'firebase'
import { connect } from 'react-redux';
import { Avatar } from 'react-native-elements'
import { sanFranciscoWeights } from 'react-native-typography';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import { renderAvatar, uploadPhotoClient, renderAvatarNull } from '../actions'
import { ImagePicker, Permissions } from 'expo'
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { bucket, region, accessKey, secretKey, successActionStatus } from '../s3'

const SCREEN_WIDTH = Dimensions.get('window').width
const S3Options = {
    bucket,
    region,
    accessKey,
    secretKey,
    successActionStatus
}

class SearchBarHeader extends Component {

    componentWillMount() {
        this.props.renderAvatar()
    }

    handleAvatar() {
        if(avatar === null) {
            return avatar ? { uri: avatar } : require('../img/loading.gif')
        }

        if(avatar === 'N/A'){
            return require('../img/default-avatar.png')
        }
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
                                                const { currentUser } = firebase.auth()

                                                if (currentUser) {
                                                    this.props.renderAvatarNull()
                                                    const { uid } = currentUser
                                                    const { uri } = result
                                                    const successRouteName = 'mainClientScreen'
                                                    this.props.uploadPhotoClient({ uri, S3Options, uid, successRouteName })
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
                                                        const { currentUser } = firebase.auth()

                                                        if (currentUser) {

                                                            if (!result.cancelled) {
                                                                this.props.renderAvatarNull()
                                                                const { uid } = currentUser
                                                                const { uri } = result
                                                                const successRouteName = 'mainClientScreen'
                                                                this.props.uploadPhotoClient({ uri, S3Options, uid, successRouteName })
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
                                                const { currentUser } = firebase.auth()

                                                if (currentUser) {
                                                    this.props.renderAvatarNull()
                                                    const { uid } = currentUser
                                                    const { uri } = result
                                                    const successRouteName = 'mainClientScreen'
                                                    this.props.uploadPhotoClient({ uri, S3Options, uid, successRouteName })
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
                                                            const { currentUser } = firebase.auth()

                                                            if (currentUser) {
                                                                this.props.renderAvatarNull()
                                                                const { uid } = currentUser
                                                                const { uri } = result
                                                                const successRouteName = 'mainAdminScreen'
                                                                this.props.uploadPhotoClient({ uri, S3Options, uid, successRouteName })
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

    render() {
        const { iconAction, icon, avatar } = this.props
        return (
            <View style={styles.viewStyle}>
                <TouchableWithoutFeedback onPress={() => iconAction || this.props.navigation.goBack()}>
                    <AntDesign style={styles.closeIconStyle} name={icon} size={25} color="black" />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => iconAction || this.props.navigation.goBack()}>
                    <View style={styles.textView}>
                        <Text style={[styles.textStyle, sanFranciscoWeights.thin]}>Encontre serviços...</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.avatarView}>
                    <Avatar
                        size="small"
                        rounded
                        source={avatar ? { uri: avatar === 'N/A' ? require('../img/default-avatar.png') : avatar } : require('../img/loading.gif')}
                        onPress={this.onOpenActionSheet.bind(this)}
                        activeOpacity={0.7}

                    />
                </View>

            </View>
        )
    }
}


const styles = {
    viewStyle: {
        backgroundColor: '#f8f8f8',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: 80,
        paddingTop: 35,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
        width: SCREEN_WIDTH,
        paddingLeft: 15,
        flexDirection: 'row',
    },
    textStyle: {
        fontSize: 25,
        color: 'black',
        // flex: 'flex-start'
    },
    textView: {
        flex: 1,
        alignItems: 'flex-start'
    },
    closeIconStyle: {
        paddingTop: 3,
        paddingRight: 15
    },
    avatarView: {
        paddingRight: 10
    }
}

const mapStateToProps = ({ auth }) => {
    const { avatar } = auth
    return { avatar }
}

export default connect(mapStateToProps, { renderAvatar, uploadPhotoClient, renderAvatarNull })(connectActionSheet(withNavigation(SearchBarHeader)));
