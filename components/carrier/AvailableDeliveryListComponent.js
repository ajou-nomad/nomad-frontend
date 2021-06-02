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


const AvailableDeliveryListComponent = (props) => {
    const navigation = useNavigation();
    const deliveryInfo = props.deliveryInfo;

    const button = (storeName, deliveryTime, deliveryPlace, groupId) => {
        console.log('storeName: ' + storeName);
        console.log('deliveryTime: ' + deliveryTime);
        console.log('deliveryPlace: ' + deliveryPlace);
        console.log('groupId: ' + groupId);
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
                            const uidlList = res.data.data;
                            console.log('배달 중 post', JSON.stringify(uidlList, null, 4));
                            createChatRoom(storeName, deliveryTime, deliveryPlace, groupId);
                            navigation.navigate('CarrierChatList',{groupId:groupId});
                        }).catch((e)=>{
                            console.log(e);
                        });

                    },
                },
            ]
        );
    };

    return (
        <>
            <DeliveryItem deliveryInfo={deliveryInfo} onPress={button}/>
        </>
    );
};

export default AvailableDeliveryListComponent;
