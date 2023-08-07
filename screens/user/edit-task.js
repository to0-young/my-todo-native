import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  SafeAreaView,
  ScrollView
} from 'react-native';
import {connect, useSelector} from "react-redux";
import actionCreator from "../store/action-creator";
import Spinner from "../reusable/spiner";
import {useRoute} from "@react-navigation/native";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';


const EditTask = (props) => {

  const route = useRoute();
  const {taskId} = route.params;
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


  const changeDate = (value) => {
    setTask({
      ...task,
      dueDate: value,
    });
  };


  const onValidation = () => {
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


  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


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

  useEffect(() => {
    getTask();
  }, []);

  const updateTask = async () => {
    const res = await fetch(`http://192.168.1.101:3000/api/v1/tasks/${task.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
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
      headers: {"Content-Type": "application/json"},
    });
    const json = await res.json();
    if (res.ok) {
      props.getTaskSuccess(json)
      setTask({
        ...json,
        dueDate: new Date(json.due_date),
      })

    }
  }

  if (received === false) return <Spinner/>


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View>
        <View style={styles.form}>

          {error.title ? <Text style={styles.error}>{error.title}</Text> : null}

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
            style={[styles.input, styles.priorityInput]}
            keyboardType={'numeric'}
            onChangeText={changePriority}
            placeholder="Priority"
          />

          <SafeAreaView>
            {/*<Button style={styles.showDate} onPress={showDatepicker} title="Show date picker!" />*/}

            <TouchableOpacity
              style={[styles.button, styles.showPickerButton]}
              onPress={showDatepicker}
            >
              <Text style={styles.showPickerText}>Show date picker!</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.showPickerButton]}
              onPress={showTimepicker}
            >
              <Text style={styles.showPickerText}>Show time picker!</Text>
            </TouchableOpacity>

            <Text style={styles.dateText}>{task.dueDate.toLocaleString()}</Text>

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

          <TouchableOpacity onPress={onEditTask} style={styles.buttonSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  )
}

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
    backgroundColor: '#02080e',
    width: 200,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
    alignSelf: 'center',
    top: -20,
  },
  buttonSave: {
    backgroundColor: '#02080e',
    width: 200,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
    alignSelf: 'center',
    top: 22,
  },
  buttonText: {
    color: '#FFFFFF',
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

const ConnectedEditTask = connect(null, actionCreator)(EditTask);
export default ConnectedEditTask;
