import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import ConfirmEmail from '../../components/user/confirm-email/confirm-email';
// import ActivationMessage from './activation-routes/activation-message';

const Stack = createStackNavigator();

const NonActivatedNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/*<Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />*/}
                {/*<Stack.Screen name="ActivationMessage" component={ActivationMessage} />*/}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NonActivatedNavigator;
