/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import { COLORS, FONTS2, SIZES } from '../../constants';

import Header from '../layout/Header';
import StoreButton from '../StoreButton';

const OrderDetailItem = ({ route }) => {
    console.log(JSON.stringify(route.params.item, 4, null));

    const { item } = route.params;

    const renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: SIZES.base * 2 }}>
                <Text style={{ ...FONTS2.h2 }}>{item.menuName} {item.quantity}개</Text>
                <Text style={{ ...FONTS2.h2 }}>{(item.cost * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Header title='진행 주문' small='true' />

            <View style={[styles.itemContainer, { marginTop: 20, }]}>
                <View>
                    <Text style={{ ...FONTS2.body2 }}>{item.date} {item.time} 주문</Text>
                    <Text style={{ ...FONTS2.h2, color: COLORS.darkgray }}>{item.address} {item.buildingName}</Text>
                </View>

                {item.orderStatus === '모집 완료' ? (
                    <StoreButton title='접수하기' color='#CED4DA' fontColor='white'/>
                ) : (
                    <StoreButton title='접수완료' color='#364FC7' fontColor='white'/>
                )}
            </View>

            <View style={{ padding: 20 }}>
                <Text style={{ color: 'red', ...FONTS2.body2, marginBottom: SIZES.base * 3 }}>점주에게 보내는 요청사항있을 경우에만 표시</Text>
                
                <FlatList
                    data={item.menu}
                    keyExtractor={item => item.menuId.toString()}
                    renderItem={renderItem}
                />
                {item.orderStatus === '접수 완료' ? (
                    <View>
                        <View style={styles.cookStatusContainer}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ ...FONTS2.body3 }}>남은 준비 시간</Text>
                                <Text style={{ ...FONTS2.h1 }}>27분</Text>
                            </View>
                            <StoreButton title='조리 완료' color='#CED4DA' fontColor='white' onPress={() => alert('DB에 조리 완료되었다고 post')}/>
                        </View>
                    </View>
                ) : (null)}
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
    cookStatusContainer: {
        flexDirection: 'row',
        width: responsiveWidth(90),
        backgroundColor: '#F1F3F5',
        padding: 20,
        borderRadius: 8,
        justifyContent: 'space-between',
        marginTop: SIZES.base * 2
    }
});

export default OrderDetailItem;