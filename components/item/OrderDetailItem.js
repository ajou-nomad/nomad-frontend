/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import { COLORS, FONTS2 } from '../../constants';

import Header from '../layout/Header';

const OrderDetailItem = ({ route }) => {
    const status = route.params.status;
    const { menu, orderStatus, place, time } = route.params.data;

    return (
        <View style={styles.container}>
            <Header title='진행 주문' small='true' />

            <View style={[styles.itemContainer, { marginTop: 20, }]}>
                <View>
                    <Text style={{ ...FONTS2.body2 }}>{time} 주문</Text>
                    <Text style={{ ...FONTS2.h2 }}>{place}</Text>
                </View>

                {!status ? (
                    <TouchableOpacity
                        style={[styles.orderButton, { backgroundColor: '#CED4DA' }]}
                        onPress={() => alert('백엔드에 주문상태 업데이트 및 버튼 색깔 바꾸기')}
                    >
                        <Text style={{ ...FONTS2.h3, color: COLORS.white }}>접수하기</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.orderButton}
                    >
                        <Text style={{ ...FONTS2.h3, color: COLORS.white }}>접수완료</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={{ padding: 20 }}>
                <Text style={{ color: 'red', ...FONTS2.body2 }}>점주에게 보내는 요청사항</Text>

                {!status ? (null) : (
                    <View style={{ width: responsiveWidth(90), backgroundColor: '#F1F3F5', padding: 30, borderRadius: 8, }}>
                        <Text>ㅇㄴㄹ</Text>
                    </View>
                )}
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    itemContainer: {
        padding: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderButton: {
        justifyContent: 'center',
        backgroundColor: '#364FC7',
        paddingHorizontal: 20,
        marginTop: 10,
        borderRadius: 8,
        height: 35,
        borderBottomRightRadius: 25,
    },
});

export default OrderDetailItem;