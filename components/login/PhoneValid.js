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
import TextInputs from '../TextInput';

export default function PhoneValid(props) {
        return (
        props.phoneUnique &&
        <>
            <Text style={props.mainTxtStyle}>인증 번호</Text>
            <View style={{flexDirection:'row'}}>
            <TextInputs style={props.inputStyle} change={props.changeValidCode} value={props.validCode} type="validation" />
                <TouchableOpacity
                style={{
                    alignItems:'center',
                    justifyContent: 'center',
                    width: 75,
                    backgroundColor:'#364FC7',
                    marginHorizontal: 15,
                    marginVertical: 5,
                }}
                onPress={()=>{props.validation();}}
                >
                <Text style={{color: '#fff'}}>확인</Text>
                </TouchableOpacity>
            </View>
        </>
        );
}
