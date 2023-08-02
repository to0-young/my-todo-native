import React, { useEffect, useState } from 'react';
import { useSelector, connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, FlatList,Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import actionCreator from "../store/action-creator";
import Spinner from "../reusable/spiner";
import {
    deleteTaskRequest,
    getTasksRequest,
    updateTaskRequest,
} from "../reusable/requests/user/userRequest"
import { useNavigation } from '@react-navigation/native';

const Dashboard = (props) => {
    const navigation = useNavigation();
    const tasks = useSelector((state) => state.task.list);
    const fetched = useSelector((state) => state.task.fetched);
    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState(0);



    const [orderAsc, setOrderAsc] = useState('asc')
    const [fieldType, setFieldType] = useState('title')

    const buildIcon = (field) => {
        if (field === fieldType)
            return orderAsc === 'asc' ? <MaterialIcons name="keyboard-arrow-down" size={24} /> :
                <MaterialIcons name="keyboard-arrow-up" size={24} />;
        return null
    };

    const sortByTitle = () => {
        setOrderAsc(orderAsc === 'asc' ? 'desc' : 'asc');
        setFieldType('title')
    };

    const sortByPriority = () => {
        setOrderAsc(orderAsc === 'asc' ? 'desc' : 'asc');
        setFieldType('priority');
    };

    const sortByDueDate = () => {
        setOrderAsc(orderAsc === 'asc' ? 'desc' : 'asc')
        setFieldType('due_date');
    };

    useEffect(() => {
        getTasks(page, orderAsc, fieldType)
    }, [page, fieldType, orderAsc])


    const loadMoreTasks = () => {
        if (page < pagesCount) {
            setPage(page + 1)
        }
    }


    const getTasks = async (page, orderAsc, fieldType) => {
        const res = await getTasksRequest(page, orderAsc, fieldType)
        if (res.ok) {
            const json = await res.json()
            const updatedTasks = page === 1 ? json.tasks : [...tasks, ...json.tasks]
            props.fetchTasksSuccess(updatedTasks)
        }
    }


    const updateCompletedTask = (taskId) => async () => {
        const json = await updateTaskRequest(taskId, true);
        if (json) {
            props.updateTaskSuccess(json);
        }
    };

    const donCompletedTask = (taskId) => async () => {
        const json = await updateTaskRequest(taskId, false);
        if (json) {
            props.updateTaskSuccess(json);
        }
    };


    const deleteTask = async (task) => {
        Alert.alert(
            `Confirm Delete`,
            'Are you sure you want to delete this task?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        const json = await deleteTaskRequest(task.id);
                        if (json) {
                            props.deleteTaskSuccess(task);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };


    if (fetched === false) return <Spinner />

    return (
        <View style={styles.dashboard}>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <TouchableOpacity style={styles.tableHeaderCell} onPress={sortByTitle}>
                        <Text style={styles.tableHeaderText}>Title</Text>
                        <View >{buildIcon('title')}</View>
                    </TouchableOpacity>

                    <Text style={styles.tableHeaderText}>Description</Text>

                    <TouchableOpacity style={styles.tableHeaderCell} onPress={sortByPriority}>
                        <Text style={styles.tableHeaderText}>Priority</Text>
                        <View>{buildIcon('priority')}</View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tableHeaderCell} onPress={sortByDueDate}>
                        <Text style={styles.tableHeaderText}>Due date</Text>
                        <View>{buildIcon('due_date')}</View>
                    </TouchableOpacity>

                    <Text style={styles.tableHeaderText}>Actions</Text>
                </View>


                <FlatList
                    data={tasks}
                    renderItem={({ item }) => {
                        const crossedClass = item.completed ? styles.crossedCell : ''

                        return (
                            <View key={item.id} style={styles.tableRow}>
                                <Text style={[styles.tableCellTitle, crossedClass]}>{item.title}</Text>
                                <Text style={[styles.tableCellDesk, crossedClass]}>{item.description}</Text>
                                <Text style={[styles.tableCellPriority, crossedClass]}>{item.priority}</Text>

                                <Text style={[styles.tableCellDate, crossedClass]}>
                                    {new Date(item.due_date).toLocaleString()}
                                </Text>

                                <View style={[styles.tableCell, styles.taskActions, crossedClass]}>

                                    <TouchableOpacity style={styles.taskButton} onPress={() => deleteTask(item)}>
                                        <MaterialIcons name="delete-forever" size={30} />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => navigation.navigate('EditTaskNavigator', { taskId: item.id })}>
                                        <MaterialIcons name="edit" size={30} />
                                    </TouchableOpacity>

                                    {item.completed ? (
                                        <TouchableOpacity style={styles.taskButton} onPress={ donCompletedTask(item.id)}>
                                            <MaterialIcons name="brightness-1" size={30} />
                                        </TouchableOpacity>

                                    ) : (
                                        <TouchableOpacity style={styles.taskButton} onPress={ updateCompletedTask(item.id)}>
                                            <MaterialIcons name="check-circle-outline" size={30} />
                                        </TouchableOpacity>

                                    )}

                                </View>
                            </View>
                        );
                    }}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    onEndReached={loadMoreTasks}

                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dashboard: {
        flex: 1,
    },
    table: {
        flex: 1,
        padding: 10,
        backgroundColor: '#8ce8e8',
        marginBottom: 10,
    },
    tableHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        borderBottomWidth: 4,
        borderBottomColor: '#e52929',
        paddingBottom: 10,
    },
    tableHeaderText: {
        fontWeight: 'bold',
        marginLeft: 1,
        fontSize: 20,
    },
    tableHeaderCell: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tableRow: {
        flexDirection: 'column',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#14298f',
        paddingVertical: 5,
        marginBottom: 5,
    },
    tableCell: {
        justifyContent: 'center',
        fontSize: 1,
        marginVertical: 2,
    },
    tableCellTitle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    tableCellDesk: {
        fontSize: 17,
    },
    tableCellPriority: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    tableCellDate: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    taskActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    taskButton: {
        marginLeft: 5,
    },
    crossedCell: {
        textDecorationLine: 'line-through',
    },
});

const ConnectedDashboard = connect(null, actionCreator)(Dashboard);
export default ConnectedDashboard;
