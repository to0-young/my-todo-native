import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignUp from "../guest/sing-up"
import ForgotPassword from "../guest/forgot-password"
import SignIn from "../guest/sign-in"

const Stack = createStackNavigator()

const GuestNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  )
}

export { GuestNavigator }
