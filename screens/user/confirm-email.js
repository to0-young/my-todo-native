import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';

const ConfirmEmail = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        confirmEmail();
    }, []);

    const fetchSession = async () => {
        const getSessions = await fetch('http://192.168.1.101:3000/api/v1/sessions', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await getSessions.json();
        if (getSessions.status === 401) return dispatch(getSessionError());
        dispatch(getSessionSuccess(json));
    };

    const confirmEmail = async () => {
        const confirmToken = queryString.parseUrl(route.params.confirmUrl).query.confirm_token;
        const res = await fetch('http://192.168.1.101:3000/api/v1/users', {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', Authorization: confirmToken },
            body: JSON.stringify({
                email_confirmed: true,
            }),
        });
        const json = await res.json();
        if (res.ok) {
            await fetchSession();
            navigation.navigate('SignIn');
            Alert.alert('Your mail has been confirmed');
            return json;
        }
    };

    return null;
};

export default ConfirmEmail;
