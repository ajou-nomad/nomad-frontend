/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../screens/chat/ChatScreen';
import ChatList from '../screens/chat/ChatList';

const Chatstack = createStackNavigator();

const ChatNavigation = ({ route, navigation }) => {
    return (
        <Chatstack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'ChatList'}
        >
            <Chatstack.Screen name="ChatList" component={ChatList} />
            <Chatstack.Screen name="ChatScreen" component={ChatScreen} />
        </Chatstack.Navigator>
    );
};

export default ChatNavigation;
