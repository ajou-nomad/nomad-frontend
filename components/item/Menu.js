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

function Menu(props) {
    const navigation = useNavigation();
    
    return (
        <View>
            <TouchableOpacity
                style={{ margin: 15 }}
                onPress={() => navigation.navigate('MenuDetail',{menu: props.menu, time:props.time, location:props.location, storeName:props.storeName})}
            >
                <Text style={{ ...FONTS2.h2 }}>{props.menu.menuName}</Text>
                <Text style={{ ...FONTS2.body2 }}>{props.menu.cost}원</Text>
                <Text style={{ ...FONTS2.body4, color: '#707070' }}>{props.menu.description}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Menu;
