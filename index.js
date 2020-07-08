import React from 'react';
import { AppRegistry, SafeAreaView } from 'react-native';
import Routes from './src/routes/Routes';
import { name as appName } from './app.json';
import { initializeFirebaseApi } from './src/services/FirebaseApi';

const wrappedRoutes = () => {
    return (
        <Routes />
    );
};

AppRegistry.registerComponent(appName, () => {
    initializeFirebaseApi();
    return wrappedRoutes;
});
