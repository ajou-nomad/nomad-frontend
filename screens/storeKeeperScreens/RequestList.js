/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

import { FONTS2, icons, COLORS } from '../../constants';
import Header from '../../components/layout/Header';
import OrderItem from '../../components/item/OrderItem';
import axiosApiInstance from '../../utils/axios';

const RequestList = ({navigation}) => {



    // useEffect(() => {
    //     // navigation에서 올때마다 최신데이터 호출( 리렌더링은 제외 )
    //     const unsubscribe = navigation.addListener('focus', async () => {

    //         axiosApiInstance.get('상점의 주문목록들 받아오기').then((data) => console.log('저장할 setState'));
    //     });

    //     return unsubscribe;
    // }, []);


    const data = [
        {
            // order data
            orderId: 1,
            menu: [
                {
                    menuId: 1,
                    menuName: '아메리카노',
                    quantity: 2,
                    cost: 2500,
                },
                {
                    menuId: 2,
                    menuName: '카페라떼',
                    quantity: 1,
                    cost: 3500,
                },
            ],
            // group data
            time: '9:30', // 배달 받는 시간
            date: '2021-05-25', // 배달 받는 날짜
            latitude: 37.284528586547374,
            longitude: 127.04435940777411,
            address: '수원시 원천동',
            buildingName: '팔달관',
            orderStatus: 'recruitmentDone',
        },
        {
            // order data
            orderId: 2,
            menu: [
                {
                    menuId: 1,
                    menuName: '복숭아 아이스티',
                    quantity: 2,
                    cost: 2000,
                },
                {
                    menuId: 2,
                    menuName: '바닐라라떼',
                    quantity: 1,
                    cost: 3500,
                },
            ],
            // group data
            time: '9:45', // 배달 받는 시간
            date: '2021-05-25', // 배달 받는 날짜
            latitude: 37.284528586547374,
            longitude: 127.04435940777411,
            address: '수원시 원천동',
            buildingName: '원천관',
            orderStatus: 'recruitmentDone',
        },
        {
            // order data
            orderId: 3,
            menu: [
                {
                    menuId: 1,
                    menuName: '아메리카노',
                    quantity: 2,
                    cost: 2500,
                },
                {
                    menuId: 2,
                    menuName: '카페라떼',
                    quantity: 1,
                    cost: 3500,
                },
            ],
            // group data
            time: '10:30', // 배달 받는 시간
            date: '2021-05-26', // 배달 받는 날짜
            latitude: 37.284528586547374,
            longitude: 127.04435940777411,
            address: '수원시 원천동',
            buildingName: '성호관',
            orderStatus: 'waitingForDelivery',
        },
    ];

    return (
        <View style={styles.container}>
            <Header title="주문 리스트" small="true" />
            {/* <View style={{justifyContent: 'center', alignSelf: 'center', alignItems:'center', flex: 1, flexDirection: 'row'}}>
                    <Image
                        source={icons.no}
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                <Text style={{ ...FONTS2.body1, color: '#707070', alignSelf: 'center' }}> 아직 주문이 없습니다.</Text>
            </View> */}

            <FlatList
                data={data}
                keyExtractor={item => item.orderId.toString()}
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
