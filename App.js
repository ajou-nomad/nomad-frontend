/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useContext} from 'react';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './navigation/RootNavigation';
import {AuthContext} from './context/AuthContextProvider';
import { GoogleSignin } from '@react-native-community/google-signin';
import { FIREBASE_WEBCLIENTID } from '@env';
import { autoLogin } from './utils/helper';
import Splash from './components/Splash';


const App = () => {

    const {dispatch} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);


    const checkLogin = () => {
        autoLogin(dispatch)
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
    };

    useEffect(() => {

        GoogleSignin.configure({
            webClientId: FIREBASE_WEBCLIENTID,
            offlineAccess: true, //if you want to access Google API on behalf of the user FROM YOUR SERVER
        });

        setTimeout(checkLogin, 2000);


        // Foreground state messages
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {
            Toast.show({
                type: 'success',
                position: 'top',
                text1: remoteMessage.notification.title,
                text2: remoteMessage.notification.body,
                visibilityTime: 6000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        });

        return unsubscribe;
    }, []);

    return (
        <>
            {isLoading ? (
                <>
                    <Splash />
                    <Toast ref={(ref) => Toast.setRef(ref)} />
                </>
            ) : (
            <>
                <NavigationContainer>
                <RootNavigation />
                </NavigationContainer>
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </>
            )}
        </>
    );
};

export default App;
