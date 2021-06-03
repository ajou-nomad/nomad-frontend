/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
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
import MyReview from '../screens/review/MyReview';

// store 관련
import StoreTabs from './storeKeeperNavigations/Tabs';
import RegisterStore from '../screens/storeKeeperScreens/register/RegisterStore';
import RegisterStoreDetail from '../screens/storeKeeperScreens/register/RegisterStoreDetail';
import RegisterMenuDetail from '../screens/storeKeeperScreens/register/RegisterMenuDetail';
import Receipt from '../screens/Receipt';
import CreateReview from '../screens/review/CreateReview';
import SearchPlace from '../screens/search/SearchPlace';

import DeliveryNavigation from './DeliveryNavigation';
import Promotion from '../screens/Promotion';


const RootStack = createStackNavigator();
const Stack = createStackNavigator();



const RootNavigation = () => {

    const {state} = useContext(AuthContext);

    if (state.isSignedIn) {
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
                        component={StoreKeeperStack}
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
            <Stack.Screen name="SearchPlace" component={SearchPlace} />
            <Stack.Screen name="CreateGroupDetail" component={CreateGroupDetail} />

            <Stack.Screen name="CreateGroupList" component={CreateGroupList} />
            <Stack.Screen name="StoreDetail" component={StoreDetail} />
            <Stack.Screen name="MenuDetail" component={MenuDetail} />
            <Stack.Screen name="CheckOrder" component={CheckOrder} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="PaymentNavigation" component={PaymentNavigation} />
            <Stack.Screen name="ChatNavigation" component={ChatNavigation} />
            <Stack.Screen name="CreateReview" component={CreateReview} />
            <Stack.Screen name="MyReview" component={MyReview} />
            <Stack.Screen name="Receipt" component={Receipt} />
            <Stack.Screen name="Promotion" component={Promotion} />
        </Stack.Navigator>
    );
};

const StoreKeeperStack = () => {

    const {state} = useContext(AuthContext);

    if (state.member.storeId) {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={'StoreTabs'}
            >
                <Stack.Screen name="StoreTabs" component={StoreTabs} />
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


                {/* 임시 */}
                <Stack.Screen name="StoreTabs" component={StoreTabs} />
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
            initialRouteName={'DeliveryNavigation'}
        >
            <Stack.Screen name="DeliveryNavigation" component={DeliveryNavigation} />
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
