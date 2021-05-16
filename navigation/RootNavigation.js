/* eslint-disable prettier/prettier */

import React,{useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {AuthContext} from '../context/AuthContextProvider';
import {createStackNavigator} from '@react-navigation/stack';

// user 관련
import {SignIn, SignUp, Main} from '../screens/index';
import Tabs from './Tabs';
import CreateGroupDetail from '../screens/group/CreateGroupDetail';
import CreateGroupList from '../screens/group/CreateGroupList';
import StoreDetail from '../screens/store/StoreDetail';
import MenuDetail from '../screens/store/MenuDetail';
import CheckOrder from '../screens/order/CheckOrder';
import Cart from '../screens/order/Cart';
import PaymentNavigation from './PaymentNavigation';
import ChatNavigation from './ChatNavigation';
import Receipt from '../screens/Receipt';
import CreateReview from '../screens/review/CreateReview';

// store 관련
import StoreTabs from './storeKeeperNavigations/Tabs';
import RegisterStore from '../screens/storeKeeperScreens/register/RegisterStore';
import RegisterStoreDetail from '../screens/storeKeeperScreens/register/RegisterStoreDetail';
import RegisterMenuDetail from '../screens/storeKeeperScreens/register/RegisterMenuDetail';
import OrderDetailItem from '../components/storeKeeperComponents/item/OrderDetailItem';

const RootStack = createStackNavigator();
const Stack = createStackNavigator();


const RootNavigation = () => {

    const { state, dispatch } = useContext(AuthContext);

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
    }, [dispatch]);

    console.log(state);

    if (state.isSignIn) { // state.userToken 존재시
        if (state.member.memberType === 'User'){
            return (
                <RootStack.Navigator>
                    <RootStack.Screen
                        name="userStack"
                        component={userStack}
                        options={{ headerShown: false }}
                    />
                </RootStack.Navigator>
            );
        } else if (state.member.memberType === 'Shop'){
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
            <Stack.Screen name="ChatNavigation" component={ChatNavigation} />
            <Stack.Screen name="CreateReview" component={CreateReview} />
            <Stack.Screen name="Receipt" component={Receipt} />
        </Stack.Navigator>
    );
};

const storeKeeperStack = () => {

    if (true){ //점주가 매장등록 했을 때, 안했을 때
        return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={'StoreTabs'}
            >
                <Stack.Screen name="StoreTabs" component={StoreTabs} />
                <Stack.Screen name="OrderDetailItem" component={OrderDetailItem} />
            </Stack.Navigator>
        );
    } else {
        return (
            <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'Register'}
            >
                <Stack.Screen name="Register" component={RegisterStore} />
                <Stack.Screen name="RegisterStoreDetail" component={RegisterStoreDetail} />
                <Stack.Screen name="RegisterMenuDetail" component={RegisterMenuDetail} />
            </Stack.Navigator>
        );
    }
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
