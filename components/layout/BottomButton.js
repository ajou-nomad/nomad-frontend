/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

import { COLORS, FONTS2, icons } from '../../constants';

import { responsiveHeight } from 'react-native-responsive-dimensions';

const BottomButton = ({ onPress, title, isGetLocation }) => {
    return (
        <TouchableOpacity
            style={{ height: responsiveHeight(10) }}
            onPress={onPress}
        >
            <View style={{
                flex: 1,
                backgroundColor: '#339af0',
                borderTopEndRadius: 20,
                borderTopStartRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
            }}>
                {/* 내위치 버튼일 경우 image 보임. */}
                {isGetLocation ? (
                    <Image
                        source={icons.gps}
                        resizeMode='contain'
                        style={{
                            width: 35,
                            height: 35,
                            marginRight: 10,
                        }}
                    />
                ) : null}
                <Text style={{ ...FONTS2.body2, fontWeight: 'bold', color: COLORS.white }}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default BottomButton;
