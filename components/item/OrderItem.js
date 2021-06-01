/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS2, SIZES } from '../../constants';
import StoreButton from '../StoreButton';

const OrderItem = ({ item }) => {
    const navigation = useNavigation();


    const totalItemListNum = item.orderItemList.reduce((acc, cur, i) =>{
        return acc + cur.length;
    }, 0);


    // orderStatus에 따른 버튼
    let button;
    if (item.orderStatus === 'recruitmentDone') {
        button = <StoreButton title="접수하기" color="#CED4DA" fontColor="white"
                    onPress={() => navigation.navigate('OrderDetailItem', { item: item })}
                />;
    } else if ((item.orderStatus ===  'recruitmentAccept') || (item.orderStatus === 'waitingForDelivery')) {
        button = <StoreButton title="접수완료" color="#364FC7" fontColor="white"
                    onPress={() => navigation.navigate('OrderDetailItem', { item: item })}
                />;
    } else if (item.orderStatus ===  'delivering') {
        button = <StoreButton title="배달중" color="#364FC7" fontColor="white"
                    onPress={() => navigation.navigate('OrderDetailItem', { item: item })}
                />;
    } else if (item.orderStatus ===  'deliveryDone') {
        button = <StoreButton title="배달완료" color="#364FC7" fontColor="white"
                    onPress={() => navigation.navigate('OrderDetailItem', { item: item })}
                />;
    }

    return (
        <View style={styles.itemContainer}>
            <View>
                <Text style={{ ...FONTS2.body3 }}>{JSON.stringify(item.deliveryDateTime).substr(1,10)} {JSON.stringify(item.deliveryDateTime).substr(12,5)}</Text>
                <Text style={{ ...FONTS2.h3, marginBottom: 3 }}>{item.orderItemList[0][0].menuName} 외 {totalItemListNum}개</Text>
                <Text style={{ ...FONTS2.body3, color: '#818181' }}>{item.address} {item.buildingName}</Text>
            </View>
            <View style={{position: 'absolute', right: SIZES.width * 0.02}}>
                {button}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    itemContainer: {
        padding: 10,
        paddingHorizontal: SIZES.width * 0.05,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default OrderItem;
