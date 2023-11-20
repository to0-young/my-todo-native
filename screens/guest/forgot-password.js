import React from 'react'
import {Text, TextInput, View, StyleSheet, TouchableOpacity, Alert, ImageBackground} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {connect} from "react-redux"
import actionCreator from "../store/action-creator"
import {forgetPasswordRequest} from '../reusable/requests/user/userRequest'

function ForgotPassword() {
  const navigation = useNavigation()

  const [user, setUser] = React.useState({
    email: '74.boyko@gmail.com',
  });

  const [error, setError] = React.useState({
    email: '',
  });

  const onValidate = () => {
    let valid = true;
    const appError = {
      email: '',
    }

    if (user.email.length < 16) {
      valid = false;
      appError.email = 'Sorry, your email is too short'
    }

    if (!valid) {
      setError(appError)
    }

    return valid
  }

  const onForgot = async (e) => {
    e.preventDefault()
    if (onValidate()) {
      await onForget()
    }
  }

  const onChangeEmail = (email) => {
    setUser({
      ...user,
      email: email,
    })
  }

  const onForget = async () => {
    const res = await forgetPasswordRequest(user.email)

    if (res.ok) {
      Alert.alert('We have sent you a password change request');
      navigation.navigate('SignIn')
    }
  };


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('.././images/1.jpg')}
        style={styles.imageBackground}
        resizeMode="cover"
      >

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


        {error.email !== '' && <Text style={styles.error}>{error.email}</Text>}

        <TouchableOpacity style={styles.sendLogBtn} onPress={onForgot}>
          <Text style={styles.buttonText}>Send login link</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkCreate}>Create new account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.linkBack}>Back to login</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#41e00e',
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  input: {
    textAlign: 'center',
    height: 45,
    width: 350,
    color: '#ffffff',
    borderWidth: 1,
    marginBottom: 25,
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  sendLogBtn: {
    backgroundColor: '#041431',
    borderRadius: 20,
    width: '40%',
    padding: 10,
    alignItems: 'center',
    marginBottom: 30,
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
    color: '#000000',
    marginTop: 10,
    fontSize: 17,
  },
  linkBack: {
    color: '#34f804',
    marginTop: 10,
    fontSize: 17,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ConnectedForgotPassword = connect(null, actionCreator)(ForgotPassword)
export default ConnectedForgotPassword