import React, {useEffect, useState} from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {Text, View, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import Dashboard from '../user/drawer/dashboard/dashboard';
import NewTask from '../user/drawer/new-task/new-task';
import Chat from '../user/drawer/chat/chat';
import Weather from "../user/drawer/weather/weather";
import {TouchableWithoutFeedback, Image} from 'react-native';
import {logoutRequest} from "../reusable/requests/session/sessionRequest";
import EditTask from "../user/drawer/edit-task/edit-task";
import {createStackNavigator} from "@react-navigation/stack";
import {useDispatch, useSelector} from "react-redux";
import actionCreator from "../store/action-creator";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Map from "../user/drawer/map/Map";
import Details from "../user/drawer/weather/details";
import Settings from "../user/drawer/settings/settings";
import * as ImagePicker from 'expo-image-picker';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.details.user);

  const onLogOut = async () => {
    const res = await logoutRequest();
    const json = await res.json();

    if (res.ok) {
      dispatch(actionCreator.deleteSessionSuccess());
    }
    return json;
  };

  const updateAvatarRequest = async (newAvatarUri) => {
    const formData = new FormData();
    const key = `avatar_${Date.now()}.jpg`;

    formData.append('avatar', {
      uri: newAvatarUri,
      type: 'image/jpeg',
      name: key,
    });

    // const res = await fetch(`http://192.168.1.101:3000/api/v1/users/update`, {
    const res = await fetch(`http://192.168.31.101:3000/api/v1/users/update`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error('Failed to update avatar');
    }

    const updatedUser = await res.json();
    dispatch(actionCreator.updateSessionSuccess(updatedUser))

  };


  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      await updateAvatarRequest(selectedImage.uri);

    }
  };



  return (
    <View style={styles.container
      <DrawerContentScrollView {...props}>
        <ImageBackground source={require('../images/sun-summer-blue-sky.jpg')} style={styles.imageBackground}>
          <View style={styles.userContainer}>
            <Image
              key={user.id}
              source={{ uri: user.avatar.url }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />

            <TouchableOpacity onPress={selectImage}>
              <MaterialIcons name="add-a-photo" size={26} color="black" />
            </TouchableOpacity>


            <Text style={styles.userName}>{user.first_name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </ImageBackground>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableWithoutFeedback onPress={onLogOut}>
        <View style={styles.logoutContainer}>
          <Text style={styles.logoutText}>Logout</Text>
          <MaterialIcons name="logout" size={26} color="black" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};


const Root = () => {
  return (
    <Drawer.Navigator initialRouteName="Message" drawerContent={CustomDrawerContent}>

      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerLabelStyle: {
            fontSize: 20,
            // color: "black",
          },
          drawerIcon: ({ color, size }) => (
            <MaterialIcons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="NewTask"
        component={NewTask}
        options={{
          drawerLabelStyle: {
            fontSize: 16,
          },
          drawerIcon: ({ color, size }) => (
            <MaterialIcons
              name="assignment"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Message"
        component={Chat}
        options={{
          drawerLabelStyle: {
            fontSize: 16,
          },
          drawerIcon: ({ color, size }) => (
            <MaterialIcons
              name="message"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Map"
        component={Map}
        options={{
          drawerLabelStyle: {
            fontSize: 16,
          },
          drawerIcon: ({ color, size }) => (
            <MaterialIcons
              name="map"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Weather"
        component={Weather}
        options={{
          drawerLabelStyle: {
            fontSize: 16,
          },
          drawerIcon: ({ color, size }) => (
            <MaterialIcons
              name="cloud"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/*<Drawer.Screen*/}
      {/*  name="Help"*/}
      {/*  component={Help}*/}
      {/*  options={{*/}
      {/*    drawerLabelStyle: {*/}
      {/*      fontSize: 16,*/}
      {/*    },*/}
      {/*    drawerIcon: ({ color, size }) => (*/}
      {/*      <MaterialIcons*/}
      {/*        name="help"*/}
      {/*        size={size}*/}
      {/*        color={color}*/}
      {/*      />*/}
      {/*    ),*/}
      {/*  }}*/}
      {/*/>*/}

      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerLabelStyle: {
            fontSize: 16,
          },
          drawerIcon: ({ color, size }) => (
            <MaterialIcons
              name="settings"
              size={size}
              color={color}
            />
          ),
        }}
      />

    </Drawer.Navigator>
  );
}

const UserNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen
        name="Drawer"
        component={Root}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditTask"
        component={EditTask}
      />
      <Stack.Screen
        name="Details"
        component={Details}
      />
    </Stack.Navigator>
  )
};


export default UserNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
    marginTop: -5,
  },

  userContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },

  logoutContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    width: 130,
    paddingHorizontal: 15,
    margin: 12,
  },
  logoutText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 18,
  },
  userName: {
    color: '#000000',
    fontSize: 22,
    paddingVertical: 16,
  },
  userEmail:{
    color: '#000000',
    fontSize: 16,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
