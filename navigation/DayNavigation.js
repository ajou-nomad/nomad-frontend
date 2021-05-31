/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DayDelivery from '../screens/DayDelivery';
import GroupList from '../screens/GroupList';


const DayStack = createStackNavigator();

const DayNavigation = ({route, navigation}) => {
    useEffect( () => {

    }, []);

    return (
        <DayStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <DayStack.Screen name="DayDelivery" component={DayDelivery} />
            <DayStack.Screen name="GroupList" component={GroupList} />
        </DayStack.Navigator>
    );
};

export default DayNavigation;
