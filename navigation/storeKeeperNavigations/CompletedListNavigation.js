/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrderDetailItem from '../../components/item/OrderDetailItem';
import CompletedList from '../../screens/storeKeeperScreens/CompletedList';

const CompletedListStack = createStackNavigator();

const CompletedListNavigation = ({ route, navigation }) => {
    return (
        <CompletedListStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'CompletedList'}
        >
            <CompletedListStack.Screen name="CompletedList" component={CompletedList} />
            <CompletedListStack.Screen name="OrderDetailItem" component={OrderDetailItem} />
        </CompletedListStack.Navigator>
    );
};

export default CompletedListNavigation;
