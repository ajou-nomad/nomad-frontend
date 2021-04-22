/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import GroupList from '../screens/GroupList';




const HomeStack = createStackNavigator();

const HomeNavigation = ({route, navigation}) => {


    useEffect( () => {

    }, []);

    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'Home'}
        >
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen name="GroupList" component={GroupList} />
            {/* 채팅방, 뭐 등등 추가시 작성  */}
        </HomeStack.Navigator>
    );
};

export default HomeNavigation;
