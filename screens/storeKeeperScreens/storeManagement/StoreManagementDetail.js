/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ManagementAction from '../../../components/store/ManagementAction';

const StoreManagementDetail = () => {
    return (
        <View>
            <ManagementAction ActionType="StoreManagementMenu" />
            <ManagementAction ActionType="StoreManagementStore" />
            <ManagementAction ActionType="StoreManagementReview" />
        </View>
    );
};

export default StoreManagementDetail;
