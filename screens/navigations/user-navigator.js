import React from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import {Text, View, StyleSheet} from 'react-native';
import Dashboard from '../user/dashboard';
import NewTask from '../user/new-task';
import Chat from '../user/chat';
import {connect} from 'react-redux';
import actionCreator from '../store/action-creator';
import {TouchableWithoutFeedback} from 'react-native';
import {logoutRequest} from "../reusable/requests/session/sessionRequest";
import EditTask from "../user/edit-task";
import {createStackNavigator} from "@react-navigation/stack";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CustomDrawerContent = (props) => {
  const onLogOut = async () => {
    const res = await logoutRequest()
    const json = await res.json()

    if (res.ok) {
      props.deleteSessionSuccess()
    }
    return json
  }

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
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
    <Drawer.Navigator initialRouteName="NewTask" drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerLabelStyle: {
            fontSize: 18,
          },
        }}
      />
      <Drawer.Screen
        name="NewTask"
        component={NewTask}
        options={{
          drawerLabelStyle: {
            fontSize: 18,
          },
        }}
      />
      <Drawer.Screen
        name="Chat"
        component={Chat}
        options={{
          drawerLabelStyle: {
            fontSize: 18,
          },
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

const ConnectedUserNavigator = connect(null, actionCreator)(UserNavigator);
export default ConnectedUserNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutContainer: {
    borderTopWidth: 1,
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
});
