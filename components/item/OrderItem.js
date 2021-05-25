/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS2, SIZES } from '../../constants';

const OrderItem = ({ item }) => {
    const navigation = useNavigation();

    const quantity = item.menu.reduce((sum, cur) => sum + cur.quantity, 0) - 1;

    return (
        <View style={styles.itemContainer}>
            <View>
                <Text style={{ ...FONTS2.body3 }}>{item.date} {item.time}</Text>
                <Text style={{ ...FONTS2.h3, marginBottom: 3 }}>{item.menu[0].menuName} 외 {quantity}개</Text>
                <Text style={{ ...FONTS2.h3, color: '#818181', }}>{item.address} {item.buildingName}</Text>
            </View>

            {/* {!orderStatus ? (
                <TouchableOpacity
                    style={[styles.orderButton, { backgroundColor: '#CED4DA' }]}
                    // onPress={() => navigation.navigate('OrderDetailItem', { status: false })}
                >
                    <Text style={{ ...FONTS2.h4, color: COLORS.white }}>접수하기</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.orderButton}
                    // onPress={() => navigation.navigate('OrderDetailItem', { status: true })}
                >
                    <Text style={{ ...FONTS2.h4, color: COLORS.white }}>접수완료</Text>
                </TouchableOpacity>
            )} */}
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
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderButton: {
        justifyContent: 'center',
        backgroundColor: '#364FC7',
        paddingHorizontal: 20,
        marginTop: 10,
        borderRadius: 8,
        height: SIZES.padding * 3,
        // borderBottomRightRadius: 25,
    },
});

export default OrderItem;