/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FONTS2, icons, COLORS } from '../../constants';
import Header from '../../components/layout/Header';
import OrderItem from '../../components/item/OrderItem';
import axiosApiInstance from '../../utils/axios';

const RequestList = () => {

    const [groupOrder, setGroupOrder] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', async () => {
            // 오늘날짜의 배달 그룹만
            axiosApiInstance.get('/deliveryGroupOrder')
                .then(function (response) {
                    console.log('점주 주문 리스트 요청: ', JSON.stringify(response.data.data, null, 4));
                    setGroupOrder(response.data.data);
                }).catch((e) => console.log(e));
        });

        //unmount 시 리스너 삭제
        return unsubscribe;
    }, []);


    return (
        <View style={styles.container}>
            <Header title="주문 리스트" small="true" />
            <FlatList
                data={groupOrder}
                keyExtractor={item => item.groupId.toString()}
                renderItem={({ item }) => <OrderItem item={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
});

export default RequestList;






// dummy Data
// const data = [
//     {
//         // order data
//         orderId: 1,
//         menu: [
//             {
//                 menuId: 1,
//                 menuName: '아메리카노',
//                 quantity: 2,
//                 cost: 2500,
//             },
//             {
//                 menuId: 2,
//                 menuName: '카페라떼',
//                 quantity: 1,
//                 cost: 3500,
//             },
//         ],
//         // group data
//         time: '9:30', // 배달 받는 시간
//         date: '2021-05-25', // 배달 받는 날짜
//         latitude: 37.284528586547374,
//         longitude: 127.04435940777411,
//         address: '수원시 원천동',
//         buildingName: '팔달관',
//         orderStatus: 'recruitmentDone',
//     },
//     {
//         // order data
//         orderId: 2,
//         menu: [
//             {
//                 menuId: 1,
//                 menuName: '복숭아 아이스티',
//                 quantity: 2,
//                 cost: 2000,
//             },
//             {
//                 menuId: 3,
//                 menuName: '바닐라라떼',
//                 quantity: 1,
//                 cost: 3500,
//             },
//         ],
//         // group data
//         time: '9:45', // 배달 받는 시간
//         date: '2021-05-25', // 배달 받는 날짜
//         latitude: 37.284528586547374,
//         longitude: 127.04435940777411,
//         address: '수원시 원천동',
//         buildingName: '원천관',
//         orderStatus: 'recruitmentDone',
//     },
//     {
//         // order data
//         orderId: 3,
//         menu: [
//             {
//                 menuId: 1,
//                 menuName: '아메리카노',
//                 quantity: 2,
//                 cost: 2500,
//             },
//             {
//                 menuId: 2,
//                 menuName: '카페라떼',
//                 quantity: 1,
//                 cost: 3500,
//             },
//         ],
//         // group data
//         time: '10:30', // 배달 받는 시간
//         date: '2021-05-26', // 배달 받는 날짜
//         latitude: 37.284528586547374,
//         longitude: 127.04435940777411,
//         address: '수원시 원천동',
//         buildingName: '성호관',
//         orderStatus: 'waitingForDelivery',
//     },
// ];
