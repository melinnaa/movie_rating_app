import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Info({route, navigation}) {

  const [movieData, setMovieData] = useState(route.params ? route.params.movieData : "")

  useEffect(() => {
    if (route.params){
      setMovieData(route.params.movieData)
    }
  }, [route.params])

  if (movieData){
      return (
        <View>
            <View> 
              <Image source={{uri: movieData.movieSelected.image}} style = {{height: 500, resizeMode : 'stretch', margin: 5 }}></Image>     
              <Text>{movieData.movieSelected.title}</Text>
              <Text>{movieData.movieSelected.description}</Text>  
              <Button title="Delete" onPress={() => deleteMovie(movieData.movieSelected.id)} />  
            </View>   
            <Button title="Go back" onPress={() => navigation.goBack()} /> 
        </View>
      );
  }
  else {
    return(
      <View>
        <Text style={{color: "grey"}}> No movie selected </Text>
        <Button title="Go back" onPress={() => navigation.goBack()} /> 
    </View>
    )
  }

    async function deleteMovie(key){
      if (confirm("Are you sure to remove this movie ?")){
        try {
          await AsyncStorage.removeItem(key)
        } catch (error) {
          console.log(error, "problemo")
        }
      }
    }
}
