import React from 'react';
import {Text, TextInput, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {connect} from "react-redux";
import actionCreator from "../store/action-creator";

function ForgotPassword() {
    const navigation = useNavigation();

    const [user, setUser] = React.useState({
        email: '',
    });

    const [error, setError] = React.useState({
        email: '',
    });

    const [errorMsg, setErrorMsg] = React.useState('');

    const onValidate = () => {
        let valid = true;
        const appError = {
            email: '',
        };

        if (user.email.length < 16) {
            valid = false;
            appError.email = 'Sorry, your email is too short';
        }

        if (!valid) {
            setError(appError);
        }

        return valid;
    };

    const onForgot = async (e) => {
        e.preventDefault();
        if (onValidate()) {
            await onForget();
        }
    };

    const onChangeEmail = (email) => {
        setUser({
            ...user,
            email: email,
        });
    };


    const onForget = async () => {
        const res = await fetch('http://192.168.1.101:3000/api/v1/forget_passwords', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user.email,
            }),
        });
        const json = await res.json();
        if (res.ok) {
            Alert.alert('We have sent you a password change request')
            navigation.navigate('SignIn')
        } else {
            setErrorMsg(json.message);
        }

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trouble logging in?</Text>
            <Text style={styles.description}>
                Enter your email, and we'll send you a link to get back into your account.
            </Text>

            <TextInput
                style={styles.input}
                value={user.email}
                onChangeText={onChangeEmail}
                placeholder="Email"
                keyboardType="email-address"
            />

            {errorMsg ? (
                <View style={{ width: '100%' }}>
                    <Alert severity='error'>{errorMsg}</Alert>
                </View>
            ) : null}


            {error.email !== '' && <Text style={styles.error}>{error.email}</Text>}

            <TouchableOpacity style={styles.button} onPress={onForgot}>
                <Text style={styles.buttonText}>Send login link</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.linkCreate}>Create new account</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.linkBack} >Back to login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        width: 350,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#041431',
        borderRadius: 20,
        width: '40%',
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    createNew: {
        fontSize: 14,
        marginTop: 10,
    },
    linkCreate: {
        color: 'red',
        marginTop: 10,
        fontSize: 16,
    },
    linkBack: {
        color: 'green',
        marginTop: 10,
        fontSize: 14,
    }
});

const ConnectedForgotPassword = connect(null, actionCreator)(ForgotPassword)
export default ConnectedForgotPassword