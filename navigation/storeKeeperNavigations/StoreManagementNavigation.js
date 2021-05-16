/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StoreManagementMain from '../../screens/storeKeeperScreens/storeManagement/StoreManagementMain';
import StoreManagementDetail from '../../screens/storeKeeperScreens/storeManagement/StoreManagementDetail';
import StoreManagementMenu from '../../screens/storeKeeperScreens/storeManagement/StoreManagementDetail/StoreManagementMenu';
import StoreManagementStore from '../../screens/storeKeeperScreens/storeManagement/StoreManagementDetail/StoreManagementStore';
import StoreManagementReview from '../../screens/storeKeeperScreens/storeManagement/StoreManagementDetail/StoreManagementReview';
import OrderDetailItem from '../../components/storeKeeperComponents/item/OrderDetailItem';

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
            <StoreManagementStack.Screen name="StoreManagementDetail" component={StoreManagementDetail} />
            <StoreManagementStack.Screen name="StoreManagementMenu" component={StoreManagementMenu} />
            <StoreManagementStack.Screen name="StoreManagementStore" component={StoreManagementStore} />
            <StoreManagementStack.Screen name="StoreManagementReview" component={StoreManagementReview} />

        </StoreManagementStack.Navigator>
    );
};

export default StoreManagementNavigation;
