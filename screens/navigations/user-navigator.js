import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "../user/home";

const Drawer = createDrawerNavigator();

const UserNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
               <Home/>
                {/* <Drawer.Screen name="Dashboard" component={Dashboard} /> */}
                {/* <Drawer.Screen name="NewTask" component={NewTask} /> */}
                {/* <Drawer.Screen name="Chat" component={Chat} /> */}
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default UserNavigator;
