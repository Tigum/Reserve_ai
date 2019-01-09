import firebase from 'firebase';
import { Alert } from 'react-native'
import _ from 'lodash';
import { RNS3 } from 'react-native-aws3';
import {
    NEW_SERVICE_NAME_CHANGED,
    NEW_SERVICE_DESCRIPTION_CHANGED,
    NEW_SERVICE_PRICE_CHANGED,
    NEW_SERVICE_DURATION_TIME_CHANGED,
    SHOW_CURRENT_EMPLOYEES,
    NEW_EMPLOYEE_NAME_CHANGED,
    NEW_EMPLOYEE_PHOTO_CHANGED,
    NEW_EMPLOYEE_LOADING_ON,
    NEW_EMPLOYEE_LOADING_OFF,
    NEW_EMPLOYEE_ADDED,
    CLEAR_EMPLOYEE_FORM,
    NEW_EMPLOYEE_ID_CHANGED,
    EMPLOYEE_ADDED_TO_SELECTION,
    EMPLOYEE_REMOVED_FROM_SELECTION,
    SELECTED_EMPLOYEE_ID,
    LOAD_REGISTERED_SERVICES,
    FIND_EMPLOYEES_NAMES_BY_ID,
    CLEAR_SERVICE_FORM,
    START_EDIT_SERVICE,
    SERVICE_LOADING,
    SET_SERVICE_MODE,
    START_ADD_SERVICE
} from './types';
import NavigationServices from './NavigationServices';
import random from 'random-id';

export const serviceNameChanged = (text) => {
    return {
        type: NEW_SERVICE_NAME_CHANGED,
        payload: text
    }
}

export const clearEmployeeForm = () => {
    return {
        type: CLEAR_EMPLOYEE_FORM,
    }
}

export const serviceDescriptionChanged = (text) => {
    return {
        type: NEW_SERVICE_DESCRIPTION_CHANGED,
        payload: text
    }
}

export const servicePriceChanged = (text) => {
    return {
        type: NEW_SERVICE_PRICE_CHANGED,
        payload: text
    }
}

export const serviceDurationChanged = (text) => {
    return {
        type: NEW_SERVICE_DURATION_TIME_CHANGED,
        payload: text
    }
}

export const employeeNameChanged = (text) => {
    return {
        type: NEW_EMPLOYEE_NAME_CHANGED,
        payload: text
    }
}

export const employeeIdChanged = (text) => {
    return {
        type: NEW_EMPLOYEE_ID_CHANGED,
        payload: text
    }
}

export const employeePhotoChangedEdit = (text) => {
    return {
        type: NEW_EMPLOYEE_PHOTO_CHANGED,
        payload: text
    }
}

export const selectedEmployeeId = (key) => {
    return {
        type: SELECTED_EMPLOYEE_ID,
        payload: key
    }
}

export const manageEmployeeToSelection = (employees, employeeId) => {

    if (!employees.includes(employeeId)) {
        return {
            type: EMPLOYEE_ADDED_TO_SELECTION,
            payload: employeeId
        }
    }

    if (employees.includes(employeeId)) {
        return {
            type: EMPLOYEE_REMOVED_FROM_SELECTION,
            payload: employeeId
        }
    }

}


const employeePhotoChanged = (dispatch, text) => {
    dispatch({
        type: NEW_EMPLOYEE_PHOTO_CHANGED,
        payload: text
    })
}

export const showCurrentEmployees = () => async (dispatch) => {

    try {
        addEmployeeLoadingOn(dispatch)
        const { currentUser } = await firebase.auth()

        if (currentUser) {

            try {
                await firebase.database().ref(`/users/${currentUser.uid}`).on('value', snapshot => {
                    const hasEmployees = snapshot.hasChild('employees')
                    const user = snapshot.val()
                    if (hasEmployees) {
                        const employees = user.employees
                        let data = _.values(employees)

                        const myself = {
                            key: currentUser.uid,
                            imageUrl: user.imageUrl,
                            name: user.name,
                            role: 'Você (Proprietário)'
                        }
                        data.unshift(myself)

                        sendCurrentEmployess(dispatch, data)
                        addEmployeeLoadingOff(dispatch)
                    } else {
                        let data = []

                        const myself = {
                            key: currentUser.uid,
                            imageUrl: user.imageUrl,
                            name: user.name,
                            role: 'Você (Proprietário)'
                        }
                        data.unshift(myself)

                        sendCurrentEmployess(dispatch, data)
                        addEmployeeLoadingOff(dispatch)
                    }
                })

            } catch (err) {
                addEmployeeLoadingOff(dispatch)
                alert(err)
                return
            }

        }
    } catch (err) {
        addEmployeeLoadingOff(dispatch)
        alert(err)
        return
    }
}


export const uploadEmployeePhotoToS3 = ({ uri, S3Options, uid }) => (dispatch) => {
    addEmployeeLoadingOn(dispatch)
    let post = {}
    post["id"] = firebase.database.ServerValue.TIMESTAMP
    const options = S3Options
    const ext = uri.substr(uri.lastIndexOf('.') + 1);
    const name = random(17, 'aA0');
    const file = {
        name: name + "." + ext,
        type: "image/" + ext,
        uri
    }

    RNS3.put(file, options).then(response => {
        if (response.status === 201) {
            post["photo"] = response.body.postResponse.location
            const text = post.photo
            employeePhotoChanged(dispatch, text)
            addEmployeeLoadingOff(dispatch)
        }
    }).catch((err) => {
        console.log('imageError', err)
        alert('Erro ao carregar a foto. Tente novamente.')
        addEmployeeLoadingOff(dispatch)
        return
    });
}

export const addNewEmployee = ({ uid, employee }) => async (dispatch) => {
    console.log('uid', uid)
    console.log('employee', employee)
    try {
        await firebase.database().ref(`/users/${uid}/employees/${employee.key}`).set(employee)
        employeeAdded(dispatch, employee)
    } catch (err) {
        console.log(err)
        return
    }
}

export const deleteEmployee = ({ uid, employeeId }) => async () => {
    Alert.alert(
        'Deletar funcionário',
        'Tem certeza que deseja deletar este funcionário?',
        [
            {
                text: 'Sim', onPress: async () => {
                    try {
                        await firebase.database().ref(`/users/${uid}/employees/${employeeId}`).remove()
                    } catch (err) {
                        console.log(err)
                        return
                    }
                }
            },
            {
                text: 'Não', onPress: () => {
                }
            },
        ],
        { cancelable: false }
    )
}

export const editEmployee = ({ uid, employee }) => async (dispatch) => {
    try {
        await firebase.database().ref(`/users/${uid}/employees/${employee.key}`).update(employee)
    } catch (err) {
        console.log(err)
        return
    }
}

const employeeAdded = (dispatch, employee) => {
    dispatch({
        type: NEW_EMPLOYEE_ADDED,
        payload: employee
    })
}

const sendCurrentEmployess = (dispatch, data) => {
    dispatch({
        type: SHOW_CURRENT_EMPLOYEES,
        payload: data
    })
}

const addEmployeeLoadingOn = (dispatch) => {
    dispatch({
        type: NEW_EMPLOYEE_LOADING_ON,
        payload: true
    })
}

const addEmployeeLoadingOff = (dispatch) => {
    dispatch({
        type: NEW_EMPLOYEE_LOADING_OFF,
        payload: false
    })
}

export const serviceLoadingOn = () => {
    return {
        type: NEW_EMPLOYEE_LOADING_ON,
        payload: true
    }
}

export const serviceLoadingOff = () => {
    return {
        type: NEW_EMPLOYEE_LOADING_ON,
        payload: false
    }
}


export const addNewService = (serviceInfo) => async (dispatch) => {

    try {
        setServiceMode(dispatch, 'add')
        const { currentUser } = await firebase.auth()
        const serviceId = random(17, 'aA0');
        serviceInfo['serviceId'] = serviceId
        serviceInfo['isActive'] = true

        if (currentUser) {
            try {
                await firebase.database().ref(`/services/${currentUser.uid}/${serviceId}`).set(serviceInfo)
            } catch (err) {
                console.log(err)
                return
            }
            NavigationServices.navigate('servicesAdmin')
            clearServiceForm(dispatch)
        }
    } catch (err) {
        alert(err)
        return
    }
}

const clearServiceForm = (dispatch) => {
    dispatch({
        type: CLEAR_SERVICE_FORM,
    })
}

export const loadRegisteredServices = () => async (dispatch) => {

    try {
        addEmployeeLoadingOn(dispatch)
        const { currentUser } = await firebase.auth()

        if (currentUser) {
            try {
                await firebase.database().ref(`/services/${currentUser.uid}`)
                    .on('value', snapshot => {

                        let data = []
                        const services = snapshot.val()
                        let servicesList = _.values(services)

                        servicesList.map((item) => {
                            const service = {
                                employeesSelected: item.employeesSelected,
                                ownerUid: item.ownerUid,
                                serviceDescription: item.serviceDescription,
                                serviceDuration: item.serviceDuration,
                                serviceName: item.serviceName,
                                servicePrice: item.servicePrice,
                                serviceId: item.serviceId
                            }
                            data.push(service)
                        })

                        dispatch({
                            type: LOAD_REGISTERED_SERVICES,
                            payload: data
                        })
                        addEmployeeLoadingOff(dispatch)
                    })
            } catch (err) {
                addEmployeeLoadingOff(dispatch)
                console.log(err)
                return
            }
        }
    } catch (err) {
        addEmployeeLoadingOff(dispatch)
        alert(err)
        return
    }
}

export const findEmployeesNamesById = (keys) => async (dispatch) => {

    try {
        let list = []
        const { currentUser } = await firebase.auth()

        if (currentUser) {
            keys.map(async (item) => {
                try {
                    await firebase.database().ref(`/users/${currentUser.uid}/employees/${item}`)
                        .on('value', snapshot => {
                            const employee = snapshot.val()
                            if (!employee) {
                                list.push('Você')
                            } else {
                                list.push(employee.name)
                            }
                        })
                } catch (err) {
                    console.log(err)
                    return
                }
            })
            dispatch({
                type: FIND_EMPLOYEES_NAMES_BY_ID,
                payload: list
            })
        }

    } catch (err) {
        alert(err)
        return
    }
}

export const deactivateService = (serviceId) => () => {
    Alert.alert(
        'Desativar serviço',
        'Tem certeza que deseja desativar este serviço? Desta maneira o serviço ficará indisponível para seus clientes!',
        [
            {
                text: 'Sim, desativar!', onPress: async () => {
                    try {
                        const { currentUser } = await firebase.auth()

                        if (currentUser) {
                            try {
                                await firebase.database().ref(`services/${currentUser.uid}/${serviceId}`).update({ isActive: false })
                            } catch (err) {
                                console.log(err)
                                return
                            }
                        }
                    } catch (err) {
                        alert(err)
                        return
                    }
                }
            },
            { text: 'Cancelar', onPress: () => { }, style: 'cancel' },
        ],
        { cancelable: false }
    )
}

export const activateService = (serviceId) => () => {
    Alert.alert(
        'Ativar serviço',
        'Tem certeza que deseja ativar este serviço?',
        [
            {
                text: 'Sim, ativar!', onPress: async () => {
                    try {
                        const { currentUser } = await firebase.auth()
                        if (currentUser) {
                            try {
                                await firebase.database().ref(`services/${currentUser.uid}/${serviceId}`).update({ isActive: true })
                            } catch (err) {
                                console.log(err)
                                return
                            }
                        }
                    } catch (err) {
                        alert(err)
                        return
                    }
                }
            },
            { text: 'Cancelar', onPress: () => { }, style: 'cancel' },
        ],
        { cancelable: false }
    )
}

export const deleteService = (serviceId) => () => {
    Alert.alert(
        'Deletar serviço',
        'Tem certeza que deseja deletar este serviço permanentemente?',
        [
            {
                text: 'Sim, deletar!', onPress: async () => {
                    try {
                        const { currentUser } = await firebase.auth()
                        if (currentUser) {
                            try {
                                await firebase.database().ref(`services/${currentUser.uid}/${serviceId}`).remove()
                            } catch (err) {
                                console.log(err)
                                return
                            }
                        }
                    } catch (err) {
                        alert(err)
                        return
                    }
                }
            },
            { text: 'Cancelar', onPress: () => { }, style: 'cancel' },
        ],
        { cancelable: false }
    )
}


export const editService = (service) => (dispatch) => {
    startEditService(dispatch, service)
    NavigationServices.navigate('addService')
}


const startEditService = (dispatch, service) => {
    dispatch({
        type: START_EDIT_SERVICE,
        payload: service
    })
}

export const completeServiceEdit = (service, serviceId) => async (dispatch) => {

    try {
        serviceLoading(dispatch, true)
        const { currentUser } = await firebase.auth()

        if (currentUser) {
            try {
                await firebase.database().ref(`services/${currentUser.uid}/${serviceId}`).update(service)
            } catch (err) {
                console.log(err)
                serviceLoading(dispatch, false)
                setServiceMode(dispatch, '')
                return
            }
        }
    } catch (err) {
        alert(err)
        return
    }
    editServiceSuccess(dispatch)
    serviceLoading(dispatch, false)
    setServiceMode(dispatch, '')
    NavigationServices.navigate('servicesAdmin')
}

const editServiceSuccess = (dispatch) => {
    dispatch({
        type: CLEAR_SERVICE_FORM,
    })
}

const serviceLoading = (dispatch, data) => {
    dispatch({
        type: SERVICE_LOADING,
        payload: data
    })
}

const setServiceMode = (dispatch, mode) => {
    dispatch({
        type: SET_SERVICE_MODE,
        payload: mode
    })
}

export const setServiceModeExport = (mode) => {
    return {
        type: SET_SERVICE_MODE,
        payload: mode
    }
}

export const clearServiceFormExport = () => {
    return {
        type: CLEAR_SERVICE_FORM,
    }
}

export const startAddService = () => {
    return {
        type: START_ADD_SERVICE,
        payload: 'add'
    }
}