import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView, ScrollView, SafeAreaView
} from 'react-native';
import {connect} from "react-redux";
import actionCreator from "../../store/action-creator";
import Icon from "react-native-vector-icons/Ionicons";
import Cards from "./cards";


const Weather = (props) => {

  const [city, setCity] = useState('')
  const [error, setError] = useState(null)

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
      <ImageBackground
        source={require('../../images/1631043.jpg')}
        style={styles.imageBackground}
      >
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : -200}
          enabled
        >
          <View style={styles.contText}>
            <Text style={styles.text}>Hello</Text>
            <Text style={styles.textSearch}>Search the city by the name </Text>
          </View>

          <Text style={styles.locations}>My Locations</Text>
          <FlatList
            horizontal
            data={cities}
            renderItem={({item}) => (
              <Cards name={item.name} image={item.image} navigation={props.navigation}/>
            )}
          />


          <View style={styles.searchContainer}>
            <TextInput
              value={city}
              onChangeText={(text) => setCity(text)}
              style={styles.input}
              // placeholder="Search City"
              // placeholderTextColor="white"
            />
            <TouchableOpacity
              onPress={() => {
                if (city.trim() !== "") {
                  props.navigation.navigate('Details', {name: city});
                  setError(null);
                } else {
                  setError("Поле для пошуку не може бути порожнім");
                }
              }}
            >
              <Icon name='search' size={30} color='white'/>
            </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    // flex: 1,
    position: "absolute",
    backgroundColor: "black",
    padding: 5,
    paddingBottom: 100,
  },
  contText: {
    justifyContent: 'center',
    marginVertical: 80,
    padding: 1,
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 8,
  },
  textSearch: {
    color: 'white',
    fontSize: 20,
  },
  locations: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 10,
    padding: 10,
    marginTop: 170,
  },
  searchContainer: {
    position: "absolute",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 170,
    paddingHorizontal: 10,
    padding: 6,
    width: 400,
  },
  input: {
    width: 345,
    color: 'white',
    fontSize: 20,
  },
});


const ConnectedWeather = connect(null, actionCreator)(Weather);
export default ConnectedWeather;
