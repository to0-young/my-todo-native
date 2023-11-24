import React from 'react'
import {TextInput, View, StyleSheet, TouchableWithoutFeedback, Text, Alert, ImageBackground} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {createUserRequest} from '../reusable/requests/user/userRequest'
import * as ImagePicker from 'expo-image-picker';


function SignUp() {

  const navigation = useNavigation()
  const [selectedImage, setSelectedImage] = React.useState(null);


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
      if (user.firstName.length < 3 || user.firstName.length > 15) {
        valid = false
        newError.firstName = 'Your first name should be between 3 and 15 characters'
      }

      if (user.lastName.length < 3 || user.lastName.length > 15) {
        valid = false
        newError.lastName = 'Your last name should be between 3 and 15 characters'
      }

      if (user.email.length < 8 || user.email.length > 30) {
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


  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result)
    }
  }


  const createUser = async () => {
    const formData = new FormData()

    formData.append('avatar', selectedImage)
    formData.append('first_name', user.firstName);
    formData.append('last_name', user.lastName);
    formData.append('password', user.password);
    formData.append('email', user.email);

    const res = await createUserRequest(formData);
    const json = await res.json();

    if (res.ok) {
      Alert.alert('Please confirm your email registration')
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

      <ImageBackground
        source={require('.././images/1.jpg')}
        style={styles.imageBackground}
        resizeMode="cover"
      >

        <Text style={styles.title}>Sign up</Text>

        <TouchableWithoutFeedback  onPress={selectImage}>
          <Text style={styles.avaText}>Avatar</Text>
        </TouchableWithoutFeedback>

        {selectedImage && (
          <Image source={{uri: selectedImage.uri}} style={styles.selectedImage}/>
        )}

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


        <TouchableWithoutFeedback
          onPress={onSignUp}>

          <Text style={styles.createText}>
            Creates
          </Text>
        </TouchableWithoutFeedback>

        <View style={styles.loginContainer}>
          <Text
            style={styles.advice}>Have an account ? {''}
          </Text>

          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text
              style={styles.logIn}>
              Log in
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#41e00e',
    bottom: 30,
    top: 10,
  },
  input: {
    textAlign: 'center',
    height: 45,
    width: 350,
    color: '#ffffff',
    borderWidth: 1,
    marginBottom: 25,
    fontSize: 18,
    top: 40,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  avaText: {
    color: '#05f68a',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#000000',
    borderRadius: 25,
    width: 120,
    textAlign: 'center',
    paddingVertical: 15,
    top: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
  },
  advice: {
    fontSize: 18,
    top: 40,
    color: '#ffffff',
  },
  logIn: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#000000',
    width: 80,
    textAlign: "center",
    borderRadius: 25,
    paddingVertical: 5,
    top: 40,
  },
  imagePickerButton: {
    backgroundColor: '#7208da',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createText: {
    color: '#f80202',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#000000',
    width: 120,
    textAlign: "center",
    borderRadius: 25,
    paddingVertical: 10,
    top: 40,
  },
});

export default SignUp;