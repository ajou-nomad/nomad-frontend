/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS2, SIZES } from '../../constants';
import StoreButton from '../StoreButton';

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
            
            {item.orderStatus === '모집 완료' ? (
                <StoreButton title='접수하기' color='#CED4DA' fontColor='white'
                    onPress={() => navigation.navigate('OrderDetailItem', { item: item })}
                />
            ) : (
                <StoreButton title='접수완료' color='#364FC7' fontColor='white'
                    onPress={() => navigation.navigate('OrderDetailItem', { item: item })}
                />
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
});

export default OrderItem;
