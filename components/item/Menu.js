/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import { FONTS2 } from '../../constants';

import { useNavigation } from '@react-navigation/native';

function Menu({ item }) {
    const navigation = useNavigation();
    const { cost, description, imageUrl, menuId, menuName } = item;

    return (
        <View>
            <TouchableOpacity
                style={{ margin: 15 }}
                onPress={() => navigation.navigate('MenuDetail', { menu: item } /* { time: props.time, location: props.location, storeName: props.storeName }*/)}
            >
                <Text style={{ ...FONTS2.h2 }}>{menuName}</Text>
                <Text style={{ ...FONTS2.body2 }}>{cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
                <Text style={{ ...FONTS2.body4, color: '#707070' }}>{description}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Menu;
