/* eslint-disable prettier/prettier */
/* eslint-disable no-labels */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {View, Text, FlatList} from 'react-native';
import { FONTS2, SIZES } from '../../constants';


const DetailedDelivery = (props) => {
    const orderArray = props.orderArray;

    const renderDetailedOrders = (item) => {
        console.log(JSON.stringify(item, null, 4));
        return (
            <View style={{ marginBottom: SIZES.base }}>
                <Text style={{ ...FONTS2.h3, marginBottom: SIZES.base * 0.5 }}>주문 #{item.index + 1}</Text>
                {item.item.menu.map((items, index) => {
                    return (
                        <View key={index}>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={{ ...FONTS2.body3 }}> · [ 메뉴: </Text>
                                <Text style={{ ...FONTS2.body3 }}>{items.menuName} /</Text>
                                <Text style={{ ...FONTS2.body3 }}> 수량: </Text>
                                <Text style={{ ...FONTS2.body3 }}>{items.quantity} ] </Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    };


    return (
        <View>
            <FlatList
                data={orderArray}
                renderItem={renderDetailedOrders}
                keyExtractor={item => item.orderId.toString()}
            />
        </View>

    );
};

export default DetailedDelivery;
