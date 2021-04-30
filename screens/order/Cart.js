/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { FONTS2 } from '../../constants';

const Cart = () => {
    return (
        <View style={styles.container}>
            <Text style={{ ...FONTS2.h1 }}>장바구니</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Cart;
