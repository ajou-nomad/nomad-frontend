/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import {FONTS2, SIZES, COLORS} from '../../constants';
import BottomButton from '../layout/BottomButton';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const AddMenu = ({modalVisible, closeModal, addMenu}) => {

    const [menuName, setMenuName] = useState('');
    const [menuPrice, setMenuPrice] = useState('');
    const [menuDescription, setMenuDescription] = useState('');

    const resetMenuInfo = () => {
        setMenuName('');
        setMenuDescription('');
        setMenuPrice('');
    };


    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
                resetMenuInfo();
                closeModal();
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>메뉴 이름</Text>
                    <TextInput
                        style={{
                            borderBottomWidth: 1,
                            width: SIZES.width * 0.8,
                            ...FONTS2.body2,
                        }}
                        placeholder="메뉴 이름을 입력해주세요."
                        value={menuName}
                        placeholderTextColor="#707070"
                        selectionColor="#000000"
                        onChangeText={(text)=> setMenuName(text)}
                    />
                    <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>메뉴 가격</Text>
                    <TextInput
                        style={{
                            borderBottomWidth: 1,
                            width: SIZES.width * 0.8,
                            ...FONTS2.body2,
                        }}
                        placeholder="숫자만 입력해주세요."
                        value={menuPrice}
                        placeholderTextColor="#707070"
                        selectionColor="#000000"
                        onChangeText={(text)=> setMenuPrice(text)}
                    />
                    <Text style={{ ...FONTS2.h2, fontWeight: 'bold', marginTop: 30, paddingBottom: 10 }}>메뉴 설명</Text>
                    <TextInput
                        style={{
                            borderBottomWidth: 1,
                            width: SIZES.width * 0.8,
                            ...FONTS2.body2,
                        }}
                        placeholder="메뉴에 대해 설명해주세요."
                        value={menuDescription}
                        placeholderTextColor="#707070"
                        selectionColor="#000000"
                        onChangeText={(text)=> setMenuDescription(text)}
                    />
                    <TouchableOpacity
                        style={{ height: responsiveHeight(10), width: responsiveWidth(40) }}
                        onPress={()=>{
                            const menuInfo = Object.assign({
                                name: menuName,
                                price: menuPrice,
                                description: menuDescription,
                            });
                            resetMenuInfo();
                            closeModal();
                            addMenu(menuInfo);
                        }}
                    >
                        <View style={{
                            flex: 1,
                            borderRadius: SIZES.radius,
                            marginTop: 20,
                            backgroundColor: COLORS.tertiary,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{ ...FONTS2.body3, fontWeight: 'bold' }}>추가하기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Footer */}
            <BottomButton
                onPress={() => {
                    resetMenuInfo();
                    closeModal();
                }}
                title="취소"
            />
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: SIZES.width * 0.95,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default AddMenu;
