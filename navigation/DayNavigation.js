/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DayDelivery from '../screens/DayDelivery';
import GroupList from '../screens/GroupList';
import NewGroup from '../screens/NewGroup';
import CreateGroupList from '../screens/group/CreateGroupList';
import SelectStore from '../screens/group/SelectStore';
import SearchPlace from '../screens/search/SearchPlace';


const DayStack = createStackNavigator();

const DayNavigation = ({route, navigation}) => {

    useEffect( () => {

    }, []);

    return (
        <DayStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'DayDelivery'}
        >
            <DayStack.Screen name="DayDelivery" component={DayDelivery} />
            <DayStack.Screen name="GroupList" component={GroupList} />
            {/* 채팅방, 뭐 등등 추가시 작성  */}
            <DayStack.Screen name="CreateGroupList" component={CreateGroupList} />
            <DayStack.Screen name="SelectStore" component={SelectStore} />
            <DayStack.Screen name="SearchPlace" component={SearchPlace} />
        </DayStack.Navigator>
    );
};

export default DayNavigation;
