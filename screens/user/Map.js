import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {connect} from "react-redux";
import actionCreator from "../store/action-creator";

function Map(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});


const ConnectedMap = connect(null, actionCreator)(Map);
export default ConnectedMap;
