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
            <Text style={{ ...FONTS2.h4, color: fontColor }}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    orderButton: {
        justifyContent: 'center',
        backgroundColor: '#364FC7',
        paddingHorizontal: SIZES.base * 2,
        marginTop: 10,
        borderRadius: 8,
        height: SIZES.base * 4,
        width: SIZES.width * 0.25,
        alignItems: 'center',
    },
});

export default StoreButton;
