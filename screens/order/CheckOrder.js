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

const CheckOrder = ({route:{params}}) => {

    // console.log(`CheckOrder's params: ${JSON.stringify(params,null,4)}`);

    const navigation = useNavigation();
    // const orderInfo = {
    //     storeName: params.storeInfo.storeName,
    //     delPlace: params.location.buildingName,
    //     delTime: params.time,
    //     peopleNum: 1,
    //     totalNum: 4,
    //     foods: [
    //         {
    //             name: '파인트(플레이버 3가지)',
    //             total: 1,
    //             price: 8200,
    //             options: [
    //                 {
    //                     name: '31요거트',
    //                     total: 2,
    //                 },
    //                 {
    //                     name: '엄마는 외계인',
    //                     total: 1,
    //                 },
    //             ],
    //         }
    //     ]
    // };

    const totalPrice = params.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const current = (params.groupData === undefined || params.groupData === null) ? 1 : params.groupData.current;
    const maxValue = (params.groupData === undefined || params.groupData === null) ?  params.maxValue :  params.groupData.max;

    return (
        <View style={styles.container}>
            <View style={{ flex: 4.5 }}>
                <View style={{ flex: 1.8, alignItems: 'center', marginTop: 15, borderBottomWidth: 0.5, }}>
                    <Text style={{ ...FONTS2.h2 }}>주문 내용</Text>
                    <Text style={{ ...FONTS2.h1, marginTop: 20, marginBottom: 10, }}>{params.storeInfo.storeName}</Text>

                    <View>
                        <Text style={{ ...FONTS2.body2 }}>수령 장소: {params.location.buildingName}</Text>
                        <Text style={{ ...FONTS2.body2 }}>수령 시간: {params.time}</Text>
                        <Text style={{ ...FONTS2.body2 }}>수령 날짜: {params.deliDate}</Text>
                        <Text style={{ ...FONTS2.body2 }}>현재 인원: {current}/{maxValue}</Text>
                    </View>
                </View>
                <View style={{ flex: 3, margin: 30, }}>
                    {/* FlatList로 변경하기 */}
                    {params.cartItems.map((items,index)=>{
                        return <OrderMenuItem key={index} isCart="false" orderDetail = {items} />
                    })}

                </View>
            </View>


            <BottomButton onPress={() => navigation.navigate('PaymentNavigation',{totalData:params})} title={totalPrice + "원 결제하기"} />
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
