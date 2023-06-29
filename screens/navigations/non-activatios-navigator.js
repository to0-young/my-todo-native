import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ConfirmEmail from "../user/confirm-email";

const Stack = createStackNavigator();

const NonActivatedNavigator = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
                {/*<Stack.Screen name="ActivationMessage" component={ActivationMessage} />*/}
            </Stack.Navigator>
    );
};

export default NonActivatedNavigator;
