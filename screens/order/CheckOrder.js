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
import { FONTS2, SIZES } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const CheckOrder = ({route:{params}}) => {
    const navigation = useNavigation();

    const totalPrice = params.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const current = (params.groupData === undefined || params.groupData === null) ? 1 : params.groupData.current;
    const maxValue = (params.groupData === undefined || params.groupData === null) ?  params.maxValue :  params.groupData.max;

    return (
        <View style={styles.container}>
            <View style={{ flex: 4.5 }}>
                <View style={{ flex: 1.8, alignItems: 'center', marginTop: 15, borderBottomWidth: 0.3, paddingBottom: SIZES.base * 3 }}>
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
