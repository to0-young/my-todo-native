import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, SafeAreaView, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import actionCreator from "../store/action-creator";
// import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";

const NewTask = () => {

  const [task, setTask] = React.useState({
    title: '',
    description: '',
    priority: 1,
    dueDate: new Date(),
  })

  const changeTitle = (title) => {
    setTask({
      ...task,
      title: title,
    });
  };


  const changeDescription = (description) => {
    setTask({
      ...task,
      description: description
    })
  }

  const changePriority = (priority) => {
    setTask({
      ...task,
      priority: priority
    })
  }

  const onNewTask = async (e) => {
    e.preventDefault();
    // if (onValidation()) {
    //   await handleUpdateTask();
    // }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View>
        <View style={styles.form}>

          {/*{error.title ? <Text style={styles.error}>{error.title}</Text> : null}*/}

          <TextInput
            value={task.title}
            placeholder='Title'
            onChangeText={changeTitle}
            style={styles.input}
          />

          <TextInput
            value={task.description}
            onChangeText={changeDescription}
            placeholder='Description'
            style={styles.input}
          />

          <TextInput
            value={task.priority.toString()}
            style={[styles.input, styles.priorityInput]}
            keyboardType={'numeric'}
            onChangeText={changePriority}
            type={'number'}
          />

          <SafeAreaView>
            <TouchableOpacity
              style={[styles.button, styles.showPickerButton]}
              // onPress={showTimepicker}
            >
              <Text style={styles.showPickerText}>Show time </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.showPickerButton]}
              // onPress={showDatepicker}
            >
              <Text style={styles.showPickerText}>Show date </Text>
            </TouchableOpacity>

            <Text style={styles.dateText}>{task.dueDate.toLocaleString()}</Text>

            {/*{showDatePicker && (*/}
            {/*  <DateTimePickerAndroid*/}
            {/*    value={task.dueDate}*/}
            {/*    mode={currentMode}*/}
            {/*    is24Hour={true}*/}
            {/*    display="default"*/}
            {/*    onChange={onChange}*/}
            {/*  />*/}
            {/*)}*/}
          </SafeAreaView>

          <TouchableOpacity onPress={onNewTask} style={styles.buttonSave}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  )
};


const styles = StyleSheet.create({
  scrollViewContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: 350,
  },
  input: {
    textAlign: 'center',
    height: 45,
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 25,
    fontSize: 18,
  },
  priorityInput: {
    marginBottom: 53,
  },
  button: {
    backgroundColor: 'rgba(24,131,208,0.75)',
    width: 200,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
    alignSelf: 'center',
    top: -20,
  },
  buttonSave: {
    backgroundColor: '#24da09',
    width: 200,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
    alignSelf: 'center',
    top: 22,
  },
  buttonText: {
    color: '#070707',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    top: -15
  },
  showPickerButton: {
    backgroundColor: '#31d0bb',
    width: 200,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  showPickerText: {
    color: '#0c0c0c',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


const ConnectedNewTask = connect(null, actionCreator)(NewTask)
export default ConnectedNewTask