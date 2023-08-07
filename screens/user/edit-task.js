import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Button, SafeAreaView} from 'react-native';
import {connect, useSelector} from "react-redux";
import actionCreator from "../store/action-creator";
import Spinner from "../reusable/spiner";
import {useRoute} from "@react-navigation/native";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';


const EditTask = (props) => {

  const route = useRoute();
  const { taskId } = route.params;
  const received = useSelector((state) => state.task.received)
  const [currentMode, setCurrentMode] = useState('date')

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 1,
    dueDate: new Date().toISOString()
  });

  const [error, changeError] = React.useState({
    title: '',
    description: '',
    priority: '',
    dueDate: '',
  })


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || task.dueDate;
    setShowDatePicker(false);
    changeDate(currentDate);
    setTask({
      ...task,
      dueDate: currentDate,
    });
  };


  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: task.dueDate,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  const changeDate = (value) => {
    setTask({
      ...task,
      dueDate: value,
    });
  };


  const onValidation =  () => {
    let valid = true
    const appError = {
      title: "",
      priority: "",
      dueDate: "",
    }
    if (task.title.length < 3) {
      valid = false
      appError.title = "Sorry, your title is missing"
    }
    if (task.priority.length < 1) {
      valid = false
      appError.priority = "Sorry your priority is missing"
    }
    if (!valid) {
      changeError(appError)
    }
    return valid
  }


  const onEditTask = async (e) => {
    e.preventDefault();
    if (onValidation()) {
      await updateTask();
    }
  };


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

  useEffect(() => {
    getTask();
  }, []);

  const updateTask = async () => {
    const res = await fetch(`http://192.168.1.101:3000/api/v1/tasks/${task.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        priority: task.priority,
        due_date: task.dueDate,
      }),
    });
    const json = await res.json();

    if (res.ok) {
      Alert.alert("Task updated");
      props.navigation.navigate("Dashboard");
      props.updateTaskSuccess(json)
      return json;
    }
  }

  const getTask = async () => {
    const res = await fetch(`http://192.168.1.101:3000/api/v1/tasks/${taskId}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const json = await res.json();
    if (res.ok) {
      props.getTaskSuccess(json)
      setTask({...json,
        dueDate: new Date(json.due_date),
      })

    }
  }

  if (received === false) return <Spinner/>


  return (
    <View style={styles.editTask}>
      <View style={styles.form}>

        <TextInput
          value={task.title}
          placeholder='Title'
          onChangeText={changeTitle}
          style={styles.input}
        />
        {error.title ? <Text style={styles.error}>{error.title}</Text> : null}

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

        <SafeAreaView>
          <Button onPress={showDatepicker} title="Show date picker!" />
          <Button onPress={showTimepicker} title="Show time picker!" />
          <Text> {task.dueDate.toLocaleString()}</Text>

          {showDatePicker && (
            <DateTimePickerAndroid
              value={task.dueDate}
              mode={currentMode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </SafeAreaView>

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
  priorityInput: {
    marginBottom: 53,
  },
  button: {
    backgroundColor: '#02080e',
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

const ConnectedEditTask = connect(null, actionCreator)(EditTask);
export default ConnectedEditTask;
