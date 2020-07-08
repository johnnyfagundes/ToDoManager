import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { App, Login, Register, ToDoTasks, DoneTasks, Task } from '../screens/Screens';
import { NavigationActions, StackActions } from 'react-navigation';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { signOutUser } from '../services/FirebaseApi';

const taskListTabNavigator = createBottomTabNavigator({
    pageToDoTasks: { screen: ToDoTasks, title: 'To Do' },
    pageDoneTasks: { screen: DoneTasks, title: 'Done' }
});

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'pageLogin' })],
});

navigationOptions = ({ navigation }) => ({
    title: "Task List",
    headerRight: <Ionicons onPress={() => {
        navigation.dispatch(resetAction);
        signOutUser();
    }}
        style={{ marginRight: 20 }} name="md-exit" size={24} />
});

export default Routes = createAppContainer(createStackNavigator(
    {
        pageApp: { screen: App },
        pageLogin: { screen: Login },
        pageRegister: { screen: Register },
        pageTasksList: {
            screen: taskListTabNavigator,
            navigationOptions: navigationOptions,
            // navigationOptions: {
            //     ...Platform.select({
            //         ios: {
            //             title: 'Task List',
            //             headerRight: (
            //                 <Ionicons onPress={() => console.log(this.navigation)} style={{ marginRight: 20 }} name="md-exit" size={24} />
            //             ),
            //         },
            //         android: {
            //             header: null
            //         }
            //     })
            // }
        },
        pageTask: { screen: Task }
    }, {
        headerMode: 'screen',
    }
));

