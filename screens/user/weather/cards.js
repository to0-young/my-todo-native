import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';


export function Cards({name, image}) {
  return (
    <TouchableOpacity onPress={() => {}}
      style={{marginHorizontal: 10,}}>
      <ImageBackground
        source={image}
        style={{height: 150, width: 150}}
        imageStyle={{borderRadius: 16}}
      />
      <View style={{position: "absolute", height: '100%', width: '100%',}}>
        <Text style={{
          fontSize: 28,
          width: '100%',
          height: '100%',
          textAlign: "center",
          textAlignVertical: "center",
          color: "black",
          paddingBottom: 95,
        }}>{name} </Text>
      </View>
    </TouchableOpacity>
  );
}

export default Cards;

