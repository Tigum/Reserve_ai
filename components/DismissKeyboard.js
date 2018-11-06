import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native'

const DismissKeyboard = ({ children, props }) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    )
}

export { DismissKeyboard }