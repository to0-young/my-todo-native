import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NewTask = () => {
  return (
    <View style={styles.container}>
      <Text>NewTask</Text>
    </View>
  );
};

export default NewTask;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
