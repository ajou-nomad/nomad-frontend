/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, } from 'react-native';

import Header from '../../components/layout/Header';
import OrderItem from '../../components/storeKeeperComponents/item/OrderItem';
import { COLORS, FONTS2 } from '../../constants';

const RequestList = () => {

    const data1 = {
        time: '12:00',
        menu: '아메리카노 외 5개',
        place: '아주대학교 팔달관',
        orderStatus: true,
    };
    const data2 = {
        time: '12:00',
        menu: '아이스티 외 2개',
        place: '아주대학교 용지관',
        orderStatus: false,
    };
    
    return (
        <ScrollView style={styles.container}>
            <Header title='진행 주문' small='true' />

            <OrderItem data={data1} />
            <OrderItem data={data1} />
            <OrderItem data={data1} />
            <OrderItem data={data2} />
            <OrderItem data={data2} />
            <OrderItem data={data2} />
            <OrderItem data={data2} />
            <OrderItem data={data2} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
});

export default RequestList;
