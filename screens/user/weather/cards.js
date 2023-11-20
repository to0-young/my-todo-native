import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';


export function Cards({name, image, navigation}) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Details', {name})}
      style={{marginHorizontal: 10,}}>
      <ImageBackground
        source={image}
        style={{height: 150, width: 150}}
        imageStyle={{borderRadius: 16}}
      />
      <View
        style={
        {position: "absolute",
          height: '100%',
          width: '100%',}}
      >
        <Text style={{
          flex: 1,
          fontSize: 28,
          // width: '100%',
          // height: '100%',
          textAlign: "center",
          textAlignVertical: "center",
          color: "black",
          paddingBottom: 100,
        }}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default Cards;

