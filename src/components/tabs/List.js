import React, { useState } from 'react';
import { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function fetchData() {
  try {
      const keys = await AsyncStorage.getAllKeys()
      const items = await AsyncStorage.multiGet(keys)
      let array = []
      items.forEach(item => {
        array.push(item[1] != null ? JSON.parse(item[1]) : null);
      });
      return array

  } catch (error) {
      console.log(error, "problemo")
  }
}

export function List({navigation}) {
  
    const [data, setData] = useState(updateData);

    useEffect(() => {
      updateData()
    })
    
    return (
        <ScrollView>
          <FlatList
          data={data}
          renderItem=
          {
            ({item}) => (
              <View>
                <Image source={{uri: item.movieSelected.image}} style = {{height: 500, resizeMode : 'stretch', margin: 5 }}></Image>    
                <Text value={item.movieSelected.id}>
                </Text>
                <Text> {item.formData.synopsis} </Text>
                <Text> {item.formData.comment} </Text>
                <Text> {item.formData.rate} </Text>
                <Button onPress={() => showDetails(item)} title="See details"></Button>
              </View>
              )
    
          }
          keyExtractor={item => item.movieSelected.id}/>
        </ScrollView>
        
    );

    function updateData(){
        if (!data){
            const values = fetchData();
            Promise.resolve(values).then((movies) => {    
              let array = [];   
                movies.forEach(movie => {
                  array.push(movie)
                });
                setData(array)
            });
        }
    }

    function showDetails(item){
      navigation.navigate("Info", { movieData: item })
    }
}