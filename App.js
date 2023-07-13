import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import actionCreator from "./screens/store/action-creator";
import { GuestNavigator } from "./screens/navigations/guest-navigator";
import UserNavigator  from "./screens/navigations/user-navigator";
import { NonActivatedNavigator } from "./screens/navigations/non-activatios-navigator";
import { Provider, connect } from 'react-redux';
import store from './screens/store/store'
import { fetchSessionRequest } from './screens/reusable/requests/apiRequest'


function App (props) {

    const session = useSelector((state) => state.session.details)

    useEffect(() => {
        fetchSession()
    },[])


    const fetchSession = async () => {
        const res = await fetchSessionRequest()

        if (!res.ok) {
            props.getSessionError()
        } else {
            const data = await res.json() // використовується для отримання тіла відповіді на запит у форматі JSON.
            props.getSessionSuccess(data)
        }
    }

    const isGuest = !session
    const isConfirmedUser = session?.user?.email_confirmed


    return (
      <NavigationContainer>
          {isGuest ? (
            <GuestNavigator  />
          ) : !isConfirmedUser ? (

            <NonActivatedNavigator />
          ) : (
            <UserNavigator  />
          )}
          <StatusBar style='auto'/>
      </NavigationContainer>
    )
}
const ConnectedApp = connect(null, actionCreator)(App)

export default function AppWrapper() {
    const appName = 'my-todo-native'

    return (
        <Provider store={store}>
            <ConnectedApp appName={appName} />
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
