/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS2 } from '../../../constants';

const OrderItem = ({ data }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.itemContainer}>
            <View>
                <Text style={{ ...FONTS2.body3 }}>{data.time}</Text>
                <Text style={{ ...FONTS2.h2 }}>{data.menu}</Text>
                <Text style={{ ...FONTS2.h3, color: '#818181', }}>{data.place}</Text>
            </View>

            {data.orderStatus ? (
                <TouchableOpacity
                    style={[styles.orderButton, { backgroundColor: '#CED4DA' }]}
                    onPress={() => navigation.navigate('OrderDetailItem', { status: false, data: data })}
                >
                    <Text style={{ ...FONTS2.h3, color: COLORS.white }}>접수하기</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.orderButton}
                    onPress={() => navigation.navigate('OrderDetailItem', { status: true, data: data })}
                >
                    <Text style={{ ...FONTS2.h3, color: COLORS.white }}>접수완료</Text>
                </TouchableOpacity>
            )}
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
        height: 35,
        borderBottomRightRadius: 25,
    },
});

export default OrderItem;
