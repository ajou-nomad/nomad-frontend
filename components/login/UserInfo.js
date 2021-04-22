/* eslint-disable prettier/prettier */
/* eslint-disable no-labels */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
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

export default function UserInfo(props) {
        return (
        props.phoneValid &&
        <>
            {props.isGoogle ||
            <>
            <Text style={props.mainTxtStyle}>이메일</Text>
            <View style={{flexDirection:'row'}}>
                <TextInputs style={props.inputStyle} change={props.changeEmail} value={props.email} type="email" duplicate={props.checkDuplicated} />
                <TouchableOpacity
                style={{
                    alignItems:'center',
                    justifyContent: 'center',
                    width: 100,
                    backgroundColor:'#9e9e9e',
                    marginHorizontal: 15,
                    marginVertical: 5,
                }}
                onPress={()=>{props.duplicated();}}
                >
                <Text>중복 확인</Text>
                </TouchableOpacity>
            </View>
            <Text style={props.mainTxtStyle}>비밀번호</Text>
            <TextInputs style={props.inputStyle} change={props.changePassword} value={props.password} type="password"/>
            </>
            }
            <Text style={props.mainTxtStyle}>닉네임</Text>
            <TextInputs style={props.inputStyle} change={props.changeNickname} value={props.nickname} type="nickname"/>
            <View style={{
                flexDirection:'row',
                marginTop: 5,
                alignSelf: 'center',
            }}>
            <TouchableOpacity
                onPress = {()=>{props.getInfo('User');}}
                style={props.userBtnSyle}
            >
                <Text style={props.userTxtStyle}>User</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress = {()=>{props.getInfo('Shop'); }}
                style={props.userBtnSyle}
            >
                <Text style={props.userTxtStyle} >Shop</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress = {()=>{props.getInfo('Deli'); }}
                style={props.userBtnSyle}
            >
                <Text style={props.userTxtStyle} >Deli</Text>
            </TouchableOpacity>
            </View>
            <Text style={props.mainTxtStyle}>약관 동의</Text>
            <View style={{
                flexDirection:'row',
                marginTop: 5,
                marginLeft: 50,
            }}>
                <TouchableOpacity
                    style={(props.term1 && props.term2 && props.btnSelected) || props.btnIdle}
                    onPress={()=>{props.termSelected('all');}}
                />
                <Text style={props.normalTxtStyle}>전체 동의</Text>
            </View>
            <View style={{
                flexDirection:'row',
                marginTop: 5,
                marginLeft: 80,
            }}>
                <TouchableOpacity
                    style={(props.term1 && props.subBtnSelected) || props.subBtnIdle}
                    onPress={()=>{props.termSelected('term1');}}
                />
                <Text style={props.subTxtStyle}>필수 약관 동의</Text>
            </View>
            <View style={{
                flexDirection:'row',
                marginTop: 5,
                marginLeft: 80,
            }}>
                <TouchableOpacity
                    style={(props.term2 && props.subBtnSelected) || props.subBtnIdle}
                    onPress={()=>{props.termSelected('term2');}}
                />
                <Text style={props.subTxtStyle}>선택 약관 동의</Text>
            </View>
            <TouchableOpacity
                onPress={ ()=>{props.checkEmptyExist();}}
                style={props.confirmBtnStyle}
            >
                <Text style={props.confirmTxtStyle}>회원가입 하기</Text>
            </TouchableOpacity>
        </>
        );
}
