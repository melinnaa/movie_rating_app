import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, LogoTitle } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator }  from '@react-navigation/stack'; 
import { Login } from './src/components/Login';
import { Main } from './src/components/Main';
import { Settings } from './src/components/Settings';
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

export default function App({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ title: 'Movie rating app' }}/>
        <Stack.Screen name="Main" component={Main} 
          options={ ({navigation}) => {
            return {
            title: 'Movie rating app',
            headerRight:() =>
              <Ionicons name={"settings-outline"} size={25}  style={styles.settingsBtn} onPress={()=>navigation.navigate("Settings")}/>
            }
          }}/>
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsBtn: {
    color: "grey",
    marginRight: 20
  }
});
