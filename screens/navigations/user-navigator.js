import React from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';
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

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.details.user);

  const onLogOut = async () => {
    const res = await logoutRequest()
    const json = await res.json()

    if (res.ok) {
      dispatch(actionCreator.deleteSessionSuccess())
    }
    return json
  }


  return (
    <View style={styles.container}>

      <DrawerContentScrollView {...props} >

        <ImageBackground source={require('../images/sun-summer-blue-sky.jpg')}
          style={styles.imageBackground}>

        <View style={styles.userContainer}>

            <Image
              source={{ uri: user.avatar.url }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
            <Text style={styles.userName}>{user.first_name}</Text>
        </View>
        </ImageBackground>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableWithoutFeedback onPress={onLogOut}>
        <View style={styles.logoutContainer}>
          <Text style={styles.logoutText}>Logout</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}


const Root = () => {
  return (
    <Drawer.Navigator initialRouteName="Weather" drawerContent={CustomDrawerContent}>

      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerLabelStyle: {
            fontSize: 20,
            color: "black",
          },
          drawerIcon: ({ color, size }) => (
            <MaterialIcons
              name="home"
              size={size}
              // color={color}
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
        name="Chat"
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

      {/*<Drawer.Screen*/}
      {/*  name="Map"*/}
      {/*  component={Map}*/}
      {/*  options={{*/}
      {/*    drawerLabelStyle: {*/}
      {/*      fontSize: 16,*/}
      {/*    },*/}
      {/*    drawerIcon: ({ color, size }) => (*/}
      {/*      <MaterialIcons*/}
      {/*        name="map"*/}
      {/*        size={size}*/}
      {/*        color={color}*/}
      {/*      />*/}
      {/*    ),*/}
      {/*  }}*/}
      {/*/>*/}

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
    marginTop: -5,
    backgroundColor: 'rgb(255,255,255)',
  },

  userContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },

  logoutContainer: {
    borderTopColor: 'lightgray',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#20c2c7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoutText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userName: {
    color: '#000000',
    fontSize: 18,
    paddingVertical: 16,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
