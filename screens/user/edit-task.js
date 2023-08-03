import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const EditTask = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 1,
    dueDate: new Date(),
  });

  const [error, setError] = useState({
    title: '',
    priority: '',
  });

  // const onValidation = () => {
  //   let valid = true;
  //   const appError = {
  //     title: '',
  //     priority: '',
  //   };
  //   if (task.title.length < 3) {
  //     valid = false;
  //     appError.title = 'Sorry, your title is missing';
  //   }
  //   if (!valid) {
  //     setError(appError);
  //   }
  //   return valid;
  // };

  const onEditTask = (e) => {
    e.preventDefault();
    if (onValidation()) {
      updateTask();
    }
  };

  const changeTitle = (value) => {
    setTask((task) => ({ ...task, title: value }));
  };

  const changeDescription = (value) => {
    setTask((task) => ({ ...task, description: value }));
  };

  const changePriority = (value) => {
    setTask((task) => ({ ...task, priority: value }));
  };

  const changeDate = (_, selectedDate) => {
    setTask((task) => ({ ...task, dueDate: selectedDate || task.dueDate }));
  };



  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {

    const taskData = {
      title: '',
      description: '',
      priority: '',
      dueDate: new Date(),
    };
    setTask(taskData);
  };

  return (
    <View style={styles.editTask}>
      <View style={styles.form}>

        <TextInput
          value={task.title}
          error={!!error.title}
          helperText={error.title}
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
          style={[styles.input, styles.priorityInput]}
          keyboardType={'numeric'}
          onChangeText={changePriority}
          placeholder="Priority"
        />


        <TouchableOpacity onPress={onEditTask} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editTask: {
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
  datePicker: {
    marginBottom: 16,
  },
  priorityInput: {
    marginBottom: 53,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditTask;
