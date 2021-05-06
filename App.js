/* eslint-disable prettier/prettier */
import React, {useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SignIn, SignUp, Main} from './screens/index';
import Tabs from './navigation/Tabs';
import { idTokenChangedListeners } from './utils/helper';
import {AuthContext} from './context/AuthContextProvider';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

import CreateGroupDetail from './screens/group/CreateGroupDetail';
import PaymentNavigation from './navigation/PaymentNavigation';

import CreateGroupList from './screens/group/CreateGroupList';
import StoreDetail from './screens/store/StoreDetail';
import MenuDetail from './screens/store/MenuDetail';
import CheckOrder from './screens/order/CheckOrder';
import Cart from './screens/order/Cart';
import ChatNavigation from './navigation/ChatNavigation';

const Stack = createStackNavigator();

const App = () => {
  // 전역적으로 관리하는 context 및 reducer 사용
  const {state, dispatch} = useContext(AuthContext);
  // console.log(state);

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
    <>
      <NavigationContainer>
        { true !== null ? (
          // MainStack
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={'Main'}>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="CreateGroupDetail" component={CreateGroupDetail} />

            <Stack.Screen name="CreateGroupList" component={CreateGroupList} />
            <Stack.Screen name="StoreDetail" component={StoreDetail} />
            <Stack.Screen name="MenuDetail" component={MenuDetail} />
            <Stack.Screen name="CheckOrder" component={CheckOrder} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="PaymentNavigation" component={PaymentNavigation} />
            <Stack.Screen name="ChatNavigation" component={ChatNavigation} />
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
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default App;
