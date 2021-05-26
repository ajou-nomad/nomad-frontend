/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { SIZES, FONTS2, COLORS } from '../constants';

const StoreButton = ({ color, title, onPress, fontColor }) => {
    return (
        <TouchableOpacity
            style={[styles.orderButton, { backgroundColor: color }]}
            onPress={onPress}
        >
            <Text style={{ ...FONTS2.h3, color: fontColor }}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    orderButton: {
        justifyContent: 'center',
        backgroundColor: '#364FC7',
        paddingHorizontal: 20,
        marginTop: 10,
        borderRadius: 8,
        height: SIZES.padding * 3,
        // borderBottomRightRadius: 25,
    },
})

export default StoreButton;
