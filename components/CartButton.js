/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import {
    TouchableOpacity,
    Image,
    View,
    Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS2, icons, SIZES } from '../constants';

const CartButton = (props) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                width: 60,
                height: 60,
                backgroundColor: '#1c7ed6',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 38,
                elevation: 5,
            }}
            onPress={() => navigation.navigate('Cart', { cartItems: props.cartItems, storeInfo: props.storeInfo, time: props.time, location: props.deliveryPlace, deliDate: props.deliDate, groupData: props.groupData, datePicker: props.datePicker })}
        >
            {props.cartItems.length !== 0 ? (
                <View style={{ width: SIZES.base * 2, height: SIZES.base * 2, backgroundColor: 'white', borderRadius: 20, justifyContent: 'center', position: 'absolute', right: SIZES.base * 1.5, top: SIZES.base * 1.2 }}>
                    <Text style={{ color: '#1c7ed6', ...FONTS2.h4, alignSelf: 'center' }}>{props.cartItems.length}</Text>
                </View>
            ) :
                (null)
            }
            <Image
                source={icons.cart}
                resizeMode='contain'
                style={{
                    width: 30,
                    height: 30,
                    tintColor: COLORS.white,
                }}
            />
        </TouchableOpacity>
    );
};

export default CartButton;
