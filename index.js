/* eslint-disable prettier/prettier */
/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AuthContextProvider from './context/AuthContextProvider';
import messaging from '@react-native-firebase/messaging';



// Background & Quit state messages
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

const RNProvider = () => (
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
);

AppRegistry.registerComponent(appName, () => RNProvider);
