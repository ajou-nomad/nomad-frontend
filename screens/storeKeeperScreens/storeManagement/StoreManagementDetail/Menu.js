/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ToastAndroid, ScrollView } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

import Header from '../../../../components/layout/Header';
import { COLORS, SIZES, FONTS2 } from '../../../../constants';


const Button = ({ title, color, backColor, onPress }) => (
    <TouchableOpacity
        style={[styles.menuButton, { backgroundColor: backColor }]}
        onPress={onPress}
    >
        <Text style={{ ...FONTS2.h4, color: color }}>{title}</Text>
    </TouchableOpacity>
);

const InputBox = ({ title, placeholder, description }) => (
    <View style={{ marginBottom: SIZES.base * 2 }}>
        <Text style={{ ...FONTS2.h3, color: '#495057', }}>{title}</Text>
        <TextInput style={[styles.textInput, { minHeight: description ? responsiveHeight(15) : (null) }]} placeholder={placeholder} />
    </View>
);

const Menu = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container} >
            <Header title='메뉴추가' small='true' />

            <View style={{ padding: SIZES.base * 2, }}>
                <Text style={{ ...FONTS2.h2, marginBottom: SIZES.base * 3 }}>메뉴 정보</Text>
                <InputBox title='메뉴 이름' placeholder='메뉴 이름을 입력해주세요.' />
                <InputBox title='메뉴 가격' placeholder='숫자만 입력해주세요.' />
                <InputBox title='메뉴 설명' placeholder='메뉴에 대해 설명해주세요.' description='true'/>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: SIZES.padding * 5 }}>
                <Button
                    title='취소하기'
                    color='#495057'
                    backColor='#f1f3f5'
                    onPress={() => navigation.goBack()}
                />
                <Button
                    title='등록하기'
                    color='white'
                    backColor='#3897f1' onPress={() => {
                        navigation.goBack();
                        ToastAndroid.showWithGravity('메뉴가 등록되었습니다.', ToastAndroid.SHORT, ToastAndroid.CENTER);
                    }} />
            </View>
        </ScrollView>
    );
};

export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    menuButton: {
        backgroundColor: '#3897f1',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.base * 1.5,
        borderRadius: 8,
        marginVertical: SIZES.base * 1.5,
        paddingHorizontal: SIZES.width * 0.1,
    },
    textInput: {
        borderRadius: 8,
        borderWidth: 0.3,
        borderColor: '#adb5bd',
        marginVertical: SIZES.base,
        textAlignVertical: 'top',
        padding: 10,
        ...FONTS2.body3,
    }
})