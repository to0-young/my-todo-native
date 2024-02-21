import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import {connect, useSelector} from "react-redux";
import actionCreator from "../../../store/action-creator";
import Spinner from "../../../reusable/spiner";
import {useRoute} from "@react-navigation/native";
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker'
import {fetchEditTask, updateEditTask} from "../../../reusable/requests/user/userRequest";

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
      await handleUpdateTask();
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

  useEffect(() => {
    getTask();
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || task.dueDate;
    setShowDatePicker(false);
    changeDate(currentDate);
    setTask({
      ...task,
      dueDate: currentDate,
    });
  };

  const handleUpdateTask = async () => {
    const updatedTask = await updateEditTask(task);
    if (updatedTask) {
      Alert.alert('Task updated');
      props.navigation.navigate('Dashboard');
      props.updateTaskSuccess(updatedTask);
    }
  };

  const getTask = async () => {
    const taskData = await fetchEditTask(taskId);
    if (taskData) {
      props.getTaskSuccess(taskData)
      setTask({
        ...taskData,
        dueDate: new Date(taskData.due_date),
      });
    }
  };

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
            value={task.priority.toString()}
            style={[styles.input, styles.priorityInput]}
            keyboardType={'numeric'}
            onChangeText={changePriority}
            type={'number'}
          />
          <TouchableOpacity
            style={[styles.button, styles.showPickerButton]}
            onPress={showTimepicker}
          >
            <Text style={styles.showPickerText}>Show time </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.showPickerButton]}
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
