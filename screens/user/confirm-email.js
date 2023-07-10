import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import actionCreator from '../store/action-creator';

const ConfirmEmail = (props) => {
    const navigation = useNavigation();

    useEffect(() => {
        confirmEmail();
    }, []);

    const fetchSession = async () => {
        const getSessions = await fetch('http://192.168.31.101:3000/api/v1/sessions', {
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
        const confirmToken = props.navigation.getParam('confirmToken', '');
        const res = await fetch('http://192.168.31.101:3000/api/v1/users', {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Authorization: confirmToken },
            body: JSON.stringify({
                email_confirmed: true,
            }),
        });
        const json = await res.json()
        if (res.ok) {
            await fetchSession();
            navigation.navigate('SignIn')
            Alert.alert('Your mail has been confirmed')
            return json
        }
    };

    return null;
};

const ConnectedConfirmEmail = connect(null, actionCreator)(ConfirmEmail);
export default ConnectedConfirmEmail;
