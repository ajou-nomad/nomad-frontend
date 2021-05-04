/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import { View, Text } from 'react-native';

import { COLORS, FONTS2 } from '../../constants';

import { responsiveHeight, } from "react-native-responsive-dimensions";

const Header = ({ title, small }) => {

    return (
        <View style={{
            height: responsiveHeight(8),
            backgroundColor: 'white',
            borderBottomWidth: 0.5,
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
