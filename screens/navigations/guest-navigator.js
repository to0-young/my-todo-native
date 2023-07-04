import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignUp from "../guest/sing-up"
import ForgotPassword from "../guest/forgot-password"
import SignIn from "../guest/sign-in"

const Stack = createStackNavigator()

const GuestNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
          />
          <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: false }}
          />
      </Stack.Navigator>

  )
}

export { GuestNavigator }
