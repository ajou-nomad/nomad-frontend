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
import { FONTS2, SIZES } from '../../constants';

import TextInputs from '../TextInput';

export default function UserInfo(props) {
    return (
        props.phoneValid &&
        <>
            {props.IsGoogle ||
                <View style={{ marginTop: SIZES.base * 3, width: SIZES.width * 0.9, alignSelf: 'center', }}>
                    <Text style={props.mainTxtStyle}>이메일</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInputs style={props.inputStyle} change={props.changeEmail} value={props.email} type="email" duplicate={props.checkDuplicated} />
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
                            onPress={() => { props.duplicated(); }}
                        >
                            <Text style={{ ...FONTS2.body3, color: 'white' }}>중복 확인</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={props.mainTxtStyle}>비밀번호</Text>
                    <TextInputs style={props.inputStyle} change={props.changePassword} value={props.password} type="password" />
                    <Text style={props.mainTxtStyle}>닉네임</Text>
                    <TextInputs style={props.inputStyle} change={props.changeNickname} value={props.nickname} type="nickname" />
                </View>
            }
            <View style={{
                flexDirection: 'row',
                marginTop: 5,
                alignSelf: 'center',
            }}>
                <TouchableOpacity
                    onPress={() => { props.getInfo('User'); }}
                    style={props.userBtnSyle}
                >
                    <Text style={props.userTxtStyle}>User</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { props.getInfo('Shop'); }}
                    style={props.userBtnSyle}
                >
                    <Text style={props.userTxtStyle} >Shop</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { props.getInfo('Deli'); }}
                    style={props.userBtnSyle}
                >
                    <Text style={props.userTxtStyle} >Deli</Text>
                </TouchableOpacity>
            </View>
            { props.userType.IsShop && (
                <View style={{ marginVertical: 15, marginHorizontal: SIZES.base * 3, borderRadius: 8, borderWidth: 0.3, borderColor: '#adb5bd', paddingVertical: SIZES.base }}>
                    <Text style={props.mainTxtStyle}>추가 정보</Text>
                    <Text style={{ ...FONTS2.body2, marginLeft: SIZES.base }}>사업자번호</Text>
                    <TextInputs style={props.inputStyle} change={props.changeShopIdNumber} value={props.ShopIdNumber} type="ShopIdNumber" />
                </View>
            )}
            { props.userType.IsDeli && (
                <View style={{ marginVertical: 15, marginHorizontal: SIZES.base * 3, borderRadius: 8, borderWidth: 0.3, borderColor: '#adb5bd', paddingVertical: SIZES.base }}>
                    <Text style={props.mainTxtStyle}>추가 정보</Text>
                    <Text style={{ ...FONTS2.body2, marginLeft: SIZES.base }}>운전면허 번호</Text>
                    <TextInputs style={props.inputStyle} change={props.changeDeliIdNumber} value={props.DeliIdNumber} type="DeliIdNumber" />
                </View>
            )}
            <View style={{ marginHorizontal: SIZES.base * 3, borderRadius: 8, borderWidth: 0.3, borderColor: '#adb5bd', paddingVertical: SIZES.base, marginBottom: SIZES.base * 5 }}>
                <Text style={props.mainTxtStyle}>약관 동의</Text>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    marginLeft: 50,
                }}>
                    <TouchableOpacity
                        style={(props.term1 && props.term2 && props.btnSelected) || props.btnIdle}
                        onPress={() => { props.termSelected('all'); }}
                    />
                    <Text style={props.normalTxtStyle}>전체 동의</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    marginLeft: 80,
                }}>
                    <TouchableOpacity
                        style={(props.term1 && props.subBtnSelected) || props.subBtnIdle}
                        onPress={() => { props.termSelected('term1'); }}
                    />
                    <Text style={props.subTxtStyle}>필수 약관 동의</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    marginLeft: 80,
                }}>
                    <TouchableOpacity
                        style={(props.term2 && props.subBtnSelected) || props.subBtnIdle}
                        onPress={() => { props.termSelected('term2'); }}
                    />
                    <Text style={props.subTxtStyle}>선택 약관 동의</Text>
                </View>
                <TouchableOpacity
                    onPress={() => { props.checkEmptyExist(); }}
                    style={props.confirmBtnStyle}
                >
                    <Text style={props.confirmTxtStyle}>회원가입 하기</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}
