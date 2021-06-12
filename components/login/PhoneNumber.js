/* eslint-disable prettier/prettier */
/* eslint-disable no-labels */
/* eslint-disable no-alert */
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
let prevLength = 0;
export default function PhoneNumber(props) {

    let phoneNumberDisplay = props.phoneNumber;
    if (props.phoneNumber.length === 9){
        if (prevLength === 10){
            phoneNumberDisplay = props. phoneNumber.substr(0,8);
        } else {
            phoneNumberDisplay = props. phoneNumber.substr(0,8) + '-' + props.phoneNumber.substr(8);
        }
    } else if (props.phoneNumber.length === 4){
        if (prevLength === 5){
            phoneNumberDisplay = props.phoneNumber.substr(0,3);
        } else {
            phoneNumberDisplay = props.phoneNumber.substr(0,3) + '-' + props.phoneNumber.substr(3);
        }
    }
    prevLength = phoneNumberDisplay.length;
    return (
        <View style={{ marginTop: SIZES.base * 3, width: SIZES.width * 0.9, }}>
            <Text style={props.mainTxtStyle}>휴대폰 번호</Text>
            <View style={{ flexDirection: 'row' }}>
                <TextInputs style={props.inputStyle} change={props.changePhoneNumber} value={phoneNumberDisplay} type="PhoneNumber" />
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: SIZES.width * 0.2,
                        backgroundColor: '#3897f1',
                        marginHorizontal: 15,
                        borderRadius: 8,
                        marginVertical: 5,
                    }}
                    onPress={() => { props.duplicated(); }}
                >
                    <Text style={{ color: '#fff', ...FONTS2.body3 }}>인증</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

