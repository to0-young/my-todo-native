import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Text, View, StyleSheet } from 'react-native';
import Dashboard from '../user/dashboard';
import NewTask from '../user/new-task';
import Chat from '../user/chat';
import { connect } from 'react-redux';
import actionCreator from '../store/action-creator';
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from 'react-native';

const Drawer = createDrawerNavigator();

const UserNavigator = (props) => {
    const navigation = useNavigation();

    const onLogOut = async () => {
        const res = await fetch('http://192.168.1.101:3000/api/v1/sessions', {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });
        const json = await res.json();
        if (res.ok) {
            props.deleteSessionSuccess();
            navigation.navigate('SignIn');
        }
        return json;
    }

    const CustomDrawerContent = (props) => {
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
        );
    };

    return (
        <Drawer.Navigator initialRouteName="Dashboard" drawerContent={CustomDrawerContent}>
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
