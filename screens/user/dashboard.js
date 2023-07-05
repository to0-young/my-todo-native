import React, {useEffect, useState} from 'react'
import {useSelector, connect} from 'react-redux'
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
import actionCreator from "../store/action-creator"
import Spinner from "../reusable/spiner";

const Dashboard = (props) => {
    const tasks = useSelector((state) => state.task.list)
    const fetched = useSelector((state) => state.task.fetched)
    const [page, setPage] = useState(1)
    const [pagesCount, setPagesCount] = useState()

    const [orderAsc, setOrderAsc] = useState('asc')
    const [fieldType, setFieldType] = useState('title')

    const buildIcon = (field) => {
        if (field === fieldType)
            return orderAsc === 'asc' ? <MaterialIcons name="keyboard-arrow-down" size={24}/> :
                <MaterialIcons name="keyboard-arrow-up" size={24}/>
        return null
    }

    const sortByTitle = () => {
        setOrderAsc(orderAsc === 'asc' ? 'desc' : 'asc')
        setFieldType('title')
    }

    const sortByPriority = () => {
        setOrderAsc(orderAsc === 'asc' ? 'desc' : 'asc')
        setFieldType('priority')
    }

    const sortByDueDate = () => {
        setOrderAsc(orderAsc === 'asc' ? 'desc' : 'asc')
        setFieldType('due_date')
    }

    const onChangePagination = (_, page) => {
        setPage(page)
    }

    useEffect(() => {
        getTasks(page)
    }, [page, fieldType, orderAsc])



    const getTasks = async (page) => {
        const res = await fetch(
            `http://192.168.1.101:3000/api/v1/tasks?per_page=10&page=${page}&sort_order=${orderAsc}&sort_field=${fieldType}`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
            }
        )
        const json = await res.json()
        if (res.ok) {
            setPagesCount(json.pagy.pages)
            props.fetchTasksSuccess(json.tasks)
        }
        return json
    }

    const updateCompletedTask = (taskId) => async () => {
        const res = await fetch(`http://192.168.1.101:3000/api/v1/tasks/${taskId}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                completed: true,
            }),
        })
        const json = await res.json()
        if (res.ok) {
            props.updateTaskSuccess(json)
            return json
        }
    }

    const donCompletedTask = (taskId) => async () => {
        const res = await fetch(`http://192.168.1.101:3000/api/v1/tasks/${taskId}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                completed: false,
            }),
        })
        const json = await res.json()
        if (res.ok) {
            props.updateTaskSuccess(json)
            return json
        }
    }

    const deleteTask = (task) => async () => {
        if (window.confirm(`Are you sure you want to delete task with ID ${task.id}`)) {
            const res = await fetch(`http://192.168.1.101:3000/api/v1/tasks/${task.id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
            })
            const json = await res.json()
            if (res.ok) {
                props.deleteTaskSuccess(task)
            }
            return json
        }
    }

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

                <ScrollView>
                    <View style={styles.tableBody}>
                        {Array.isArray(tasks) && tasks.map((row, index) => {
                            const crossedClass = row.completed ? styles.crossedCell : '';
                            return (
                                <View key={index} style={styles.tableRow}>
                                    <Text style={[styles.tableCellTitle, crossedClass]}>{row.title}</Text>
                                    <Text style={[styles.tableCellDesk, crossedClass]}>{row.description}</Text>
                                    <Text style={[styles.tableCellPriority, crossedClass]}>{row.priority}</Text>
                                    <Text
                                        style={[styles.tableCellDate, crossedClass]}>{new Date(row.due_date).toLocaleString()}</Text>
                                    <View style={[styles.tableCell, styles.taskActions, crossedClass]}>
                                        <TouchableOpacity style={styles.taskButton} onPress={deleteTask(row)}>
                                            <MaterialIcons name="delete-forever" size={30}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('EditTask', {taskId: row.id})}>
                                            <MaterialIcons name="edit" size={30}/>
                                        </TouchableOpacity>
                                        {row.completed ? (
                                            <TouchableOpacity style={styles.taskButton}
                                                              onPress={donCompletedTask(row.id)}>
                                                <MaterialIcons name="brightness-1" size={30}/>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity style={styles.taskButton}
                                                              onPress={updateCompletedTask(row.id)}>
                                                <MaterialIcons name="check-circle-outline" size={30}/>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}


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
        // backgroundColor: 'red',
    },



    tableBody: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
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
        fontSize: 18,
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
    pagination: {
        alignItems: 'center',
        marginTop: 10,
    },
})

const ConnectedDashboard = connect(null, actionCreator)(Dashboard)
export default ConnectedDashboard