import React from 'react'
import {Text, TextInput, View, StyleSheet, TouchableWithoutFeedback, Alert, ImageBackground} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {connect} from "react-redux"
import actionCreator from "../store/action-creator"
import {forgetPasswordRequest} from '../reusable/requests/user/userRequest'

function ForgotPassword() {
  const navigation = useNavigation()

  const [user, setUser] = React.useState({
    email: '',
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

        <TouchableWithoutFeedback  onPress={onForgot}>
          <Text style={styles.sendText}>Send login link</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkCreate}>Create new account</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.linkBack}>Back to login</Text>
        </TouchableWithoutFeedback>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#41e00e',
    bottom: 30,
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
  sendText: {
    color: '#f5f4f4',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#000000',
    borderRadius: 25,
    width: 160,
    textAlign: 'center',
    paddingVertical: 15,
  },
  linkCreate: {
    backgroundColor: '#000000',
    borderRadius: 20,
    color: '#f60101',
    width: 180,
    alignItems: 'center',
    fontSize: 15,
    paddingHorizontal: 22,
    paddingVertical: 5,
    top: 140,
  },
  linkBack: {
    backgroundColor: '#000000',
    borderRadius: 20,
    color: '#3ef602',
    width: 120,
    alignItems: 'center',
    fontSize: 15,
    paddingHorizontal: 16,
    paddingVertical: 5,
    top: 165,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ConnectedForgotPassword = connect(null, actionCreator)(ForgotPassword)
export default ConnectedForgotPassword