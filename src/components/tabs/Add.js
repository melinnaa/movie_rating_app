import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image, ScrollView } from 'react-native';
//import { findMoviesByTitle } from '../../services/MoviesService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Add() {
    const [movies, setListMovies] = useState();
    const [movieInput, setMovieInput] = useState("");
    const [movieSelected, setMovieSelected] = useState({});
    const [formData, setForm] = useState({
        movie_id:"",
        synopsis:"",
        comment:"",
        rate:""
    });

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.searchBlock}>
            <TextInput placeholder="Search Movie" value={movieInput} onChangeText={setMovieInput} style={[styles.textInput, {marginRight: 20}]}></TextInput>
            <Button onPress={() => findMovie(movieInput)} title={"Search"} color="black"></Button>
        </View>

        <FlatList
          data={movies}
          renderItem={({item}) => <Text value={item.title} onPress={() => handleSelectedMovie(item)} style={styles.text}>{item.title}</Text>}
          keyExtractor={item => item.id}
        />

        <Image source={{uri: movieSelected.image}} style = {{height: 500, resizeMode : 'stretch', margin: 5 }}></Image>
        <Text style={styles.text}>{movieSelected.title} {movieSelected.description}</Text>
        <TextInput placeholder="My synopsis" onChangeText={setSynopsis} style={styles.textInput}></TextInput>
        <TextInput placeholder="My comment" onChangeText={setComment} style={styles.textInput}></TextInput>
        <TextInput placeholder="My rate /5" onChangeText={setRate} style={[styles.textInput]}></TextInput>
        {/* Note étoilée */}

        <Button onPress={() => validate()} title={"Submit"} color="#04C280"></Button>
      </ScrollView>
    );

    function handleSelectedMovie(item){
        setMovieSelected(item)
        setForm(prevState => {
            return { ...prevState, movie_id: item.id }
        })
    }
    function setSynopsis(input){
        setForm(prevState => {
            return { ...prevState, synopsis: input }
        })
    }

    function setComment(input){
        setForm(prevState => {
            return { ...prevState, comment: input }
        })
    }

    function setRate(input){
        setForm(prevState => {
            return { ...prevState, rate: input }
        })
    }

    function validate(){
        const data = {movieSelected, formData};
        save(movieSelected.id, data);       
    }

    async function save(key,value) {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue);
        } catch (error) {
        // Error saving data
        console.log("problemo")
        }
    }

    function findMovie(title){
        const movies = findMoviesByTitle(title);
        Promise.resolve(movies).then((response) => {
            setListMovies(response);
        });         
    }

    async function findMoviesByTitle(title){
        const urlTitle = 'https://imdb-api.com/en/API/SearchTitle/k_9hxi2rcg/';
        try {
            const resp = await axios.get(urlTitle+title)
            return resp.data.results
        } catch (err) {
            console.error(err);
        }
    }     
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFF7E4',
      padding: 15,
      paddingBottom: 20
    },

    textInput: {
        fontSize: 18,
        backgroundColor: "white",
        padding: 8,
        marginBottom: 15,
    },

    searchBlock: {
        flex: 1,
        flexDirection: 'row'
    },

    text: {
        fontSize: 18,
        padding: 4 
    }

  });