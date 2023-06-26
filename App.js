import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import actionCreator from "./screens/store/action-creator";
import GuestNavigator from "./screens/navigations/guest-navigator";
import UserNavigator from "./screens/navigations/user-navigator";
import { Provider, connect } from 'react-redux';
import store from './screens/store/store';

const App = (props) => {
    const session = useSelector((state) => state.session.details);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchSession();
    }, []);

    const fetchSession = async () => {
        const getSessions = await fetch('https://192.168.1.109:3000/api/v1/sessions', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await getSessions.json();
        if (getSessions.status === 401) {
            dispatch(props.getSessionError());
        } else {
            dispatch(props.getSessionSuccess(json));
        }
    };

    const isGuest = !session;
    const isConfirmedUser = session?.user.email_confirmed;

    return (
        <NavigationContainer>
            <StatusBar/>
            {isGuest ? (
                <GuestNavigator />
            ) : !isConfirmedUser ? (
                <NonActivatedRoutes />
            ) : (
                <UserNavigator />
            )}
        </NavigationContainer>
    );
};

const ConnectedApp = connect(null, actionCreator)(App);

export default function AppWrapper() {
    const appName = 'my-todo-native';

    return (
        <Provider store={store}>
            <ConnectedApp appName={appName} />
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
