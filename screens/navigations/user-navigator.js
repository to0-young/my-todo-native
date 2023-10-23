import React from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {Text, View, StyleSheet} from 'react-native';
import Dashboard from '../user/dashboard';
import NewTask from '../user/new-task';
import Chat from '../user/chat';
import {TouchableWithoutFeedback, Image} from 'react-native';
import {logoutRequest} from "../reusable/requests/session/sessionRequest";
import EditTask from "../user/edit-task";
import {createStackNavigator} from "@react-navigation/stack";
import {useDispatch, useSelector} from "react-redux";
import actionCreator from "../store/action-creator";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Settings from "../user/settings";

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
      <DrawerContentScrollView {...props}>
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
    <Drawer.Navigator initialRouteName="Chat" drawerContent={CustomDrawerContent}>

      <Drawer.Screen
        name="Home"
        component={Dashboard}
        options={{
          drawerLabelStyle: {
            fontSize: 16,
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

      <Drawer.Screen
        name="settings"
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

      <Drawer.Screen
        name="Contact"
        component={Chat}
        options={{
          drawerLabelStyle: {
            fontSize: 16,
          },
          drawerIcon: ({ color, size }) => (
            <MaterialIcons
              name="contacts"
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
    <Stack.Navigator>
      <Stack.Screen
        name="Drawer"
        component={Root}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditTask"
        component={EditTask}
      />
    </Stack.Navigator>
  )
};


export default UserNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)'
  },
  userContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#20c2c7',

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
  }
});
