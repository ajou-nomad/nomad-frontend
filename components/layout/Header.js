/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import { View, Text, Image, } from 'react-native';

import { COLORS, FONTS2, icons, SIZES } from '../../constants';

import { responsiveHeight, } from "react-native-responsive-dimensions";

const Header = ({ title, small, createGroupList }) => {

    return (
        <View style={{
            height: responsiveHeight(8),
            backgroundColor: 'white',
            borderBottomWidth: createGroupList ? 0 : 0.3,
            borderBottomColor: COLORS.darkgray,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            { small ? (
                <Text style={{ ...FONTS2.h2, fontWeight: 'bold' }}>{title}</Text>
            ) : (
                <Text style={{ ...FONTS2.h1, fontWeight: 'bold' }}>{title}</Text>
            )}
        </View>
    );
};

export default Header;
