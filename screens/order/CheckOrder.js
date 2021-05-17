/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import OrderMenuItem from '../../components/item/OrderMenuItem';
import BottomButton from '../../components/layout/BottomButton';
import { FONTS2 } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const CheckOrder = ({ route: { params } }) => {

    console.log(`CheckOrder's params: ${JSON.stringify(params)}`);

    const navigation = useNavigation();
    const orderInfo = {
        storeName: params.storeName,
        delPlace: params.location.buildingName,
        delTime: params.time,
        peopleNum: 1,
        totalNum: 4,
        foods: [
            {
                name: '파인트(플레이버 3가지)',
                total: 1,
                price: 8200,
                options: [
                    {
                        name: '31요거트',
                        total: 2,
                    },
                    {
                        name: '엄마는 외계인',
                        total: 1,
                    },
                ],
            }
        ]
    };

    const price = orderInfo.foods[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
        <View style={styles.container}>
            <View style={{ flex: 4.5 }}>
                <View style={{ flex: 1.8, alignItems: 'center', marginTop: 15, borderBottomWidth: 0.5, }}>
                    <Text style={{ ...FONTS2.h2 }}>주문 내용</Text>
                    <Text style={{ ...FONTS2.h1, marginTop: 20, marginBottom: 10, }}>{orderInfo.storeName}</Text>

                    <View>
                        <Text style={{ ...FONTS2.body2 }}>수령 장소: {orderInfo.delPlace}</Text>
                        <Text style={{ ...FONTS2.body2 }}>수령 시간: {orderInfo.delTime}</Text>
                        <Text style={{ ...FONTS2.body2 }}>현재 인원: {orderInfo.peopleNum}/{orderInfo.totalNum}</Text>
                    </View>
                </View>
                <View style={{ flex: 3, margin: 30, }}>
                    {/* FlatList로 변경하기 */}
                    <OrderMenuItem />
                </View>
            </View>


            <BottomButton onPress={() => navigation.navigate('PaymentNavigation')} title={price + "원 결제하기"} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});


export default CheckOrder;
