import React, {useState} from 'react';
import {View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {connect} from "react-redux";
import actionCreator from "../../store/action-creator";
import Icon from "react-native-vector-icons/Ionicons";
import Cards from "./cards";


const Weather = () => {

  const [city, setCity] = useState('')

  const cities = [
    {
      name: 'New Delhi',
      image: require('../../images/360_F_401315941_G0X03EqVjcPDh1ev7G2wEQpZgFyKDsdK.jpg')
    },
    {
      name: 'New York',
      image: require('../../images/NewYork.jpg')
    },
    {
      name: 'London',
      image: require('../../images/London.jpg')
    },
    {
      name: 'Paris',
      image: require('../../images/Paris.jpg')
    },
    {
      name: 'Kyiv',
      image: require('../../images/Kyiv.jpeg')
    },
  ]


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../images/pexels-pierre-blach_-2834219.jpg')}
        style={styles.imageBackground}>
      </ImageBackground>

      <View style={styles.contText}>
        <Text style={styles.text}>Hello</Text>
        <Text style={styles.textSearch}>Search the city by the name </Text>

        <View style={styles.searchContainer}>
          <TextInput
            value={city}
            // onChangeText={(text) => setCity(text)}
            onChange={(val) => setCity(val)}
            style={styles.input}
            placeholder="Search City"
            placeholderTextColor="white"
          />

          <TouchableOpacity onPress={() => {
          }}>
            <Icon name='search' size={20} color='white'/>
          </TouchableOpacity>
        </View>
        <Text style={styles.locations}>My Locations</Text>

        <FlatList
          horizontal
          data={cities}
          renderItem={({ item }) => (
            <Cards name={item.name} image={item.image} />
          )}
        />


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
    backgroundColor: "black",
  },
  contText: {
    position: "absolute",
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: 100,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  textSearch: {
    color: 'white',
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 10,
    paddingHorizontal: 10,
    width: 350,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: 'white',
  },
  locations: {
    color: 'white',
    fontSize: 18,
    paddingHorizontal: 10,
    marginTop: 150,
    marginBottom: 20,
  },
});

const ConnectedWeather = connect(null, actionCreator)(Weather);
export default ConnectedWeather;