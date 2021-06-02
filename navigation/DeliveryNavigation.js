/* eslint-disable prettier/prettier */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CarrierMain from '../screens/carrier/CarrierMain';
import CarrierChatList from '../screens/carrier/CarrierChatList';
import ChatScreen from '../screens/chat/ChatScreen';
import CarrierProfile from '../screens/carrier/CarrierProfile';

const CarrierDrawer = createDrawerNavigator();

const CarrierNavigation = ({route, navigation}) => {

    return (
        <CarrierDrawer.Navigator drawerContent={() => <CarrierProfile />}>
            <CarrierDrawer.Screen name="CarrierMain" component={CarrierMain} />
            <CarrierDrawer.Screen name="CarrierChatList" component={CarrierChatList} initialParams={{groupId:-999}} />
            <CarrierDrawer.Screen name="ChatScreen" component={ChatScreen} />
        </CarrierDrawer.Navigator>
    );
};

export default CarrierNavigation;
