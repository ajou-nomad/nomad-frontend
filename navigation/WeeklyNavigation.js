/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TimeTable from '../screens/TimeTable';
import WeeklyGroupListParent from '../components/weekly/WeeklyGroupListParent';
import WeeklyGroupListChild from '../components/weekly/WeeklyGroupListChild';
import CreateGroupList from '../screens/group/CreateGroupList';
import SearchPlace from '../screens/search/SearchPlace';
import { WeeklyDelivery } from '../screens';
import StoreDetail from '../screens/store/StoreDetail';
import MenuDetail from '../screens/store/MenuDetail';
import CheckOrder from '../screens/order/CheckOrder';
import Cart from '../screens/order/Cart';


const WeeklyStack = createStackNavigator();

const WeeklyNavigation = ({route, navigation}) => {


    useEffect( () => {

    }, []);

    return (
        <WeeklyStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'WeeklyDelivery'}
        >
            <WeeklyStack.Screen name="WeeklyDelivery" component={WeeklyDelivery} />
            <WeeklyStack.Screen name="TimeTable" component={TimeTable}/>
            <WeeklyStack.Screen name="WeeklyGroupListParent" component={WeeklyGroupListParent}/>
            <WeeklyStack.Screen name="WeeklyGroupListChild" component={WeeklyGroupListChild} />
            <WeeklyStack.Screen name="SearchPlace" component={SearchPlace} />
            {/* 채팅방, 뭐 등등 추가시 작성  */}
        </WeeklyStack.Navigator>
    );
};

export default WeeklyNavigation;
