import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ActivationMessage from "./activation-messsage/activation-message"

const Stack = createStackNavigator()

const NonActivatedNavigator = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen name="ActivationMessage" component={ActivationMessage} />
            </Stack.Navigator>
    )
}

export  { NonActivatedNavigator }
