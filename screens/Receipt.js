/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */

import React from 'react';
import { View, Text, Modal, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { COLORS, FONTS2, icons, SIZES } from '../constants';

const Receipt = ({ modalVisible, closeModal, item }) => {



    const modalBackgroundStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    };

    const paymentMethod = (payMethod) => {
        if (payMethod === 'card') {
            return '카드';
        } else {
            return '포인트';
        }
    };


    // 5 -> 05분, 15 -> 15분 등등 두 자리수 맞추기.
    const digitTwo = (digit) => {
        return ('00' + JSON.stringify(digit)).slice(-2);
    };

    const date = new Date(item.orderTime);

    const renderItem = ({ item }) => {
        return (
            <View style={{ marginHorizontal: SIZES.base * 3, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ ...FONTS2.body3 }}>{item.menuName}</Text>
                    <Text style={{ ...FONTS2.body3, marginLeft: 20, marginTop: 5 }}>{item.quantity}개</Text>
                </View>
                <View style={{ flexDirection: 'row-reverse', marginTop: SIZES.base }}>
                    <Text style={{ ...FONTS2.body3 }}>{(item.cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
                </View>
            </View>
        );
    };

    return (
        <Modal
            animationType='slide'
            visible={modalVisible}
            onRequestClose={() => {
                closeModal();
            }}
            transparent
        >
            <View style={[styles.container, modalBackgroundStyle]}>
                <View style={styles.modal}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.3, justifyContent: 'center', paddingVertical: SIZES.height * 0.02 }}>
                        <TouchableOpacity
                            onPress={() => closeModal()}
                            style={{ position: 'absolute', left: SIZES.width * 0.03 }}
                            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }} //터치영역 확장
                        >
                            <Image source={icons.close} resizeMode='contain' style={styles.closeButton} />
                        </TouchableOpacity>

                        <Text style={{ ...FONTS2.h3, }}>영수증</Text>
                    </View>

                    <View style={{ alignItems: 'center', marginBottom: SIZES.base * 3 }}>
                        <Text style={{ ...FONTS2.h3, marginTop: SIZES.base * 2, marginBottom: SIZES.base }}>{item.storeName}</Text>
                        <Text style={{ ...FONTS2.body3 }}>{date.getFullYear()}년 {digitTwo(date.getMonth()+1)}월 {digitTwo(date.getUTCDate())}일 {digitTwo(date.getUTCHours())}시 {digitTwo(date.getUTCMinutes())}분</Text>
                    </View>
                    <FlatList data={item.orderItemList} keyExtractor={item => item.orderItemId.toString()} renderItem={renderItem} />

                    <View style={{ marginHorizontal: SIZES.base * 3, borderTopWidth: 0.3, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ ...FONTS2.h4 }}>합계</Text>
                        <Text style={{ ...FONTS2.h4 }}>{item.totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</Text>
                    </View>

                    <View style={{ marginHorizontal: SIZES.base * 3, borderBottomWidth: 0.3, paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ ...FONTS2.body3 }}>결제수단</Text>
                        <Text style={{ ...FONTS2.body3 }}>{paymentMethod(item.payMethod)}</Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    closeButton: {
        width: SIZES.base * 2,
        height: SIZES.base * 2,
        tintColor: COLORS.darkgray,
    },
    modal: {
        backgroundColor: COLORS.white,
        borderRadius: 8,
        height: responsiveHeight(75),
        width: responsiveWidth(85),
        alignSelf: 'center',
        marginTop: SIZES.padding,
    },
});

export default Receipt;
