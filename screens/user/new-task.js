import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NewTask = () => {
    return (
        <View style={styles.container}>
            <Text>NewTask</Text>
        </View>
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})


export default NewTask
