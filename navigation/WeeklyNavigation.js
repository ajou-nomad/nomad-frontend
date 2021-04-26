/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import TimeTable from '../screens/TimeTable';
import WeeklyGroupListParent from '../components/weekly/WeeklyGroupListParent';
import WeeklyGroupListChild from '../components/weekly/WeeklyGroupListChild';
import CreateGroupList from '../screens/group/CreateGroupList';


const WeeklyStack = createStackNavigator();

const WeeklyNavigation = ({route, navigation}) => {


    useEffect( () => {

    }, []);

    return (
        <WeeklyStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'Home'}
        >
            <WeeklyStack.Screen name="Home" component={Home} initialParams={{IsWeekly:true}} />
            <WeeklyStack.Screen name="TimeTable" component={TimeTable}/>
            <WeeklyStack.Screen name="WeeklyGroupListParent" component={WeeklyGroupListParent}/>
            <WeeklyStack.Screen name="WeeklyGroupListChild" component={WeeklyGroupListChild} />
            <WeeklyStack.Screen name="CreateGroupList" component={CreateGroupList} />
            {/* 채팅방, 뭐 등등 추가시 작성  */}
        </WeeklyStack.Navigator>
    );
};

export default WeeklyNavigation;
