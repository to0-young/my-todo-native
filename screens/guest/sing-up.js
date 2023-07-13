import React from 'react'
import {TextInput, View, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { createUserRequest } from '../reusable/requests/apiRequest'

function SignUp() {

    const navigation = useNavigation()

    const [user, changeUser] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const [error, changeError] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })


    const onValidate = () => {
        return () => {
            let valid = true
            const newError = {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            }
            if (user.firstName.length < 3 || user.firstName.length > 15 ) {
                valid = false
                newError.firstName = 'Your first name should be between 3 and 15 characters'
            }

            if (user.lastName.length < 3 || user.lastName.length > 15 ) {
                valid = false
                newError.lastName = 'Your last name should be between 3 and 15 characters'
            }

            if (user.email.length < 8 || user.email.length > 30 ) {
                valid = false
                newError.email = 'Your email should be between 8 and 30 characters'
            }

            if (user.password.length < 1) {
                valid = false
                newError.password = 'Sorry your password is too short'
            }

            if (!valid) {
                changeError(newError)
            }
            return valid
        }
    }


    const onSignUp = async (e) => {
        e.preventDefault()
        if (onValidate()()) {
            await createUser()
        }
    }

    const onChangeFirstName = (firstName) => {
        changeUser({
            ...user,
            firstName: firstName
        })
    }

    const onChangeLastName = (lastName) => {
        changeUser({
            ...user,
            lastName: lastName
        })
    }

    const onChangeEmail = (email) => {
        changeUser({
            ...user,
            email: email
        })
    }

    const onChangePassword = (password) => {
        changeUser({
            ...user,
            password: password
        })
    }


    const createUser = async () => {
        const formData = new FormData()

        // formData.append('avatar', file)
        formData.append('first_name', user.firstName);
        formData.append('last_name', user.lastName);
        formData.append('password', user.password);
        formData.append('email', user.email);

        const res = await createUserRequest(formData);
        const json = await res.json();

        if (res.ok) {
            Alert.alert('Please confirm your email registration');
            navigation.navigate('SignIn');
        } else {
            if (json.errors) {
                const firstError = json.errors.first_name === undefined ? '' : json.errors.first_name[0],
                  lastError = json.errors.last_name === undefined ? '' : json.errors.last_name[0],
                  emailError = json.errors.email === undefined ? '' : json.errors.email[0],
                  passwordError = json.errors.password === undefined ? '' : json.errors.password[0];
                changeError({
                    firstName: firstError,
                    lastName: lastError,
                    password: passwordError,
                    email: emailError,
                });
            }
        }

        return json;
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign up</Text>

            <TextInput
                style={styles.input}
                placeholder="First name"
                value={user.firstName}
                onChangeText={onChangeFirstName}
            />
            {error.firstName ? <Text style={styles.error}>{error.firstName}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Last name"
                value={user.lastName}
                onChangeText={onChangeLastName}
            />
            {error.lastName ? <Text style={styles.error}>{error.lastName}</Text> : null}


            <TextInput
                style={styles.input}
                placeholder="Email"
                value={user.email}
                onChangeText={onChangeEmail}
            />
            {error.email ? <Text style={styles.error}>{error.email}</Text> : null}


            <TextInput
                style={styles.input}
                placeholder="Password"
                value={user.password}
                onChangeText={onChangePassword}
                secureTextEntry
            />
            {error.password ? <Text style={styles.error}>{error.password}</Text> : null}



            <TouchableOpacity
                style={styles.onSignUp}
                onPress={onSignUp}>

                <Text style={styles.buttonText}>
                    Creates
                </Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
                <Text
                    style={styles.advice}>Have an account ? {''}
                </Text>

                <TouchableOpacity
                    onPress={() =>  navigation.navigate('SignIn')}
                >
                    <Text
                        style={styles.link}>
                        Log in
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
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
    error: {
        color: 'red',
        marginBottom: 10,
    },
    onSignUp: {
        backgroundColor: '#041431',
        borderRadius: 20,
        // width: '30%',
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        // fontWeight: 'bold',
        textAlign: 'center',
        width: 100,
        fontSize: 16,
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
    },
    advice: {
        fontSize: 18,
    },
    link: {
        color: '#f10000',
        fontSize: 18,
    },
});

export default SignUp;