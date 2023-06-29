import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';
import actionCreator from '../store/action-creator';

function ConfirmEmail(props) {
    const navigation = useNavigation();

    useEffect(() => {
        confirmEmail();
    }, []);

    const fetchSession = async () => {
        const getSessions = await fetch('http://192.168.1.110:3000/api/v1/sessions', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await getSessions.json();
        if (getSessions.status === 401) return props.getSessionError();
        props.getSessionSuccess(json);
    };

    const confirmEmail = async () => {
        const confirmToken = navigation.getParam('confirm_token');
        const res = await fetch('http://192.168.1.110:3000/api/v1/users', {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: confirmToken,
            },
            body: JSON.stringify({
                email_confirmed: true,
            }),
        });
        const json = await res.json();
        if (res.ok) {
            await fetchSession();
            navigation.navigate('SignIn');
            ToastAndroid.show('Your mail has been confirmed', ToastAndroid.SHORT);
            return json;
        }
    };

    return null;
}

const ConnectedConfirmEmail = connect(null, actionCreator)(ConfirmEmail);
export default ConnectedConfirmEmail;
