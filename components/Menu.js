/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import { FONTS2 } from '../constants';

import { useNavigation } from '@react-navigation/native';

function Menu() {
    const navigation = useNavigation();
    
    return (
        <View>
            <TouchableOpacity
                style={{ margin: 15 }}
                onPress={() => navigation.navigate('MenuDetail')}
            >
                <Text style={{ ...FONTS2.h2 }}>파인트(플레이버 3가지) - 메뉴 이름</Text>
                <Text style={{ ...FONTS2.body2 }}>8,200원 - 가격</Text>
                <Text style={{ ...FONTS2.body4, color: '#707070' }}>3가지 맛의 아이스크림이 선택 가능한 파인트 사이즈! - 메뉴 설명</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Menu;
