/* eslint-disable prettier/prettier */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CarrierMain from '../screens/carrier/CarrierMain';
import DeliveryChatPage from '../screens/carrier/DeliveryChatPage';
import ChatScreen from '../screens/chat/ChatScreen';
import CarrierProfile from '../screens/carrier/CarrierProfile';
import DeliveryList from '../screens/carrier/DeliveryList';

const CarrierDrawer = createDrawerNavigator();

const CarrierNavigation = ({route, navigation}) => {

    return (
        <CarrierDrawer.Navigator drawerContent={() => <CarrierProfile />}>
            <CarrierDrawer.Screen name="CarrierMain" component={CarrierMain} />
            <CarrierDrawer.Screen name="DeliveryChatPage" component={DeliveryChatPage} />
            <CarrierDrawer.Screen name="ChatScreen" component={ChatScreen} />
            <CarrierDrawer.Screen name="DeliveryList" component={DeliveryList} />
        </CarrierDrawer.Navigator>
    );
};

export default CarrierNavigation;
