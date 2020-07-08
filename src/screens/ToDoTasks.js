import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { TaskListView } from '../components/Components';
import { readTasksFromFirebaseAsync } from '../services/FirebaseApi';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';

const imgChecList = require('../assets/checklist.png');
const imgPlus = require('../assets/plus.png');

const Icon = ({ name, color }) => (
    <Ionicons
      name={`${Platform.OS === "ios" ? "ios" : "md"}-${name}`} size={24} color={`${color}`}
    />
  )

export default class ToDoTasks extends Component {

    static navigationOptions = {
        tabBarLabel: 'To Do',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="list" color={ tintColor }/>
            // <Image source={imgChecList} style={[styles.icon, { tintColor }]} />
        )
    }

    state = {
        tasks: []
    }

    render() {
        return (
            <View style={styles.container}>
                <TaskListView tasks={this.state.tasks}
                    navigation={this.props.navigation} />
                <TouchableOpacity style={styles.floatButton} onPress={() =>
                    this._goToTask()}>
                    <Image source={imgPlus} style={styles.img} />
                </TouchableOpacity>
            </View>
        );
    }

    _goToTask() {
        this.props.navigation.navigate('pageTask');
    }

    componentDidMount() {
        readTasksFromFirebaseAsync(this._fetchTasks.bind(this));
    }

    _fetchTasks(tasks) {
        const tasksToDo = tasks.filter(t => !t.isDone);
        this.setState({ tasks: tasksToDo });
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#F3F2F0',
    },
    icon: {
        width: 26,
        height: 26
    },
    img: {
        width: 50,
        height: 50
    },
    floatButton: {
        position: 'absolute',
        right: 20,
        bottom: 20
    }
});