import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Settings({navigation}) {
    return (
        <View style={styles.container}>
          <Button color="#D51414" onPress={() => clear()} title={"Remove all my movies"}></Button>
        </View>
    );

    async function clear(){
      if (confirm("Are you sure to remove all your movies ?")){
        try {
          const keys = await AsyncStorage.getAllKeys()
          const items = await AsyncStorage.multiRemove(keys)
          return items
        } catch (error) {
            console.log(error, "problemo")
        }
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
  });