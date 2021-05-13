/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StoreManagementMain from '../../screens/storeKeeperScreens/StoreManagementMain';


const StoreManagementStack = createStackNavigator();

const StoreManagementNavigation = ({ route, navigation }) => {
    return (
        <StoreManagementStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'StoreManagementMain'}
        >
            <StoreManagementStack.Screen name="StoreManagementMain" component={StoreManagementMain} />
        </StoreManagementStack.Navigator>
    );
};

export default StoreManagementNavigation;
