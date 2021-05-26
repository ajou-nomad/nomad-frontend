/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RequestList from '../../screens/storeKeeperScreens/RequestList';
import OrderDetailItem from '../../components/item/OrderDetailItem';

const RequestListStack = createStackNavigator();

const RequestListNavigation = ({ route, navigation }) => {
    return (
        <RequestListStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'RequestList'}
        >
            <RequestListStack.Screen name="RequestList" component={RequestList} />
            <RequestListStack.Screen name="OrderDetailItem" component={OrderDetailItem} />
        </RequestListStack.Navigator>
    );
};

export default RequestListNavigation;
