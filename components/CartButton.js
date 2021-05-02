/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import {
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { COLORS, icons } from '../constants';

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
            onPress={() => navigation.navigate('Cart',{time:props.time, location: props.location, storeName:props.storeName})}
        >
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
}

export default CartButton;
