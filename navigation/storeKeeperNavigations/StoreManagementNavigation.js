/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StoreManagementMain from '../../screens/storeKeeperScreens/storeManagement/StoreManagementMain';
import StoreManagementNotice from '../../screens/storeKeeperScreens/storeManagement/StoreManagementDetail/StoreManagementNotice';
import StoreManagementMenu from '../../screens/storeKeeperScreens/storeManagement/StoreManagementDetail/StoreManagementMenu';
import StoreManagementReview from '../../screens/storeKeeperScreens/storeManagement/StoreManagementDetail/StoreManagementReview';
import Menu from '../../screens/storeKeeperScreens/storeManagement/StoreManagementDetail/Menu';

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
            <StoreManagementStack.Screen name="StoreManagementNotice" component={StoreManagementNotice} />
            <StoreManagementStack.Screen name="StoreManagementMenu" component={StoreManagementMenu} />
            <StoreManagementStack.Screen name="StoreManagementReview" component={StoreManagementReview} />
            <StoreManagementStack.Screen name="Menu" component={Menu} />
        </StoreManagementStack.Navigator>
    );
};

export default StoreManagementNavigation;
