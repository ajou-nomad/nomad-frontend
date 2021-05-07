/* eslint-disable prettier/prettier */

import React,{useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {AuthContext} from '../context/AuthContextProvider';
import {createStackNavigator} from '@react-navigation/stack';


import {SignIn, SignUp, Main} from '../screens/index';
import Tabs from './Tabs';
import CreateGroupDetail from '../screens/group/CreateGroupDetail';
import CreateGroupList from '../screens/group/CreateGroupList';
import StoreDetail from '../screens/store/StoreDetail';
import MenuDetail from '../screens/store/MenuDetail';
import CheckOrder from '../screens/order/CheckOrder';
import Cart from '../screens/order/Cart';
import PaymentNavigation from './PaymentNavigation';

import storeKeeperMain from '../screens/storeKeeperScreens/Main';
import RegisterStore from '../screens/storeKeeperScreens/RegisterStore';
import RegisterStoreDetail from '../screens/storeKeeperScreens/RegisterStoreDetail';



const RootStack = createStackNavigator();
const Stack = createStackNavigator();


const RootNavigation = () => {

    const {state, dispatch} = useContext(AuthContext);

    useEffect(() => {
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
    }, []);


    if (true !== null) { // state.userToken 존재시
        if (state.userType === '유저'){
            return (
                <RootStack.Navigator>
                    <RootStack.Screen
                        name="userStack"
                        component={userStack}
                        options={{ headerShown: false }}
                    />
                </RootStack.Navigator>
            );
        } else if (state.userType === '점주'){

            return (
                <RootStack.Navigator>
                    <RootStack.Screen
                        name="storeKeeperStack"
                        component={storeKeeperStack}
                        options={{ headerShown: false }}
                    />
                </RootStack.Navigator>
            );
        } else {
            return (
                <RootStack.Navigator>
                    <RootStack.Screen
                        name="carrierStack"
                        component={carrierStack}
                        options={{ headerShown: false }}
                    />
                </RootStack.Navigator>
            );
        }
    } else {
        return (
            <RootStack.Navigator>
                <RootStack.Screen
                    name="authStack"
                    component={authStack}
                    options={{ headerShown: false }}
                />
            </RootStack.Navigator>
        );
    }
};


const userStack = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        initialRouteName={'Main'}
        >
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="CreateGroupDetail" component={CreateGroupDetail} />

            <Stack.Screen name="CreateGroupList" component={CreateGroupList} />
            <Stack.Screen name="StoreDetail" component={StoreDetail} />
            <Stack.Screen name="MenuDetail" component={MenuDetail} />
            <Stack.Screen name="CheckOrder" component={CheckOrder} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="PaymentNavigation" component={PaymentNavigation} />
        </Stack.Navigator>
    );
};

const storeKeeperStack = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        initialRouteName={'Register'}
        >
            <Stack.Screen name="Register" component={RegisterStore} />
            <Stack.Screen name="RegisterStoreDetail" component={RegisterStoreDetail} />
        </Stack.Navigator>
    );
};

const carrierStack = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        initialRouteName={'Main'}
        >
            <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
    );
};


const authStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'SignIn'}
        >
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    );
};

export default RootNavigation;