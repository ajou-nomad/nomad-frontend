/* eslint-disable prettier/prettier */
import React, {useEffect, useContext} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {WeeklyDelivery, SignIn, SignUp, Main} from './screens/index';
import Tabs from './navigation/Tabs';
import { idTokenChangedListeners } from './utils/helper';
import MyPageNavigation from './navigation/MyPageNavigation';
import {AuthContext} from './context/AuthContextProvider';
import messaging from '@react-native-firebase/messaging';

const Stack = createStackNavigator();

const App = () => {
  // 전역적으로 관리하는 context 및 reducer 사용
  const {state, dispatch} = useContext(AuthContext);
  console.log(state);

  useEffect(() => {
    // Foreground state messages
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // idToken이 바뀌었을 때 실행하는 listener
    // idTokenChangedListeners(state, dispatch); 

    // local store에서 token을 가져와 세션유지 ( 지금은 deviceToken으로 하였음)
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }
      if (userToken !== null) {
        await dispatch({type: 'RESTORE_TOKEN', token: userToken});
      }
    };

    bootstrapAsync();

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      { true !== null ? (
        // MainStack
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Main'}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="WeeklyDelivery" component={WeeklyDelivery} />
          <Stack.Screen name="MyPageNavigation" component={MyPageNavigation} />
        </Stack.Navigator>
      ) : (
        // AuthStack
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'SignIn'}>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
