/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CarrierMain from '../screens/carrier/CarrierMain';
import DeliveryChatPage from '../screens/carrier/DeliveryChatPage';
import ChatScreen from '../screens/chat/ChatScreen';


const CarrierStack = createStackNavigator();

const CarrierNavigation = ({route, navigation}) => {

    return (
        <CarrierStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'CarrierMain'}
        >
            <CarrierStack.Screen name="CarrierMain" component={CarrierMain} />
            <CarrierStack.Screen name="DeliveryChatPage" component={DeliveryChatPage} />
            <CarrierStack.Screen name="ChatScreen" component={ChatScreen} />
        </CarrierStack.Navigator>
    );
};

export default CarrierNavigation;
