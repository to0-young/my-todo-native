import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {API_KEY} from "./constants";

export default function Details(props) {
  const {name} = props.route.params
  const [data, setData] = useState()

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`,
    )
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err))
  }, []);

  const Data = ({title, value}) => <View style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  }}>
    <Text style={{color: 'white', fontSize: 22, paddingHorizontal: 100}}>{title}</Text>
    <Text style={{color: 'white', fontSize: 22, paddingHorizontal: 100}}>{value}</Text>
  </View>

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../images/1631043.jpg')}
        style={styles.imageBackground}>
      </ImageBackground>

      <View style={styles.contText}>
        {data ? (
          <View style={styles.centeredText}>
            <Text style={{color: 'white', fontSize: 55}}>{name}</Text>
            <Text style={{fontSize: 22, color: 'white'}}>{data['weather'][0]['main']}</Text>
            <Text style={{
              color: 'white',
              fontSize: 60,
              paddingTop: 100
            }}>{(data['main']['temp'] - 273).toFixed(2)}&deg; C </Text>

            <Text style={{color: 'white', fontSize: 22, paddingTop: 100}}>Weather Details</Text>

            <View>
              <Data value={data['wind']['speed']} title='Wind' />
              <Data value={data['main']['pressure']} title='Pressure' />
              <Data value={`${data['main']['humidity']}%`} title='Humidity' />
              <Data value={data['visibility']} title='Visibility' />
            </View>

          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
    backgroundColor: 'black',
  },
  contText: {
    position: 'absolute',
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: 1,
    padding: 10,
    width: '100%',
    height: '100%',
  },
  centeredText: {
    paddingTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

