import React, {useState} from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {connect} from 'react-redux'
import actionCreator from './../store/action-creator'
import {loginRequest} from "../reusable/requests/session/sessionRequest";

const SignIn = (props) => {
  const navigation = useNavigation()

  const [user, changeUser] = useState({
    email: '74.boyko@gmail.com',
    password: '1',
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


  const onLogIn = async () => {
    const res = await loginRequest(user.email, user.password);

    if (res.ok) {
      const data = await res.json()
      props.getSessionSuccess(data)
    }
  };


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('.././images/1.jpg')}
        style={styles.imageBackground}
        resizeMode="cover"
      >

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
      </ImageBackground>
    </View>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    //   position: "absolute",
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#41ff00',
    top: -30,
  },
  input: {
    textAlign: 'center',
    height: 45,
    width: 350,
    color: '#fffefe',
    borderWidth: 1,
    marginBottom: 25,
    fontSize: 18,

  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  errorMsg: {
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  signInBtn: {
    backgroundColor: '#000000',
    borderRadius: 20,
    width: '30%',
    padding: 10,
    alignItems: 'center',
    top: 10,
  },
  signInText: {
    color: '#f5efef',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dontHaveAccount: {
    color: '#fff8f8',
    margin: 5,
    fontSize: 18,
  },
  createOne: {
    backgroundColor: '#000000',
    borderRadius: 20,
    color: '#ff0000',
    width: 100,
    alignItems: 'center',
    margin: 10,
    fontSize: 15,
    paddingHorizontal: 13,
    paddingVertical: 5,
  },
  containerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 100,
  },
  forgotText: {
    // color: '#ffffff',
    // fontSize: 18,
    top: 100,
    backgroundColor: '#000000',
    borderRadius: 20,
    color: '#3cff01',
    width: 150,
    alignItems: 'center',
    margin: 10,
    fontSize: 15,
    paddingHorizontal: 13,
    paddingVertical: 5,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 700,
  },
});

const ConnectedSignIn = connect(null, actionCreator)(SignIn)
export default ConnectedSignIn