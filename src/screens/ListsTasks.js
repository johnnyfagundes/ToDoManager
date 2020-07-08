
import React, {Component} from 'react';
import { ToDoTasks, DoneTasks } from '../screens/Screens';
import { createAppContainer,createBottomTabNavigator } from 'react-navigation';
import { NavigationActions, StackActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { signOutUser } from '../services/FirebaseApi';

const TaskListTabNavigator = createAppContainer(createBottomTabNavigator({
    pageToDoTasks: { screen: ToDoTasks, title: 'To Do' },
    pageDoneTasks: { screen: DoneTasks, title: 'Done' }
}));

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'pageLogin' })],
});

export default class ListsTasks extends Component{
    

    static navigationOptions = ({ navigation }) => ({
        title: "Task List",
        headerRight: <Ionicons onPress={() => {
            navigation.dispatch(resetAction);
            signOutUser();
        }}
            style={{ marginRight: 20 }} name="md-exit" size={24} />
    });

    render(){
        return (<TaskListTabNavigator/>);
    }

}