import React, { useState } from 'react'
import {View, Text, TextInput,  StyleSheet, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import actionCreator from './../store/action-creator'
// import {sendLoginRequest} from "../reusable/requests/apiRequest";

const SignIn = (props) => {
    const navigation = useNavigation()

    const [user, changeUser] = useState({
        email: '74.boyko@gmail.com',
        password: 'Dior5580',
    })

    const [error, setError] = useState({
        email: '',
        password: '',
    })

    const [errorMsg, setErrorMsg] = useState('')

    const onValidate = () => {
        let valid = true;
        const appError = {
            email: '',
            password: '',
        }

        if (user.email.length < 8) {
            valid = false;
            appError.email = 'Sorry your email is too short'
        }

        if (user.password.length < 1) {
            valid = false;
            appError.password = 'Sorry your password is too short'
        }

        if (!valid) {
            setError(appError)
        }

        return valid
    }

    const onSignIn = async (e) => {
        e.preventDefault()
        if (onValidate()) {
            await onLogIn()
        }
    }

    const onChangeEmail = (email) => {
        changeUser({
            ...user,
            email: email,
        })
    }

    const onChangePassword = (password) => {
        changeUser({
            ...user,
            password: password,
        })
    }


    // const onLogIn = async () => {
    //         const res = await sendLoginRequest(user.email, user.password);
    //
    //     console.log(res)
    //         if (res.ok) {
    //             props.getSessionSuccess()
    //         } else {
    //             setErrorMsg(res.message)
    //         }
    //
    //         return res;
    //
    // };

    const onLogIn = async () => {
        const res = await fetch('http://192.168.1.101:3000/api/v1/sessions', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user.email,
                password: user.password,
            }),
        })

        const json = await res.json()
        if (res.ok) {
            props.getSessionSuccess(json)
        } else {
            setErrorMsg(json.message)
        }

        return json
    }




    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Sign In</Text>

            <TextInput
                value={user.email}
                onChangeText={onChangeEmail}
                placeholder="Email"
                style={styles.input}
            />
            {error.email ? <Text style={styles.errorText}>{error.email}</Text> : null}

            <TextInput
                value={user.password}
                onChangeText={onChangePassword}
                placeholder="Password"
                style={styles.input}
                secureTextEntry
            />
            {error.password ? <Text style={styles.errorText}>{error.password}</Text> : null}

            {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}

            <TouchableOpacity
                style={styles.signInBtn}
                onPress={onSignIn}
            >
                <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>


            <View style={styles.containerLink}>
                <Text
                    style={styles.dontHaveAccount}>Don't have an account ? {''}
                </Text>

                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text
                        style={styles.createOne}>
                        Create one
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        textAlign: 'center',
        height: 45,
        width: 350,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 25,
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    errorMsg: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    signInBtn: {
        backgroundColor: '#041431',
        borderRadius: 20,
        width: '30%',
        padding: 10,
        alignItems: 'center',
        top: 10,
    },
    signInText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    dontHaveAccount: {
        color: 'black',
        fontSize: 18,
    },
    createOne: {
        color: 'red',
        fontSize: 18,
    },
    containerLink: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        top: 10,
    },
    forgotText: {
        color: '#2c8602',
        top: 10,
        fontSize: 18,
    },
});

const ConnectedSignIn = connect(null, actionCreator)(SignIn)
export default ConnectedSignIn