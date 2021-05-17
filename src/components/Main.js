import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Add } from './tabs/Add'
import { List } from './tabs/List'
import { Info } from './tabs/Info' 
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export function Main() {
  
  const customTabBarStyle = {
    activeTintColor: 'black',
    inactiveTintColor: 'gray',
    style: {backgroundColor: 'white', paddingBottom: 20, paddingTop:20, height: 65},
}

    return (
        <Tab.Navigator
        tabBarOptions={customTabBarStyle}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case "Add":
                iconName = focused ? "add-circle" : "add-circle-outline";
                break;
              case "List":
                iconName = focused ? "list-circle" : "list-circle-outline";
                break;
              case "Info":
                iconName = focused ? "eye" : "eye-outline";
                break;
              default:
                iconName = "ban";
                break;
            }
            return <Ionicons name={iconName} size={size} color={color}/>;
          },
        })}
        >
            <Tab.Screen name="Add" component={Add} options={{tabBarLabel: ''}}/>
            <Tab.Screen name="List" component={List} unmountOnBlur={true} options={{tabBarLabel: '', unmountOnBlur: true}}/>
            <Tab.Screen name="Info" component={Info} options={{tabBarLabel: ''}}/>
        </Tab.Navigator>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });