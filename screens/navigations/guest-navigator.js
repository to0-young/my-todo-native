import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from "../guest/sign-in";
import SignUp from "../guest/sing-up";
import ForgotPassword from "../guest/forgot-password";


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
