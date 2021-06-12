/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
*/

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { FONTS2, SIZES } from '../../constants';
import TextInputs from '../TextInput';

const PhoneValid = (props) => {
    return (
        props.phoneUnique &&
        <View style={{ marginTop: SIZES.base * 3, width: SIZES.width * 0.9, }}>
            <Text style={props.mainTxtStyle}>인증 번호</Text>
            <View style={{ flexDirection: 'row' }}>
                <TextInputs style={props.inputStyle} change={props.changeValidCode} value={props.validCode} type="validation" />
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: SIZES.width * 0.2,
                        backgroundColor: '#3897f1',
                        marginHorizontal: 15,
                        marginVertical: 5,
                        borderRadius: 8,
                    }}
                    onPress={() => { props.validation(); }}
                >
                    <Text style={{ color: '#fff', ...FONTS2.body3 }}>확인</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PhoneValid;
