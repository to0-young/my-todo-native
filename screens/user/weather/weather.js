import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView, ScrollView
} from 'react-native';
import {connect} from "react-redux";
import actionCreator from "../../store/action-creator";
import Icon from "react-native-vector-icons/Ionicons";
import Cards from "./cards";


const Weather = (props) => {

  const [city, setCity] = useState('')

  const cities = [
    {
      name: 'Kyiv',
      image: require('../../images/Kyiv.jpeg')
    },
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

  ]

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="hight" enabled>
        <ImageBackground
          source={require('../../images/1631043.jpg')}
          style={styles.imageBackground}>

          <View style={styles.contText}>
            <Text style={styles.text}>Hello</Text>
            <Text style={styles.textSearch}>Search the city by the name </Text>
            <Text style={styles.locations}>My Locations</Text>

            <FlatList
              horizontal
              data={cities}
              renderItem={({item}) => (
                <Cards name={item.name} image={item.image} navigation={props.navigation}/>
              )}
            />
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              value={city}
              onChangeText={(text) => setCity(text)}
              style={styles.input}
              placeholder="Search City"
              placeholderTextColor="white"
            />

            <TouchableOpacity onPress={() => props.navigation.navigate('Details', {name: city})}>
              <Icon name='search' size={20} color='white'/>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
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
    // justifyContent: 'center',
    padding: 5,
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
    width: 370,
    marginBottom: 260,
  },
  input: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: 320,
    color: 'white',

  },
  locations: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    paddingHorizontal: 10,
    paddingTop: 240,
    marginBottom: 10,
  },
});

const ConnectedWeather = connect(null, actionCreator)(Weather);
export default ConnectedWeather;
