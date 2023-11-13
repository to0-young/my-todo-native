import React from 'react';
import { View, Text } from 'react-native';

export default function Details(props)  {
  const {name} = props.route.params
  return (
    <View>
      <Text style={{fontSize: 16 }}>{name}</Text>
    </View>
  );
};




