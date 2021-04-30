/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import {
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { icons } from '../constants';

const CartButton = () => {
    
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                width: 60,
                height: 60,
                backgroundColor: '#EDF2FF',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 38,
                elevation: 3,
            }}
            onPress={() => navigation.navigate('Cart')}
        >
            <Image
                source={icons.cart}
                resizeMode='contain'
                style={{
                    width: 30,
                    height: 30,
                    tintColor: '#343a40',
                }}
            />
        </TouchableOpacity>
    );
}

export default CartButton;
