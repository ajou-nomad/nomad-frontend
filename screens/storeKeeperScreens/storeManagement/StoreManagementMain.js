/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';
import Store from '../../../components/store/Store';

const StoreManagementMain = () => {
     /*FlatList로 변경 필요 */
    return (
        <View>
            <Text>매장 관리</Text>
            <Store storeName="TempStoreName1"/>
            <Store storeName="TempStoreName2"/>
            <Store storeName="TempStoreName3"/>
            <Store storeName="TempStoreName4"/>
            <Store storeName="TempStoreName5"/>
        </View>
    );
};

export default StoreManagementMain;
