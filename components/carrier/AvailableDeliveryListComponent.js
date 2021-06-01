/* eslint-disable prettier/prettier */
/* eslint-disable no-labels */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {  Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DeliveryItem from './DeliveryItem';

import { createChatRoom } from '../../utils/helper';
import axiosApiInstance from '../../utils/axios';

axiosApiInstance.post('/delivery', {
         groupId: 10,
      }).then((res) => {
         console.log('배달 중 post', JSON.stringify(res.data.data, null, 4));
      }).catch(e => console.log(e));

const AvailableDeliveryListComponent = (props) => {

    const navigation = useNavigation();
    const deliveryInfo = props.deliveryInfo;

    const button = (storeName, deliveryTime, deliveryPlace, groupId) => {
        console.log('storeName: ' + storeName);
        console.log('deliveryTime: ' + deliveryTime);
        console.log('deliveryPlace: ' + deliveryPlace);
        Alert.alert(
            '해당 배달을 선택하시겠습니까?',
            '',
            [
                { text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel' },
                {
                    text: 'YES', onPress: () => {
                        axiosApiInstance.post('/delivery', {
                            groupId: groupId,
                        }).then((res)=>{
                            console.log('배달 중 post', JSON.stringify(res.data.data, null, 4));
                        }).catch((e)=>{
                            console.log(e);
                        })
                        createChatRoom(storeName, deliveryTime, deliveryPlace, navigation)
                        navigation.navigate('ChatScreen', { thread: { '_id': 'GommT2R6HnHV5Ky34Ars', 'latestMessage': { 'createdAt': 1621420397090, 'text': '사진을 보냈습니다.' }, 'name': '매장테스트 10:00 미' } });
                    },
                },
            ]
        );
    };

    return (
        <DeliveryItem deliveryInfo={deliveryInfo} onPress={button}/>
    );
};

export default AvailableDeliveryListComponent;
