/* eslint-disable prettier/prettier */
/* eslint-disable no-labels */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {  Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DeliveryItem from './DeliveryItem';


const AvailableDeliveryListComponent = (props) => {

    const navigation = useNavigation();
    const deliveryInfo = props.deliveryInfo;

    const button = () => {
        Alert.alert(
            '해당 배달을 선택하시겠습니까?',
            '',
            [
                { text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
                {
                    text: 'YES', onPress: () => {
                        alert('post: change to 배달 중');
                        navigation.navigate('ChatScreen', { thread: { '_id': 'GommT2R6HnHV5Ky34Ars', 'latestMessage': { 'createdAt': 1621420397090, 'text': '사진을 보냈습니다.' }, 'name': '빽다방 아주대점 팔달관 20:30' } });
                    },
                },
            ]
        );
    };

    return (
        <DeliveryItem deliveryInfo={deliveryInfo} onPress={() => button()}/>
    );
};

export default AvailableDeliveryListComponent;
