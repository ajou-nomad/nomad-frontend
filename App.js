/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import { idTokenChangedListeners } from './utils/helper';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './navigation/RootNavigation';


const App = () => {

  useEffect(() => {
    // Foreground state messages
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(JSON.stringify(remoteMessage));
      Toast.show({
        type: 'success',
        position: 'top',
        text1: '배달 알림',
        text2: '배달모집이 완료되었습니다. 👋',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    });

    // idToken이 바뀌었을 때 실행하는 listener
    // idTokenChangedListeners(state, dispatch);

    return unsubscribe;
  }, []);

  return (
    <>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default App;
