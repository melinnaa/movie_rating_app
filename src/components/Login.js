import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export function Login({navigation}) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState("");

    return (
        <View style={styles.container}>
          <Text style={[styles.text, {marginBottom:100}]}> Login </Text>
          <Text style={{color: "red", marginBottom: 30, fontSize:18}}>{message}</Text>
          <TextInput style={[styles.textInput]} placeholder={"Username"} value={username} onChangeText={handleUsername}></TextInput>
          <TextInput style={[styles.textInput, {marginBottom:100}]} placeholder={"Password"} value={password} onChangeText={handlePassword}></TextInput>
          <Button title={"Login"} color="black" onPress={()=> handleSubmit()}></Button>
        </View>
    );

    function handleUsername(input){
        setUsername(input)
    }

    function handlePassword(input){
        setPassword(input)
    }

    function handleSubmit(){
      if (username && username != "" && password && password != ""){
        navigation.navigate("Main")
        setMessage("")
      }
      else {
        setMessage("Enter your username and password")
      }
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF7E4',
      alignItems: 'center',
      justifyContent: 'center',
    },

    text: {
      fontSize: 25,
      textAlign: 'center'
    },

    textInput: {
      fontSize: 18,
      backgroundColor: "white",
      padding: 8,
      marginBottom: 15
    }
  });