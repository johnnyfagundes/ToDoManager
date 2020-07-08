import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCuO4nlNQgx2RpnZt4J3WqOR9yPIZs_nsI",
    authDomain: "todomanager-59f23.firebaseapp.com",
    databaseURL: "https://todomanager-59f23.firebaseio.com",
    projectId: "todomanager-59f23",
    storageBucket: "todomanager-59f23.appspot.com",
    messagingSenderId: "441662678507"
};

export const initializeFirebaseApi = () => firebase.initializeApp(config);

export const createUserOnFirebaseAsync = async (email, password) => {
    const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    return user;
}

export async function signInOnFirebaseAsync(email, password) {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    return user;
}

export const currentFirebaseUser = () => {
    return new Promise((resolve, reject) => {
        var unsubscribe = firebase
            .auth()
            .onAuthStateChanged((user) => {
                resolve(user);
            }, (error) => {
                reject(error);
            }, () => {
                unsubscribe();
            });
    });
}

export async function logoutFirebaseAsync() {
    firebase.auth(user).signOut();
}

export async function signOutUser() {
    try {
        await firebase.auth().signOut();
        navigate('pageLogin');
    } catch (e) {
        console.log(e);
    }
}

export const writeTaskOnFirebaseAsync = async (task) => {
    const user = await currentFirebaseUser();
    var tasksReference = firebase
        .database()
        .ref(user.uid);


    const key = task.key ? task.key : tasksReference
            .child('tasks')
            .push()
            .key;

    return await tasksReference
        .child(`tasks/${key}`)
        .update(task);
}

// export const writeTaskOnFirebaseAsync = async (task) => {
//     const user = await currentFirebaseUser();
//     var tasksReference = firebase
//         .database()
//         .ref(user.uid);
//     const key = tasksReference
//         .child('tasks')
//         .push()
//         .key;
//     return await tasksReference
//         .child(`tasks/${key}`)
//         .update(task);
// }

export const readTasksFromFirebaseAsync = async (listener) => {
    const user = await currentFirebaseUser();
    var tasksReference = firebase
        .database()
        .ref(user.uid)
        .child('tasks');
    tasksReference
        .on('value', (snapshot) => {
            var tasks = [];
            snapshot.forEach(function (element) {
                var task = element.val();
                task.key = element.key;
                tasks.push(task);
            });
            listener(tasks);
        });
}