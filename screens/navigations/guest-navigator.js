import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from "./sign-in";
import SignUp from "./sing-up";
import ForgotPassword from "./forgot-password";


const Stack = createNativeStackNavigator();

const GuestNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    );
};

export default GuestNavigator;
