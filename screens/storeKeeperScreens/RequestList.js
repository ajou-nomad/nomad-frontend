/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, SafeAreaView, } from 'react-native';

import Header from '../../components/layout/Header';
import OrderItem from '../../components/storeKeeperComponents/item/OrderItem';
import { COLORS, FONTS2 } from '../../constants';

const RequestList = () => {

    const data = [
        {
            id: 0,
            date: '12:00',
            menus: [
                {
                    id: 0,
                    menu: '석류 아이스티',
                    price: 4000,
                    option: [
                        'tall',
                    ],
                },
                {
                    id: 1,
                    menu: '아메리카노',
                    price: 3000,
                    option: [
                        'ice',
                        'tall',
                    ],
                },
                {
                    id: 2,
                    menu: '바닐라 라떼',
                    price: 3500,
                    option: [
                        'ice',
                        'venti',
                    ],
                },
                {
                    id: 3,
                    menu: '바닐라 라떼',
                    price: 3500,
                    option: [
                        'ice',
                        'venti',
                    ],
                },
            ],
            place: '아주대학교 팔달관',
            orderStatus: false,
        },
        {
            id: 1,
            date: '9:00',
            menus: [
                {
                    id: 0,
                    menu: '복숭아 아이스티',
                    price: 4000,
                    option: [
                        'venti',
                    ],
                },
                {
                    id: 1,
                    menu: '아메리카노',
                    price: 3000,
                    option: [
                        'hot',
                        'tall',
                    ],
                },
                {
                    id: 2,
                    menu: '라떼',
                    price: 3500,
                    option: [
                        'ice',
                        'venti',
                    ],
                },
            ],
            place: '아주대학교 팔달관',
            orderStatus: false,
        },
        {
            id: 2,
            date: '10:00',
            menus: [
                {
                    id: 0,
                    menu: '복숭아 아이스티',
                    price: 3500,
                    option: [
                        'venti',
                    ],
                },
                {
                    id: 1,
                    menu: '아메리카노',
                    price: 4000,
                    option: [
                        'hot',
                        'tall',
                    ],
                },
                {
                    id: 2,
                    menu: '라떼',
                    price: 3000,
                    option: [
                        'ice',
                        'venti',
                    ],
                },
                {
                    id: 3,
                    menu: '바닐라 라떼',
                    price: 3500,
                    option: [
                        'ice',
                        'venti',
                    ],
                },
                {
                    id: 4,
                    menu: '바닐라 라떼',
                    price: 3500,
                    option: [
                        'ice',
                        'venti',
                    ],
                },
            ],
            place: '아주대학교 성호관',
            orderStatus: true,
        },
        {
            id: 3,
            date: '11:00',
            menus: [
                {
                    id: 0,
                    menu: '복숭아 아이스티',
                    price: 3000,
                    option: [
                        'venti',
                    ],
                },
                {
                    id: 1,
                    menu: '아메리카노',
                    price: 4000,
                    option: [
                        'hot',
                        'tall',
                    ],
                },
                {
                    id: 2,
                    menu: '라떼',
                    price: 3500,
                    option: [
                        'ice',
                        'venti',
                    ],
                },
                {
                    id: 3,
                    menu: '바닐라 라떼',
                    price: 3500,
                    option: [
                        'ice',
                        'venti',
                    ],
                },
                {
                    id: 4,
                    menu: '바닐라 라떼',
                    price: 3500,
                    option: [
                        'ice',
                        'venti',
                    ],
                },
                {
                    id: 5,
                    menu: '바닐라 라떼',
                    price: 3500,
                    option: [
                        'ice',
                        'venti',
                    ],
                },
                {
                    id: 6,
                    menu: '바닐라 라떼',
                    price: 3500,
                    option: [
                        'ice',
                        'venti',
                    ],
                },
            ],
            place: '아주대학교 용지관',
            orderStatus: true,
        },
    ];

    const renderItem = ({ item }) => {
        return (
            <OrderItem data={item} />
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Header title='진행 주문' small='true' />

            {/* <OrderItem data={data1} /> */}

            <SafeAreaView>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
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
