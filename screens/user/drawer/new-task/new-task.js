import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import {connect} from "react-redux";
import actionCreator from "../../../store/action-creator";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
// import {useRoute} from "@react-navigation/native";

const NewTask = (props) => {
  // const route = useRoute();
  // const {taskId} = route.params;

  const [currentMode, setCurrentMode] = useState('date')
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [task, setTask] = React.useState({
    title: '',
    description: '',
    priority: '',
    dueDate: new Date(),
  })


  const [error, setError] = React.useState({
    title: '',
    description: '',
    priority: '',
    dueDate: '',
  })


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
      setError(appError)
    }
    return valid
  }


  const onChangeTitle = (title) => {
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

  const changeDate = (value) => {
    setTask({
      ...task,
      dueDate: value,
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


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || task.dueDate;
    setShowDatePicker(false);
    changeDate(currentDate);
    setTask({
      ...task,
      dueDate: currentDate,
    });
  };

  const onNewTask = async (e) => {
    e.preventDefault();
    if (onValidation()) {
      await postTask();
    }
  };


  const postTask = async () => {
    const res = await fetch('http://192.168.1.101:3000/api/v1/tasks', { // Work
    // const res = await fetch('http://192.168.1.112:3000/api/v1/tasks', { // Home
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        priority: task.priority,
        due_date: task.dueDate,
      }),
    })
    const json = await res.json()
    if (res.ok) {
      props.navigation.navigate('Dashboard')
    }
    return json
  }


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>

      <ImageBackground
        source={require('../../.././images/1.jpg')}
        style={styles.imageBackground}
      >

        <Text style={styles.headerText}>You`re welcome </Text>
        <Text style={styles.headerText}>Create your first tasks </Text>

        <View style={styles.form}>

          {error.title ? <Text style={styles.error}>{error.title}</Text> : null}

          <TextInput
            value={task.title}
            placeholder='Title'
            onChangeText={onChangeTitle}
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
            style={[styles.input]}
            keyboardType={'numeric'}
            onChangeText={changePriority}
            type={'number'}
          />

          <TouchableOpacity
            style={[styles.showPickerButton]}
            onPress={showTimepicker}
          >
            <Text style={styles.showPickerText}>Show time </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[ styles.showPickerButton]}
            onPress={showDatepicker}
          >
            <Text style={styles.showPickerText}>Show date </Text>
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
          <TouchableOpacity onPress={onNewTask} style={styles.saveBtn}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  )
};


const styles = StyleSheet.create({
  scrollViewContent: {
    flex: 1,
  },
  form: {
    width: 350,
  },
  headerText: {
    color: '#08caec',
    fontSize: 30,
    fontWeight: "bold",
  },
  input: {
    textAlign: 'center',
    height: 45,
    borderWidth: 1,
    marginBottom: 25,
    fontSize: 18,
    top: 20,
  },
  saveBtn: {
    backgroundColor: '#000000',
    width: 150,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    top: 50,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 35
  },
  showPickerButton: {
    backgroundColor: '#31d0bb',
    width: 120,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    top: 10,
  },
  showPickerText: {
    color: '#0c0c0c',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 700,
  },
});


const ConnectedNewTask = connect(null, actionCreator)(NewTask)
export default ConnectedNewTask